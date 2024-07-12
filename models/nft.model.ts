import {Schema} from "mongoose";
import {IPack} from "./pack.model";


export interface INFT {
    name:string;
    symbol: string;
    address: string;
    spicyPower:number;
    pack:IPack|string;
}

export const nftSchema = new Schema<INFT>({
    name:{
        type: Schema.Types.String,
        required: true
    },
    symbol:{
        type: Schema.Types.String,
        required: true
    },
    address: {
        type: Schema.Types.String,
        required: true
    },
    spicyPower:{
        type: Schema.Types.Number,
        required:false,
        default:null
    },
    pack:{
        type:Schema.Types.ObjectId,
        ref: "Pack",
        required:true
    }
},{
    versionKey: false
});