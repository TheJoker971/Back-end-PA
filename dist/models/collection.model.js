"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectionSchema = void 0;
const mongoose_1 = require("mongoose");
exports.collectionSchema = new mongoose_1.Schema({
    name: {
        type: mongoose_1.Schema.Types.String,
        required: true
    },
    owner: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    }
});
