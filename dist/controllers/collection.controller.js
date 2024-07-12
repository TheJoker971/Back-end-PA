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
exports.CollectionController = void 0;
const express_1 = __importDefault(require("express"));
const service_result_1 = require("../services/service.result");
const middlewares_1 = require("../middlewares/");
class CollectionController {
    constructor(authService, collectionService) {
        this.authService = authService;
        this.collectionService = collectionService;
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sr = yield this.collectionService.create(req.body.name, req.body.symbol, req.body.address, req.user);
            console.log(req.body.name, req.body.symbol, req.body.user);
            switch (sr.errorCode) {
                case service_result_1.ServiceErrorCode.success:
                    res.status(201).json(sr.result);
                    break;
                default:
                    res.status(500);
                    break;
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sr = yield this.collectionService.update(req.params.idCollection, req.body.symbol, req.body.address, req.body.name, req.user);
            switch (sr.errorCode) {
                case service_result_1.ServiceErrorCode.success:
                    res.status(201).json(sr.result);
                    break;
                default:
                    res.status(500);
                    break;
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sr = yield this.collectionService.delete(req.params.idCollection, req.user);
            switch (sr.errorCode) {
                case service_result_1.ServiceErrorCode.success:
                    res.status(204).json(sr.result);
                    break;
                default:
                    res.status(500);
                    break;
            }
        });
    }
    getAllCollection(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sr = yield this.collectionService.getAllCollection();
            switch (sr.errorCode) {
                case service_result_1.ServiceErrorCode.success:
                    res.status(200).json(sr.result);
                    break;
                default:
                    res.status(500);
                    break;
            }
        });
    }
    getCollectionById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sr = yield this.collectionService.getCollectionById(req.params.idCollection);
            switch (sr.errorCode) {
                case service_result_1.ServiceErrorCode.success:
                    res.status(200).json(sr.result);
                    break;
                default:
                    res.status(500);
                    break;
            }
        });
    }
    getAllCollectionUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sr = yield this.collectionService.getAllCollectionUser(req.params.userId);
            switch (sr.errorCode) {
                case service_result_1.ServiceErrorCode.success:
                    res.status(200).json(sr.result);
                    break;
                case service_result_1.ServiceErrorCode.notFound:
                    res.status(404).json({ message: "No collections found for this user" });
                    break;
                default:
                    res.status(500).json({ message: "Internal server error" });
                    break;
            }
        });
    }
    buildRoutes() {
        const router = express_1.default.Router();
        router.get('/', this.getAllCollection.bind(this));
        router.post('/', middlewares_1.SessionMiddleware.isLogged(this.authService), express_1.default.json(), this.create.bind(this));
        router.patch('/:idCollection', middlewares_1.SessionMiddleware.isLogged(this.authService), express_1.default.json(), this.update.bind(this));
        router.delete('/:idCollection', middlewares_1.SessionMiddleware.isLogged(this.authService), this.delete.bind(this));
        router.get('/:idCollection', this.getCollectionById.bind(this));
        router.get('/mine/:idUser', this.getAllCollectionUser.bind(this));
        return router;
    }
}
exports.CollectionController = CollectionController;
