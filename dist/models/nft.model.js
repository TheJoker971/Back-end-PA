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
        required: true
    },
    collection: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Collection",
        required: true
    }
}, {
    versionKey: false
});
