import express, {Request, Response, Router} from "express";
import {AuthService, NFTService} from "../services";
import {ServiceErrorCode} from "../services/service.result";
import {SessionMiddleware} from "../middlewares/";
import {IUser} from "../models";
import upload from '../middlewares/uploadMiddleware';
import addTextToImage from '../services/image.service';


export class NFTController {

    constructor(private authService: AuthService,private nftService: NFTService) {
    }

    async create(req:Request, res:Response){
        let sr;
        if(req.body.spicyPower === undefined){
            console.log(req.body.name,req.body.symbol, req.body.tokenId, req.body.address,req.body.pack, req.body.user)
            sr = await this.nftService.create(req.body.name,req.body.symbol, req.body.tokenId, req.body.address,req.body.pack, req.body.user);
        }else{
            sr = await this.nftService.create(req.body.name,req.body.symbol, req.body.tokenId, req.body.address,req.body.pack,req.body.spicyPower);
        }
        switch(sr.errorCode){
            case ServiceErrorCode.success:
                res.status(201).json(sr.result);
                break;
            default:
                res.status(500).end();
                break;
        }
    }

    async update(req:Request, res:Response){
        const sr = await this.nftService.update(req.params.idNFT,req.body.name,req.body.address,req.body.symbol,req.body.collection,
            req.user as IUser, req.body.price, req.body.listed);
        switch(sr.errorCode){
            case ServiceErrorCode.success:
                res.status(201).json(sr.result);
                break;
            default:
                res.status(500).end();
                break;
        }
    }

    async delete(req:Request, res:Response){
        const sr = await this.nftService.delete(req.params.idNFT,req.user as IUser);
        switch(sr.errorCode){
            case ServiceErrorCode.success:
                res.status(204).json(sr.result);
                break;
            default:
                res.status(500).end();
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
                res.status(500).end();
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
                res.status(500).end();
                break;
        }
    }

    async getNFTsByPackId(req: Request, res: Response) {
        const sr = await this.nftService.getNFTsByPackId(req.params.packId);
        switch (sr.errorCode) {
            case ServiceErrorCode.success:
                res.status(200).json(sr.result);
                break;
            case ServiceErrorCode.notFound:
                res.status(404).json({ message: "No NFTs found for this pack ID." });
                break;
            default:
                res.status(500).end();
                break;
        }
    }


    async getAllNFTSUser(req: Request, res: Response) {
        const sr = await this.nftService.getAllNFTSUser(req.params.idUser);
        console.log(sr.errorCode);
        switch (sr.errorCode) {
            case ServiceErrorCode.success:
                res.status(200).json(sr.result);
                break;
            case ServiceErrorCode.notFound:
                res.status(404).json({ message: "No collections found for this user" });
                break;
            default:
                res.status(500).json({ message: "Internal server error" });
                break;

    async uploadImage(req: Request, res: Response) {
        try {
            const { name } = req.body;
            const file = req.file;

            if (!name || !file) {
                return res.status(400).json({ message: 'Name and image file are required' });
            }

            const imageUrl = await addTextToImage(file.buffer, name);
            res.status(201).json({ imageUrl });
        } catch (error) {
            console.error('Error uploading image:', error);
            res.status(500).json({ error: 'Error uploading image' });

        }
    }

    buildRoutes(): Router {
        const router = express.Router();
        router.get('/', this.getAllNFT.bind(this));
        router.post('/',express.json(),this.create.bind(this));
        router.patch('/:idNFT', express.json(), this.update.bind(this));
        router.delete('/:idNFT', SessionMiddleware.isLogged(this.authService), this.delete.bind(this));
        router.get('/:idNFT',this.getNFTById.bind(this));

        router.get('/pack/:packId', this.getNFTsByPackId.bind(this));
        router.get('/user/:idUser',this.getAllNFTSUser.bind(this)); 
        router.post('/upload-image', upload.single('image'), this.uploadImage.bind(this));

        return router;
    }
}