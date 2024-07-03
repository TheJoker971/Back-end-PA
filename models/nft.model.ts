import {IUser} from "./user.model";
import {Schema} from "mongoose";


export interface INFT {
    name:string;
    spicyPower:number;
    owner:IUser;
}

export const NFTModel = new Schema<INFT>({
    name:{
        type: Schema.Types.String,
        required: true
    },
    spicyPower:{
        type: Schema.Types.Number,
        required:true
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},{
    versionKey: false
});