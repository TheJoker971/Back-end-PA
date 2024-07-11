import {INFT, ModelRegistry} from "../models";
import {Model} from "mongoose";
import {ServiceResult} from "./service.result";

export class NFTService{

    private nftModel: Model<INFT>;

    constructor(registry : ModelRegistry){
        this.nftModel = registry.nftModel;
    }


    async create(name:string,collection:string,owner:string,spicyPower?:number){
        try{
            const nft = await this.nftModel.findOne({
                name:name
            }).exec();
            if(nft !== null){
                return ServiceResult.conflict();
            }
            // @ts-ignore
            const newNFT =(spicyPower === undefined) ? await this.nftModel.create(name,null,collection,owner) : this.nftModel.create(name,spicyPower,collection,owner);
            return ServiceResult.success(newNFT);
        }catch(err){
            return ServiceResult.failed();
        }
    }

    async update(idNFT:string,name:string,collection:string,owner:string,spicyPower?:number){
        try{
            const isOwner = await this.nftModel.findOne({_id:idNFT,owner:owner}).exec();
            let update;
            if(isOwner !== null){
                if(spicyPower !== undefined){
                    update = await this.nftModel.findByIdAndUpdate(idNFT,{
                        $set:{
                            name:name,
                            spicyPower:spicyPower,
                            collection: collection,
                            owner:owner

                        }
                    });
                }else{
                    update = await this.nftModel.findByIdAndUpdate(idNFT,{
                        $set:{
                            name:name,
                            collection:collection,
                            owner:owner
                        }
                    });
                }

                return ServiceResult.success(update);
            }
            return ServiceResult.notFound();
        }catch(err){
            return ServiceResult.failed();
        }
    }

    async delete(idNFT:string, owner:string){
        try{
            const isOwner = await this.nftModel.findOne({_id:idNFT,owner:owner}).exec();
            if(isOwner !== null) {
                const remove = await this.nftModel.findByIdAndDelete(idNFT).exec();
                return ServiceResult.success(remove);
            }
            return ServiceResult.notFound();
        }catch(err){
            return ServiceResult.failed();
        }
    }

    async getAllNFT(){
        try{
            const nfts = await this.nftModel.find().exec();
            if(nfts !== null){
                return ServiceResult.success(nfts);
            }
            return ServiceResult.notFound();
        }catch(err){
            return ServiceResult.failed();
        }

    }

    async getNFTById(idNFT:string){
        try{
            const nft = await this.nftModel.findById(idNFT).populate("collection").populate('user').exec();
            if(nft !== null){
                return ServiceResult.success(nft);
            }
            return ServiceResult.notFound();
        }catch(err){
            return ServiceResult.failed();
        }
    }

}