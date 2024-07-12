"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelRegistry = void 0;
const session_model_1 = require("./session.model");
const user_model_1 = require("./user.model");
const pack_model_1 = require("./pack.model");
const nft_model_1 = require("./nft.model");
class ModelRegistry {
    constructor(mongoose) {
        this.mongoose = mongoose;
        this.userModel = mongoose.model('User', user_model_1.userSchema);
        this.sessionModel = mongoose.model('Session', session_model_1.sessionSchema);
        this.nftModel = mongoose.model('NFT', nft_model_1.nftSchema);
        this.packModel = mongoose.model('Pack', pack_model_1.packSchema);
    }
}
exports.ModelRegistry = ModelRegistry;
