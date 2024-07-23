import {Schema} from "mongoose";
import {IPack} from "./pack.model";
import { IUser } from "./user.model";


export interface INFT {
    name:string;
    symbol: string;
    spicyPower:number;
    tokenId: number;
    pack:IPack|string;
    user:IUser|string;
    price: number;
    listed: boolean;
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
    spicyPower:{
        type: Schema.Types.Number,
        required:false,
        default:null
    },
    tokenId:{
        type: Schema.Types.Number,
        required:true,
        default:null
    },
    pack:{
        type:Schema.Types.ObjectId,
        ref: "Pack",
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        required: true,
        ref:'User'
    },
    price:{
        type: Schema.Types.Number,
        required:false,
        default:null
    },
    listed:{
        type: Schema.Types.Boolean,
        required: true,
        default: false
    }
},{
    versionKey: false
});