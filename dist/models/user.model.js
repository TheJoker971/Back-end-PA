"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
exports.userSchema = new mongoose_1.Schema({
    name: {
        type: mongoose_1.Schema.Types.String,
        required: true
    },
    firstname: {
        type: mongoose_1.Schema.Types.String,
        required: true
    },
    mail: {
        type: mongoose_1.Schema.Types.String,
        required: true
    },
    signature: {
        type: mongoose_1.Schema.Types.String,
        required: true
    },
}, {
    versionKey: false
});
