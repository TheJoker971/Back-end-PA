import {config} from "dotenv";
config(); // chargement des vars d'env

import {MongooseUtils} from "./utils";
import {Mongoose} from "mongoose";
import express,{Request,Response} from "express";
import cors from "cors";
import {ModelRegistry} from "./models";
import {AuthController, PackController} from "./controllers";
import {AuthService, PackService, NFTService} from "./services";
import {NFTController} from "./controllers/nft.controller";
import {
    BlobServiceClient,
    StorageSharedKeyCredential,
    generateBlobSASQueryParameters,
    BlobSASPermissions,
    BlobSASSignatureValues
} from '@azure/storage-blob';

async function launchAPI() {
    const db: Mongoose = await MongooseUtils.open();
    const registry = new ModelRegistry(db);

    const app = express();
    app.use(cors());

    const authService = new AuthService(registry);
    const authController = new AuthController(authService);
    const packController = new PackController(authService,new PackService(registry));
    const nftController = new NFTController(authService,new NFTService(registry));
    app.use('/auth', authController.buildRoutes());
    app.use('/collection',packController.buildRoutes());
    app.use('/nft',nftController.buildRoutes());

    const accountName = process.env.ACCOUNT_NAME;
    const accountKey = process.env.ACCOUNT_KEY;
    const containerName = process.env.CONTAINER_NAME;

    const sharedKeyCredential = new StorageSharedKeyCredential(accountName as string, accountKey as string);
    const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net`, sharedKeyCredential);

    app.get('/cloud', async (req: Request, res: Response) => {
        const blobName = req.query.blobName as string;

        const containerClient = blobServiceClient.getContainerClient(containerName as string);
        const blobClient = containerClient.getBlobClient(blobName);

        const expiresOn = new Date();
        expiresOn.setMinutes(expiresOn.getMinutes() + 60); // 1 hour expiry

        const sasOptions = {
            containerName,
            blobName,
            permissions: BlobSASPermissions.parse("rw"),
            startsOn: new Date(),
            expiresOn,
        };
        const sasToken = generateBlobSASQueryParameters(sasOptions as BlobSASSignatureValues, sharedKeyCredential).toString();
        const sasUrl = `${blobClient.url}?${sasToken}`;


        res.json({ sasUrl });
    });

    app.listen(process.env.PORT, function() {
        console.log(`Listening on ${process.env.PORT}`);
    });
}

launchAPI().catch(console.error);