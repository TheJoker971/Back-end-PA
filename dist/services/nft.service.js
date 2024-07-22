"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NFTService = void 0;
const service_result_1 = require("./service.result");
class NFTService {
    constructor(registry) {
        this.nftModel = registry.nftModel;
        this.packModel = registry.packModel;
    }
    create(name, symbol, tokenId, address, pack, user, spicyPower) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const nft = yield this.nftModel.findOne({
                    tokenId: tokenId
                }).exec();
                if (nft !== null) {
                    return service_result_1.ServiceResult.conflict();
                }
                console.log(name, address, symbol, tokenId, user, pack);
                const newNFT = (spicyPower === undefined) ? yield this.nftModel.create({ name: name, symbol: symbol, tokenId: tokenId, address: address, pack: pack, user: user }) : yield this.nftModel.create({ name: name, symbol: symbol, tokenId: tokenId, address: address, spicyPower: spicyPower, pack: pack });
                return service_result_1.ServiceResult.success(newNFT);
            }
            catch (err) {
                return service_result_1.ServiceResult.failed();
            }
        });
    }
    update(idNFT, name, symbol, address, pack, user, listed, spicyPower, price) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isUser = yield this.nftModel.findOne({ _id: idNFT }, { user: user }).populate('pack').exec();
                let update;
                if (isUser !== null) {
                    if (spicyPower !== undefined) {
                        update = yield this.nftModel.findByIdAndUpdate(idNFT, {
                            $set: {
                                name: name,
                                symbol: symbol,
                                address: address,
                                spicyPower: spicyPower,
                                pack: pack,
                                user: user,
                                price: price,
                                listed: listed
                            }
                        }, { new: true });
                    }
                    else {
                        update = yield this.nftModel.findByIdAndUpdate(idNFT, {
                            $set: {
                                name: name,
                                symbol: symbol,
                                address: address,
                                pack: pack,
                                user: user,
                                price: price,
                                listed: listed
                            }
                        }, { new: true });
                    }
                    return service_result_1.ServiceResult.success(update);
                }
                return service_result_1.ServiceResult.notFound();
            }
            catch (err) {
                return service_result_1.ServiceResult.failed();
            }
        });
    }
    delete(idNFT, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isUser = yield this.nftModel.findById(idNFT, { user: user }).populate('pack').exec();
                if (isUser !== null) {
                    const remove = yield this.nftModel.findByIdAndDelete(idNFT).exec();
                    return service_result_1.ServiceResult.success(remove);
                }
                return service_result_1.ServiceResult.notFound();
            }
            catch (err) {
                return service_result_1.ServiceResult.failed();
            }
        });
    }
    getAllNFT() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const nfts = yield this.nftModel.find().exec();
                if (nfts !== null) {
                    return service_result_1.ServiceResult.success(nfts);
                }
                return service_result_1.ServiceResult.notFound();
            }
            catch (err) {
                return service_result_1.ServiceResult.failed();
            }
        });
    }
    getNFTById(idNFT) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const nft = yield this.nftModel.findById(idNFT).populate("pack").exec();
                if (nft !== null) {
                    return service_result_1.ServiceResult.success(nft);
                }
                return service_result_1.ServiceResult.notFound();
            }
            catch (err) {
                return service_result_1.ServiceResult.failed();
            }
        });
    }
    getNFTsByPackId(packId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const nfts = yield this.nftModel.find({ pack: packId }).exec();
                if (nfts !== null && nfts.length > 0) {
                    return service_result_1.ServiceResult.success(nfts);
                }
                return service_result_1.ServiceResult.notFound();
            }
            catch (err) {
                return service_result_1.ServiceResult.failed();
            }
        });
    }
    getAllNFTSUser(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const nfts = yield this.nftModel.find({ user: idUser }).exec();
                if (nfts !== null) {
                    return service_result_1.ServiceResult.success(nfts);
                }
                return service_result_1.ServiceResult.notFound();
            }
            catch (err) {
                return service_result_1.ServiceResult.failed();
            }
        });
    }
}
exports.NFTService = NFTService;
