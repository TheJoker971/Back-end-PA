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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiUtils = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_utils_1 = require("./mongoose.utils");
class ApiUtils {
    constructor() { }
    static launchAPI() {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield mongoose_utils_1.MongooseUtils.open();
            const app = (0, express_1.default)();
            app.use((0, cors_1.default)());
            app.listen(process.env.PORT, function () {
                console.log(`Listening on ${process.env.PORT}`);
            });
        });
    }
}
exports.ApiUtils = ApiUtils;
