import {INFT, IPack, IUser, ModelRegistry} from "../models";
import {Model} from "mongoose";
import {ServiceResult} from "./service.result";

export class NFTService {
    private nftModel: Model<INFT>;
    private packModel: Model<IPack>;

    constructor(registry: ModelRegistry) {
        this.nftModel = registry.nftModel;
        this.packModel = registry.packModel;
    }

    async create(name: string, symbol: string, user: IUser, pack: IPack, spicyPower?: number) {
        try {
            const nft = await this.nftModel.findOne({
                name: name,
                symbol: symbol,
            }).exec();
            if (nft !== null) {
                return ServiceResult.conflict();
            }
            const newNFT = (spicyPower === undefined)
                ? await this.nftModel.create({name: name, symbol: symbol, user: user, pack: pack})
                : await this.nftModel.create({name: name, symbol: symbol, user: user, spicyPower: spicyPower as number, pack: pack});
            return ServiceResult.success(newNFT);
        } catch (err) {
            return ServiceResult.failed();
        }
    }

    async update(idNFT: string, name: string, symbol: string, pack: string, user: IUser, spicyPower?: number) {
        try {
            const isUser = await this.nftModel.findOne({_id: idNFT, user: user}).populate('pack').exec();
            let update;
            if (isUser !== null) {
                const updateData: Partial<INFT> = {name, symbol, pack, user};
                if (spicyPower !== undefined) {
                    updateData.spicyPower = spicyPower;
                }
                update = await this.nftModel.findByIdAndUpdate(idNFT, {$set: updateData}, {new: true});
                return ServiceResult.success(update);
            }
            return ServiceResult.notFound();
        } catch (err) {
            return ServiceResult.failed();
        }
    }

    async getAllNFT() {
        try {
            const nfts = await this.nftModel.find().exec();
            if (nfts !== null) {
                return ServiceResult.success(nfts);
            }
            return ServiceResult.notFound();
        } catch (err) {
            return ServiceResult.failed();
        }
    }

    async getNFTById(idNFT: string) {
        try {
            const nft = await this.nftModel.findById(idNFT).populate("pack").exec();
            if (nft !== null) {
                return ServiceResult.success(nft);
            }
            return ServiceResult.notFound();
        } catch (err) {
            return ServiceResult.failed();
        }
    }
}
