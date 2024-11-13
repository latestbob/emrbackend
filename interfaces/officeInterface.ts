import { Types } from "mongoose"

export interface OfficeInterface {
    _id?: Types.ObjectId; 
    name :string;
    email:string;
    phone:string;
    address ? :string | null;
    logoUrl? : string | null;
    isActive : boolean;
    isSubscribed? : boolean ;
    userCount? : number;
    slogan? : string;
    uuid? :string;
    createdAt?:Date;
}