import {IUser} from "./user.model";
import {Schema} from "mongoose";
import {ICollection} from "./collection.model";


export interface INFT {
    name:string;
    spicyPower:number;
    collection:ICollection;
}

export const nftSchema = new Schema<INFT>({
    name:{
        type: Schema.Types.String,
        required: true
    },
    spicyPower:{
        type: Schema.Types.Number,
        required:true
    },
    collection:{
        type:Schema.Types.ObjectId,
        ref: "Collection",
        required:true
    }
},{
    versionKey: false
});