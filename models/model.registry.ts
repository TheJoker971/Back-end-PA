import {Model, Mongoose} from "mongoose";
import { ISession, sessionSchema } from "./session.model";
import {IUser, userSchema} from "./user.model";

export class ModelRegistry {
    readonly mongoose: Mongoose;
    readonly userModel: Model<IUser>;
    readonly sessionModel: Model<ISession>

    constructor(mongoose: Mongoose) {
        this.mongoose = mongoose;
        this.userModel = mongoose.model('User', userSchema);
        this.sessionModel = mongoose.model('Session', sessionSchema);
    }
}