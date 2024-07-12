import {IUser} from "./user.model";
import {Schema} from "mongoose";


export interface IPack {
    name: string;
    symbol: string;
    address: string;
    user:IUser|string;
}

export const packSchema = new Schema<IPack>({
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
        required: true,
        ref:'User'
    }
},{
    versionKey : false
});