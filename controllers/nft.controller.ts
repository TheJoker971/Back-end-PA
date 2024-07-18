import express, {Request, Response, Router} from "express";
import {AuthService, NFTService} from "../services";
import {ServiceErrorCode} from "../services/service.result";
import {SessionMiddleware} from "../middlewares/";
import {IUser} from "../models";

export class NFTController {
    constructor(private authService: AuthService, private nftService: NFTService) {}

    async create(req: Request, res: Response) {
        let sr;
        const {name, symbol, user, pack, spicyPower} = req.body;
        if (spicyPower) {
            sr = await this.nftService.create(name, symbol, user, pack, spicyPower);
        } else {
            sr = await this.nftService.create(name, symbol, user, pack);
        }
        switch (sr.errorCode) {
            case ServiceErrorCode.success:
                res.status(201).json(sr.result);
                break;
            case ServiceErrorCode.conflict:
                res.status(409).end();
                break;
            default:
                res.status(500).end();
                break;
        }
    }

    async update(req: Request, res: Response) {
        const {name, symbol, pack, spicyPower} = req.body;
        let sr;
        if(spicyPower) {
            sr = await this.nftService.update(req.params.idNFT, name, symbol, pack, req.user as IUser, spicyPower);
        } else {
            sr = await this.nftService.update(req.params.idNFT, name, symbol, pack, req.user as IUser);
        }
        switch (sr.errorCode) {
            case ServiceErrorCode.success:
                res.status(201).json(sr.result);
                break;
            case ServiceErrorCode.notFound:
                res.status(404).end();
                break;
            default:
                res.status(500).end();
                break;
        }
    }

    async getAllNFT(req: Request, res: Response) {
        const sr = await this.nftService.getAllNFT();
        switch (sr.errorCode) {
            case ServiceErrorCode.success:
                res.status(200).json(sr.result);
                break;
            default:
                res.status(500).end();
                break;
        }
    }

    async getNFTById(req: Request, res: Response) {
        const sr = await this.nftService.getNFTById(req.params.idNFT);
        switch (sr.errorCode) {
            case ServiceErrorCode.success:
                res.status(200).json(sr.result);
                break;
            default:
                res.status(500).end();
                break;
        }
    }

    buildRoutes(): Router {
        const router = express.Router();
        router.get('/', this.getAllNFT.bind(this));
        router.post('/', express.json(), this.create.bind(this));
        router.patch('/:idNFT', SessionMiddleware.isLogged(this.authService), express.json(), this.update.bind(this));
        router.get('/:idNFT', this.getNFTById.bind(this));
        return router;
    }
}
