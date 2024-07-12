"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)(); // chargement des vars d'env
const utils_1 = require("./utils");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const models_1 = require("./models");
const controllers_1 = require("./controllers");
const services_1 = require("./services");
const nft_controller_1 = require("./controllers/nft.controller");
function launchAPI() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield utils_1.MongooseUtils.open();
        const registry = new models_1.ModelRegistry(db);
        const app = (0, express_1.default)();
        app.use((0, cors_1.default)());
        const authService = new services_1.AuthService(registry);
        const authController = new controllers_1.AuthController(authService);
        const packController = new controllers_1.PackController(authService, new services_1.PackService(registry));
        const nftController = new nft_controller_1.NFTController(authService, new services_1.NFTService(registry));
        app.use('/auth', authController.buildRoutes());
        app.use('/collection', packController.buildRoutes());
        app.use('/nft', nftController.buildRoutes());
        app.listen(process.env.PORT, function () {
            console.log(`Listening on ${process.env.PORT}`);
        });
    });
}
launchAPI().catch(console.error);
