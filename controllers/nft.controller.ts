import express, {Request, Response, Router} from "express";
import {AuthService, NFTService} from "../services";
import {ServiceErrorCode} from "../services/service.result";
import {SessionMiddleware} from "../middlewares/";


export class NFTController {

    constructor(private authService: AuthService,private nftService: NFTService) {
    }

    async create(req:Request, res:Response){
        let sr;
        if(req.body.spicyPower !== undefined || req.body === 0){
            sr = await this.nftService.create(req.body.name,req.body.collection,req.user as string);
        }else{
            sr = await this.nftService.create(req.body.name,req.body.collection,req.user as string,req.body.spicyPower);
        }

        switch(sr.errorCode){
            case ServiceErrorCode.success:
                res.status(201).json(sr.result);
                break;
            default:
                res.status(500);
                break;
        }
    }

    async update(req:Request, res:Response){
        const sr = await this.nftService.update(req.params.idNFT,req.body.name,req.body.collection,req.user as string);
        switch(sr.errorCode){
            case ServiceErrorCode.success:
                res.status(201).json(sr.result);
                break;
            default:
                res.status(500);
                break;
        }
    }

    async delete(req:Request, res:Response){
        const sr = await this.nftService.delete(req.params.idNFT,req.user as string);
        switch(sr.errorCode){
            case ServiceErrorCode.success:
                res.status(204).json(sr.result);
                break;
            default:
                res.status(500);
                break;
        }
    }

    async getAllNFT(req: Request,res : Response){
        const sr = await this.nftService.getAllNFT();
        switch (sr.errorCode){
            case ServiceErrorCode.success:
                res.status(200).json(sr.result);
                break;
            default:
                res.status(500);
                break;
        }
    }

    async getNFTById(req: Request,res : Response){
        const sr = await this.nftService.getNFTById(req.params.idNFT);
        switch (sr.errorCode){
            case ServiceErrorCode.success:
                res.status(200).json(sr.result);
                break;
            default:
                res.status(500);
                break;
        }
    }

    buildRoutes(): Router {
        const router = express.Router();
        router.get('/', this.getAllNFT.bind(this));
        router.post('/',SessionMiddleware.isLogged(this.authService),express.json(),this.create.bind(this));
        router.patch('/:idNFT',SessionMiddleware.isLogged(this.authService), express.json(), this.update.bind(this));
        router.delete('/:idNFT', SessionMiddleware.isLogged(this.authService), this.delete.bind(this));
        router.get('/:idNFT',this.getNFTById.bind(this));
        return router;
    }
}