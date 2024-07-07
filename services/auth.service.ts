import {IUser} from "../models/user.model";
import {model, Model} from "mongoose";
import {ServiceResult} from "./service.result";
import {SecurityUtils} from "../utils";
import { ISession, ModelRegistry } from "../models";

export class AuthService{
    private userModel : Model<IUser>;
    private sessionModel: Model<ISession>;

    constructor(private modelRegistry: ModelRegistry){
        this.userModel = modelRegistry.userModel;
        this.sessionModel = modelRegistry.sessionModel;
    }

    async subscribe(firstname: string, name: string, login: string, signature: string): Promise<ServiceResult<IUser>> {
        try {
            const user = await this.userModel.create({
                firstname: firstname,
                name: name,
                mail: login,
                signature: signature
            });
            return ServiceResult.success(user);
        } catch(err) {
            const errDict = err as {[key: string]: unknown};
            if(errDict['name'] === 'MongoServerError' && errDict['code'] === 11000) {
                // duplicate login
                return ServiceResult.conflict();
            } else {
                return ServiceResult.failed();
            }
        }
    }

    async log(login: string, signature: string): Promise<ServiceResult<ISession>> {
        try {
            const user = await this.userModel.findOne({
                mail: login,
                signature: signature
            }).exec();
            if(user !== null) {
                let dateMillis = new Date().getTime();
                dateMillis += 600_000_000;
                const session = await this.sessionModel.create({
                    token: SecurityUtils.randomToken(),
                    expirationDate: dateMillis,
                    user: user
                });
                return ServiceResult.success(session);
            }
            return ServiceResult.notFound();
        } catch(err) {
            return ServiceResult.failed();
        }
    }

    async getSession(token: string): Promise<ServiceResult<ISession>> {
        try {
            const session = await this.sessionModel.findOne({
                token: token,
                expirationDate: {
                    $gt: new Date()
                }
            }).populate('user').exec();
            if(session !== null) {
                return ServiceResult.success(session);
            }
            return ServiceResult.notFound();
        } catch(err) {
            return ServiceResult.failed();
        }
    }

}