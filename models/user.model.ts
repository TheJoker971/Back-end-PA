import {Schema} from "mongoose";

export interface IUser{
    name:string;
    firstname:string;
    mail:string;
    signature:string;
}

export const userSchema = new Schema<IUser>({
    name: {
        type: Schema.Types.String,
        required: true
    },
    firstname:{
        type: Schema.Types.String,
        required: true
    },
    mail: {
        type: Schema.Types.String,
        required: true
    },
    signature: {
        type: Schema.Types.String,
        required: true
    },
},{
    versionKey: false
});