"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelRegistry = void 0;
const session_model_1 = require("./session.model");
const user_model_1 = require("./user.model");
class ModelRegistry {
    constructor(mongoose) {
        this.mongoose = mongoose;
        this.userModel = mongoose.model('User', user_model_1.userSchema);
        this.sessionModel = mongoose.model('Session', session_model_1.sessionSchema);
    }
}
exports.ModelRegistry = ModelRegistry;
