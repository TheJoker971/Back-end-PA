import {Mongoose} from "mongoose";
import express from "express";
import cors from "cors";
import {MongooseUtils} from "./mongoose.utils";
export class ApiUtils{
    constructor(){}

    public static async  launchAPI(){
        const db: Mongoose = await MongooseUtils.open();
        const app = express();
        app.use(cors());


        app.listen(process.env.PORT, function() {
            console.log(`Listening on ${process.env.PORT}`);
        });
    }

}