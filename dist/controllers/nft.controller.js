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
exports.NFTController = void 0;
const express_1 = __importDefault(require("express"));
const service_result_1 = require("../services/service.result");
const middlewares_1 = require("../middlewares/");
class NFTController {
    constructor(authService, nftService) {
        this.authService = authService;
        this.nftService = nftService;
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let sr;
            if (req.body.spicyPower !== undefined || req.body === 0) {
                sr = yield this.nftService.create(req.body.name, req.body.symbol, req.body.collection, req.user);
            }
            else {
                sr = yield this.nftService.create(req.body.name, req.body.symbol, req.body.collection, req.user, req.body.spicyPower);
            }
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
            const sr = yield this.nftService.update(req.params.idNFT, req.body.name, req.body.symbol, req.body.collection, req.user);
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
            const sr = yield this.nftService.delete(req.params.idNFT, req.user);
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
    getAllNFT(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sr = yield this.nftService.getAllNFT();
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
    getNFTById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sr = yield this.nftService.getNFTById(req.params.idNFT);
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
    buildRoutes() {
        const router = express_1.default.Router();
        router.get('/', this.getAllNFT.bind(this));
        router.post('/', middlewares_1.SessionMiddleware.isLogged(this.authService), express_1.default.json(), this.create.bind(this));
        router.patch('/:idNFT', middlewares_1.SessionMiddleware.isLogged(this.authService), express_1.default.json(), this.update.bind(this));
        router.delete('/:idNFT', middlewares_1.SessionMiddleware.isLogged(this.authService), this.delete.bind(this));
        router.get('/:idNFT', this.getNFTById.bind(this));
        return router;
    }
}
exports.NFTController = NFTController;
