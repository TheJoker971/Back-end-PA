import {IUser} from "./user.model";
import {Schema} from "mongoose";


export interface ICollection {
    name: string;
    owner:IUser;
}

export const collectionSchema = new Schema<ICollection>({
    name:{
        type:Schema.Types.String,
        required: true
    },
    owner:{
        type:Schema.Types.ObjectId,
        required: true
    }
});