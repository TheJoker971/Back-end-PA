import {IPack, INFT, ModelRegistry, IUser} from "../models";
import {Model} from "mongoose";
import {ServiceResult} from "./service.result";


export class PackService {

    private packModel: Model<IPack>;
    private nftModel: Model<INFT>;

    constructor(registry : ModelRegistry){
        this.packModel = registry.packModel;
        this.nftModel = registry.nftModel;
    }


    async create(name:string, symbol: string, address:string,user:IUser){
        try{

            const newPack = await this.packModel.create({name:name,symbol:symbol,address:address,user:user});
            return ServiceResult.success(newPack);
        }catch(err){
            return ServiceResult.failed();
        }
    }

    async update(idPack:string,name:string,symbol:string,address:string,user:IUser){
        try{
            const isUser = await this.packModel.findOne({_id:idPack,user:user}).exec();
            if(isUser !== null){
                const update = await this.packModel.findByIdAndUpdate(idPack,{
                    $set:{
                        name:name,
                        symbol:symbol,
                        address: address
                    }
                });
                return ServiceResult.success(update);
            }
            return ServiceResult.notFound();
        }catch(err){
            return ServiceResult.failed();
        }
    }

    async delete(idPack:string, user:IUser){
        try{
            const hasNFT = await this.nftModel.findOne({collection:idPack}).exec();
            if(hasNFT !== null){
                return ServiceResult.conflict();
            }
            const isUser = await this.packModel.findOne({_id:idPack,user:user}).exec();
            if(isUser !== null) {
                const remove = await this.packModel.findByIdAndDelete(idPack).exec();
                return ServiceResult.success(remove);
            }
            return ServiceResult.notFound();
        }catch(err){
            return ServiceResult.failed();
        }
    }

    async getAllCollection(){
        try{
            const packs = await this.packModel.find().populate("user").exec();
            if(packs !== null){
                return ServiceResult.success(packs);
            }
            return ServiceResult.notFound();
        }catch(err){
            return ServiceResult.failed();
        }

    }

    async getAllCollectionUser(idUser: string) {
        try {
            const packs = await this.packModel.find({ user: idUser }).exec();
            if (packs !== null) {
                return ServiceResult.success(packs);
            }
            return ServiceResult.notFound();
        } catch (err) {
            return ServiceResult.failed();
        }
    }

    async getCollectionById(idPack:string){
        try{
            const pack = await this.packModel.findById(idPack).populate("user").exec();
            if(pack !== null){
                return ServiceResult.success(pack);
            }
            return ServiceResult.notFound();
        }catch(err){
            return ServiceResult.failed();
        }
    }

}