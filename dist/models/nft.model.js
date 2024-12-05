"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nftSchema = void 0;
const mongoose_1 = require("mongoose");
exports.nftSchema = new mongoose_1.Schema({
    name: {
        type: mongoose_1.Schema.Types.String,
        required: true
    },
    symbol: {
        type: mongoose_1.Schema.Types.String,
        required: true
    },
    spicyPower: {
        type: mongoose_1.Schema.Types.Number,
        required: false,
        default: null
    },
    tokenId: {
        type: mongoose_1.Schema.Types.Number,
        required: true,
        default: null
    },
    pack: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Pack",
        required: true
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    price: {
        type: mongoose_1.Schema.Types.Number,
        required: false,
        default: null
    },
    listed: {
        type: mongoose_1.Schema.Types.Boolean,
        required: true,
        default: false
    },
    tokenURI: {
        type: mongoose_1.Schema.Types.String,
        required: true
    }
}, {
    versionKey: false
});
