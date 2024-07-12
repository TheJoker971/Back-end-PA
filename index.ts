import {config} from "dotenv";
config(); // chargement des vars d'env

import {MongooseUtils} from "./utils";
import {Mongoose} from "mongoose";
import express from "express";
import cors from "cors";
import {ModelRegistry} from "./models";
import {AuthController, PackController} from "./controllers";
import {AuthService, PackService, NFTService} from "./services";
import {NFTController} from "./controllers/nft.controller";

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

    app.listen(process.env.PORT, function() {
        console.log(`Listening on ${process.env.PORT}`);
    });
}

launchAPI().catch(console.error);