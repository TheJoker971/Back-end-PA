"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.packSchema = void 0;
const mongoose_1 = require("mongoose");
exports.packSchema = new mongoose_1.Schema({
    name: {
        type: mongoose_1.Schema.Types.String,
        required: true
    },
    symbol: {
        type: mongoose_1.Schema.Types.String,
        required: true
    },
    address: {
        type: mongoose_1.Schema.Types.String,
        required: true
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    versionKey: false
});
