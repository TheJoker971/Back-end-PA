import {Model, Mongoose} from "mongoose";
import { ISession, sessionSchema } from "./session.model";
import {IUser, userSchema} from "./user.model";
import {packSchema, IPack} from "./pack.model";
import {INFT, nftSchema} from "./nft.model";

export class ModelRegistry {
    readonly mongoose: Mongoose;
    readonly userModel: Model<IUser>;
    readonly sessionModel: Model<ISession>;
    readonly packModel: Model<IPack>;
    readonly nftModel: Model<INFT>;

    constructor(mongoose: Mongoose) {
        this.mongoose = mongoose;
        this.userModel = mongoose.model('User', userSchema);
        this.sessionModel = mongoose.model('Session', sessionSchema);
        this.nftModel = mongoose.model('NFT', nftSchema);
        this.packModel = mongoose.model('Pack',packSchema);
    }
}