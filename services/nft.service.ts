import {INFT, ModelRegistry} from "../models";
import {Model} from "mongoose";
import {ServiceResult} from "./service.result";

export class NFTService{

    private nftModel: Model<INFT>;

    constructor(registry : ModelRegistry){
        this.nftModel = registry.nftModel;
    }


    async create(name:string,symbol:string, address: string,collection:string,user:string,spicyPower?:number){
        try{
            const nft = await this.nftModel.findOne({
                name:name,
                symbol:symbol,
                address: address
            }).exec();
            if(nft !== null){
                return ServiceResult.conflict();
            }
            // @ts-ignore
            const newNFT =(spicyPower === undefined) ? await this.nftModel.create(name,symbol,address,null,collection,user) : this.nftModel.create(name,symbol,address,spicyPower,collection,user);
            return ServiceResult.success(newNFT);
        }catch(err){
            return ServiceResult.failed();
        }
    }

    async update(idNFT:string,name:string,symbol:string,address:string,collection:string,user:string,spicyPower?:number){
        try{
            const isUser = await this.nftModel.findOne({_id:idNFT,user:user}).exec();
            let update;
            if(isUser !== null){
                if(spicyPower !== undefined){
                    update = await this.nftModel.findByIdAndUpdate(idNFT,{
                        $set:{
                            name:name,
                            symbol:symbol,
                            address:address,
                            spicyPower:spicyPower,
                            collection: collection,
                            user:user

                        }
                    });
                }else{
                    update = await this.nftModel.findByIdAndUpdate(idNFT,{
                        $set:{
                            name:name,
                            symbol:symbol,
                            address:address,
                            collection:collection,
                            user:user
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

    async delete(idNFT:string, user:string){
        try{
            const isUser = await this.nftModel.findOne({_id:idNFT,user:user}).exec();
            if(isUser !== null) {
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