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
exports.CollectionService = void 0;
const service_result_1 = require("./service.result");
class CollectionService {
    constructor(registry) {
        this.collectionModel = registry.collectionModel;
        this.nftModel = registry.nftModel;
    }
    create(name, symbol, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const collection = yield this.collectionModel.findOne({
                    name: name,
                    symbol: symbol
                }).exec();
                if (collection !== null) {
                    return service_result_1.ServiceResult.conflict();
                }
                const newCollection = yield this.collectionModel.create(name, symbol, user);
                return service_result_1.ServiceResult.success(newCollection);
            }
            catch (err) {
                return service_result_1.ServiceResult.failed();
            }
        });
    }
    update(idCollection, name, symbol, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isUser = yield this.collectionModel.findOne({ _id: idCollection, user: user }).exec();
                if (isUser !== null) {
                    const update = yield this.collectionModel.findByIdAndUpdate(idCollection, {
                        $set: {
                            name: name,
                            symbol: symbol
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
    delete(idCollection, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hasNFT = yield this.nftModel.findOne({ collection: idCollection }).exec();
                if (hasNFT !== null) {
                    return service_result_1.ServiceResult.conflict();
                }
                const isUser = yield this.collectionModel.findOne({ _id: idCollection, user: user }).exec();
                if (isUser !== null) {
                    const remove = yield this.collectionModel.findByIdAndDelete(idCollection).exec();
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
                const collections = yield this.collectionModel.find().populate("user").exec();
                if (collections !== null) {
                    return service_result_1.ServiceResult.success(collections);
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
                const collections = yield this.collectionModel.find({ user: idUser }).populate("user").exec();
                if (collections !== null) {
                    return service_result_1.ServiceResult.success(collections);
                }
                return service_result_1.ServiceResult.notFound();
            }
            catch (err) {
                return service_result_1.ServiceResult.failed();
            }
        });
    }
    getCollectionById(idCollection) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const collection = yield this.collectionModel.findById(idCollection).populate("user").exec();
                if (collection !== null) {
                    return service_result_1.ServiceResult.success(collection);
                }
                return service_result_1.ServiceResult.notFound();
            }
            catch (err) {
                return service_result_1.ServiceResult.failed();
            }
        });
    }
}
exports.CollectionService = CollectionService;
