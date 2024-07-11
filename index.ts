import {config} from "dotenv";
config(); // chargement des vars d'env

import {MongooseUtils} from "./utils";
import {Mongoose} from "mongoose";
import express from "express";
import cors from "cors";
import {ModelRegistry} from "./models";
import {AuthController, CollectionController} from "./controllers";
import {AuthService, CollectionService, NFTService} from "./services";
import {NFTController} from "./controllers/nft.controller";

async function launchAPI() {
    const db: Mongoose = await MongooseUtils.open();
    const registry = new ModelRegistry(db);

    const app = express();
    app.use(cors());

    const authService = new AuthService(registry);
    const authController = new AuthController(authService);
    const collectionController = new CollectionController(authService,new CollectionService(registry));
    const nftController = new NFTController(authService,new NFTService(registry));
    app.use('/auth', authController.buildRoutes());
    app.use('/collection',collectionController.buildRoutes());
    app.use('/nft',nftController.buildRoutes());

    app.listen(process.env.PORT, function() {
        console.log(`Listening on ${process.env.PORT}`);
    });
}

launchAPI().catch(console.error);