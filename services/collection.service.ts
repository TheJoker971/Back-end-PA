import {IUser, ModelRegistry} from "../models";
import {ICollection} from "../models/collection.model";
import {Model} from "mongoose";
import {ServiceResult} from "./service.result";
import {INFT} from "../models/nft.model";

export class CollectionService{

    private collectionModel: Model<ICollection>;
    private nftModel: Model<INFT>;

    constructor(registry : ModelRegistry){
        this.collectionModel = registry.collectionModel;
        this.nftModel = registry.nftModel;
    }


    async create(name:string,owner:string){
        try{
            const collection = await this.collectionModel.findOne({
                name:name
            }).exec();
            if(collection !== null){
                return ServiceResult.conflict();
            }
            const newCollection = await this.collectionModel.create(name,owner);
            return ServiceResult.success(newCollection);
        }catch(err){
            return ServiceResult.failed();
        }
    }

    async update(idCollection:string,name:string,owner:string){
        try{
            const isOwner = await this.collectionModel.findOne({_id:idCollection,owner:owner}).exec();
            if(isOwner !== null){
                const update = await this.collectionModel.findByIdAndUpdate(idCollection,{
                    $set:{
                        name:name
                    }
                });
                return ServiceResult.success(update);
            }
            return ServiceResult.notFound();
        }catch(err){
            return ServiceResult.failed();
        }
    }

    async delete(idCollection:string, owner:string){
        try{
            const hasNFT = await this.nftModel.findOne({collection:idCollection}).exec();
            if(hasNFT !== null){
                return ServiceResult.conflict();
            }
            const isOwner = await this.collectionModel.findOne({_id:idCollection,owner:owner}).exec();
            if(isOwner !== null) {
                const remove = await this.collectionModel.findByIdAndDelete(idCollection).exec();
                return ServiceResult.success(remove);
            }
            return ServiceResult.notFound();
        }catch(err){
            return ServiceResult.failed();
        }
    }

    async getAllCollection(){
        try{
            const collections = await this.collectionModel.find().populate("user").exec();
            if(collections !== null){
                return ServiceResult.success(collections);
            }
            return ServiceResult.notFound();
        }catch(err){
            return ServiceResult.failed();
        }

    }

    async getAllCollectionUser(idUser:string){
        try{
            const collections = await this.collectionModel.find({
                owner:idUser
            }).populate("user").exec();
            if(collections !== null){
                return ServiceResult.success(collections);
            }
            return ServiceResult.notFound();
        }catch(err){
            return ServiceResult.failed();
        }
    }

    async getCollectionById(idCollection:string){
        try{
            const collection = await this.collectionModel.findById(idCollection).populate("user").exec();
            if(collection !== null){
                return ServiceResult.success(collection);
            }
            return ServiceResult.notFound();
        }catch(err){
            return ServiceResult.failed();
        }
    }

}