
import {INFT, IPack, IUser, ModelRegistry} from "../models";
import {Model} from "mongoose";
import {ServiceResult} from "./service.result";

export class NFTService{

    private nftModel: Model<INFT>;
    private packModel : Model<IPack>;

    constructor(registry : ModelRegistry){
        this.nftModel = registry.nftModel;
        this.packModel = registry.packModel;
    }


    async create(name:string,symbol:string, tokenId: number,address: string,pack:IPack, user: IUser, spicyPower?:number){
        try{
            const nft = await this.nftModel.findOne({
                tokenId: tokenId
            }).exec();
            if(nft !== null) {
                return ServiceResult.conflict();
            }
            console.log(name, address, symbol, tokenId, user, pack)

            const newNFT =(spicyPower === undefined) ? await this.nftModel.create({name:name,symbol:symbol,tokenId:tokenId,address:address,pack:pack, user: user, listed: false}) : await this.nftModel.create({name:name,symbol:symbol,tokenId:tokenId,address:address,spicyPower:spicyPower as number,pack:pack, listed: false});
            return ServiceResult.success(newNFT);
        }catch(err){
            return ServiceResult.failed();
        }
    }

    async update(idNFT:string,name:string,symbol:string,address:string,pack:string,user:IUser,listed: boolean, spicyPower?:number, price?: number){
        try{
            const isUser = await this.nftModel.findOne({_id:idNFT},{user:user}).populate('pack').exec();
            let update;
            if(isUser !== null){
                if(spicyPower !== undefined){
                    update = await this.nftModel.findByIdAndUpdate(idNFT,{
                        $set:{
                            name:name,
                            symbol:symbol,
                            address:address,
                            spicyPower:spicyPower,
                            pack: pack,
                            user:user,
                            price: price,
                            listed: listed

                        }
                    },{new:true});
                }else{
                    update = await this.nftModel.findByIdAndUpdate(idNFT,{
                        $set:{
                            name:name,
                            symbol:symbol,
                            address:address,
                            pack:pack,
                            user:user,
                            price: price,
                            listed: listed
                        }
                    },{new:true});
                }

                return ServiceResult.success(update);
            }
            return ServiceResult.notFound();
        }catch(err){
            return ServiceResult.failed();
        }
    }

    async delete(idNFT:string, user:IUser){
        try{
            const isUser = await this.nftModel.findById(idNFT,{user:user}).populate('pack').exec();
            if(isUser !== null  )  {
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
            const nft = await this.nftModel.findById(idNFT).populate("pack").exec();
            if(nft !== null){
                return ServiceResult.success(nft);
            }
            return ServiceResult.notFound();
        }catch(err){
            return ServiceResult.failed();
        }
    }

    async getNFTsByPackId(packId: string) {
        try {
            const nfts = await this.nftModel.find({ pack: packId }).exec();
            if (nfts !== null && nfts.length > 0) {
                return ServiceResult.success(nfts);
            }
            return ServiceResult.notFound();
        } catch (err) {
            return ServiceResult.failed();
        }
    }

    async getAllNFTSUser(idUser: string) {
        try {
            const nfts = await this.nftModel.find({ user: idUser }).populate('pack').exec();
            if (nfts !== null) {
                return ServiceResult.success(nfts);
            }
            return ServiceResult.notFound();
        } catch (err) {
            return ServiceResult.failed();
        }
    }

}
