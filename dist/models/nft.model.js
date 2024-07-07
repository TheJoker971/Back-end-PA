"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NFTModel = void 0;
const mongoose_1 = require("mongoose");
exports.NFTModel = new mongoose_1.Schema({
    name: {
        type: mongoose_1.Schema.Types.String,
        required: true
    },
    spicyPower: {
        type: mongoose_1.Schema.Types.Number,
        required: true
    },
    owner: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    versionKey: false
});
