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
const uploadMiddleware_1 = __importDefault(require("../middlewares/uploadMiddleware"));
const image_service_1 = __importDefault(require("../services/image.service"));
class NFTController {
    constructor(authService, nftService) {
        this.authService = authService;
        this.nftService = nftService;
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let sr;
            if (req.body.spicyPower === undefined) {
                console.log(req.body.name, req.body.symbol, req.body.tokenId, req.body.address, req.body.pack, req.body.user);
                sr = yield this.nftService.create(req.body.name, req.body.symbol, req.body.tokenId, req.body.address, req.body.pack, req.body.user);
            }
            else {
                sr = yield this.nftService.create(req.body.name, req.body.symbol, req.body.tokenId, req.body.address, req.body.pack, req.body.spicyPower);
            }
            switch (sr.errorCode) {
                case service_result_1.ServiceErrorCode.success:
                    res.status(201).json(sr.result);
                    break;
                default:
                    res.status(500).end();
                    break;
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sr = yield this.nftService.update(req.params.idNFT, req.body.name, req.body.address, req.body.symbol, req.body.collection, req.user, req.body.price, req.body.listed);
            switch (sr.errorCode) {
                case service_result_1.ServiceErrorCode.success:
                    res.status(201).json(sr.result);
                    break;
                default:
                    res.status(500).end();
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
                    res.status(500).end();
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
                    res.status(500).end();
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
                    res.status(500).end();
                    break;
            }
        });
    }
    getNFTsByPackId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sr = yield this.nftService.getNFTsByPackId(req.params.packId);
            switch (sr.errorCode) {
                case service_result_1.ServiceErrorCode.success:
                    res.status(200).json(sr.result);
                    break;
                case service_result_1.ServiceErrorCode.notFound:
                    res.status(404).json({ message: "No NFTs found for this pack ID." });
                    break;
                default:
                    res.status(500).end();
                    break;
            }
        });
    }

    getAllNFTSUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sr = yield this.nftService.getAllNFTSUser(req.params.idUser);
            console.log(sr.errorCode);
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

    uploadImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = req.body;
                const file = req.file;
                if (!name || !file) {
                    return res.status(400).json({ message: 'Name and image file are required' });
                }
                const imageUrl = yield (0, image_service_1.default)(file.buffer, name);
                res.status(201).json({ imageUrl });
            }
            catch (error) {
                console.error('Error uploading image:', error);
                res.status(500).json({ error: 'Error uploading image' });
            }
        });
    }
    buildRoutes() {
        const router = express_1.default.Router();
        router.get('/', this.getAllNFT.bind(this));
        router.post('/', express_1.default.json(), this.create.bind(this));
        router.patch('/:idNFT', express_1.default.json(), this.update.bind(this));
        router.delete('/:idNFT', middlewares_1.SessionMiddleware.isLogged(this.authService), this.delete.bind(this));
        router.get('/:idNFT', this.getNFTById.bind(this));
        router.get('/pack/:packId', this.getNFTsByPackId.bind(this));
        router.get('/user/:idUser', this.getAllNFTSUser.bind(this));
        router.post('/upload-image', uploadMiddleware_1.default.single('image'), this.uploadImage.bind(this));
        return router;
    }
}
exports.NFTController = NFTController;
