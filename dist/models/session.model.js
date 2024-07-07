"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionSchema = void 0;
const mongoose_1 = require("mongoose");
exports.sessionSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    expirationDate: {
        type: mongoose_1.Schema.Types.Date,
        required: true
    },
    token: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        unique: true
    }
}, {
    versionKey: false // permet d'enlever le __v des documents
});
