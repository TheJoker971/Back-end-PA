import {IUser} from "./user.model";
import {Schema} from "mongoose";


export interface ICollection {
    name: string;
    symbol: string;
    address: string;
    user:IUser;
}

export const collectionSchema = new Schema<ICollection>({
    name:{
        type:Schema.Types.String,
        required: true
    },
    symbol:{
        type:Schema.Types.String,
        required: true
    },
    address:{
        type:Schema.Types.String,
        required: true
    },
    user:{
        type:Schema.Types.ObjectId,
        required: true
    }
});