import express, {Request, Response, Router} from "express";
import {AuthService, CollectionService} from "../services";
import {ServiceErrorCode} from "../services/service.result";
import {SessionMiddleware} from "../middlewares/";


export class CollectionController {

    constructor(private authService: AuthService,private collectionService: CollectionService) {
    }

    async create(req:Request, res:Response){
        const sr = await this.collectionService.create(req.body.name,req.user as string);
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
        const sr = await this.collectionService.update(req.params.idCollection,req.body.name,req.user as string);
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
        const sr = await this.collectionService.delete(req.params.idCollection,req.user as string);
        switch(sr.errorCode){
            case ServiceErrorCode.success:
                res.status(204).json(sr.result);
                break;
            default:
                res.status(500);
                break;
        }
    }

    async getAllCollection(req: Request,res : Response){
        const sr = await this.collectionService.getAllCollection();
        switch (sr.errorCode){
            case ServiceErrorCode.success:
                res.status(200).json(sr.result);
                break;
            default:
                res.status(500);
                break;
        }
    }

    async getCollectionById(req: Request,res : Response){
        const sr = await this.collectionService.getCollectionById(req.params.idCollection);
        switch (sr.errorCode){
            case ServiceErrorCode.success:
                res.status(200).json(sr.result);
                break;
            default:
                res.status(500);
                break;
        }
    }

    async getAllCollectionUser(req:Request,res:Response){
        const sr = await this.collectionService.getAllCollectionUser(req.user as string);
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
        router.get('/', this.getAllCollection.bind(this));
        router.post('/',SessionMiddleware.isLogged(this.authService),express.json(),this.create.bind(this));
        router.patch('/:idCollection',SessionMiddleware.isLogged(this.authService), express.json(), this.update.bind(this));
        router.delete('/:idCollection', SessionMiddleware.isLogged(this.authService), this.delete.bind(this));
        router.get('/:idCollection',this.getCollectionById.bind(this));
        router.get('/mine',SessionMiddleware.isLogged(this.authService),this.getAllCollectionUser.bind(this));
        return router;
    }
}