import {IUser} from "../models/user.model";

export class AuthService{
    private userModel : IUser;

    constructor(userModel:IUser){
        this.userModel = userModel;
    }

    async subscribe(name:string,firstname:string,mail:string,signature:string){

    }

}