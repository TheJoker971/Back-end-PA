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
exports.PackService = void 0;
const service_result_1 = require("./service.result");
class PackService {
    constructor(registry) {
        this.packModel = registry.packModel;
        this.nftModel = registry.nftModel;
    }
    create(name, symbol, address, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newPack = yield this.packModel.create({ name: name, symbol: symbol, address: address, user: user });
                return service_result_1.ServiceResult.success(newPack);
            }
            catch (err) {
                return service_result_1.ServiceResult.failed();
            }
        });
    }
    update(idPack, name, symbol, address, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isUser = yield this.packModel.findOne({ _id: idPack, user: user }).exec();
                if (isUser !== null) {
                    const update = yield this.packModel.findByIdAndUpdate(idPack, {
                        $set: {
                            name: name,
                            symbol: symbol,
                            address: address
                        }
                    });
                    return service_result_1.ServiceResult.success(update);
                }
                return service_result_1.ServiceResult.notFound();
            }
            catch (err) {
                return service_result_1.ServiceResult.failed();
            }
        });
    }
    delete(idPack, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hasNFT = yield this.nftModel.findOne({ collection: idPack }).exec();
                if (hasNFT !== null) {
                    return service_result_1.ServiceResult.conflict();
                }
                const isUser = yield this.packModel.findOne({ _id: idPack, user: user }).exec();
                if (isUser !== null) {
                    const remove = yield this.packModel.findByIdAndDelete(idPack).exec();
                    return service_result_1.ServiceResult.success(remove);
                }
                return service_result_1.ServiceResult.notFound();
            }
            catch (err) {
                return service_result_1.ServiceResult.failed();
            }
        });
    }
    getAllCollection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const packs = yield this.packModel.find().populate("user").exec();
                if (packs !== null) {
                    return service_result_1.ServiceResult.success(packs);
                }
                return service_result_1.ServiceResult.notFound();
            }
            catch (err) {
                return service_result_1.ServiceResult.failed();
            }
        });
    }
    getAllCollectionUser(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const packs = yield this.packModel.find({ user: idUser }).exec();
                if (packs !== null) {
                    return service_result_1.ServiceResult.success(packs);
                }
                return service_result_1.ServiceResult.notFound();
            }
            catch (err) {
                return service_result_1.ServiceResult.failed();
            }
        });
    }
    getCollectionById(idPack) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pack = yield this.packModel.findById(idPack).populate("user").exec();
                if (pack !== null) {
                    return service_result_1.ServiceResult.success(pack);
                }
                return service_result_1.ServiceResult.notFound();
            }
            catch (err) {
                return service_result_1.ServiceResult.failed();
            }
        });
    }
}
exports.PackService = PackService;
