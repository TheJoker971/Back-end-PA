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
exports.AuthService = void 0;
const service_result_1 = require("./service.result");
const utils_1 = require("../utils");
class AuthService {
    constructor(modelRegistry) {
        this.modelRegistry = modelRegistry;
        this.userModel = modelRegistry.userModel;
        this.sessionModel = modelRegistry.sessionModel;
    }
    subscribe(firstname, name, login, signature) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userModel.create({
                    firstname: firstname,
                    name: name,
                    mail: login,
                    signature: signature
                });
                return service_result_1.ServiceResult.success(user);
            }
            catch (err) {
                const errDict = err;
                if (errDict['name'] === 'MongoServerError' && errDict['code'] === 11000) {
                    // duplicate login
                    return service_result_1.ServiceResult.conflict();
                }
                else {
                    return service_result_1.ServiceResult.failed();
                }
            }
        });
    }
    log(login, signature) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userModel.findOne({
                    mail: login,
                    signature: signature
                }).exec();
                if (user !== null) {
                    let dateMillis = new Date().getTime();
                    dateMillis += 600000000;
                    const session = yield this.sessionModel.create({
                        token: utils_1.SecurityUtils.randomToken(),
                        expirationDate: dateMillis,
                        user: user
                    });
                    return service_result_1.ServiceResult.success(session);
                }
                return service_result_1.ServiceResult.notFound();
            }
            catch (err) {
                return service_result_1.ServiceResult.failed();
            }
        });
    }
    getSession(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const session = yield this.sessionModel.findOne({
                    token: token,
                    expirationDate: {
                        $gt: new Date()
                    }
                }).populate('user').exec();
                if (session !== null) {
                    return service_result_1.ServiceResult.success(session);
                }
                return service_result_1.ServiceResult.notFound();
            }
            catch (err) {
                return service_result_1.ServiceResult.failed();
            }
        });
    }
}
exports.AuthService = AuthService;
