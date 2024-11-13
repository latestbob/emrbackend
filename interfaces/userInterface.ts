import { Types } from 'mongoose'

export interface UserInterface {
    _id : Types.ObjectId;
    firstname:string;
    lastname: string;
    email:string;
    phone:string;
    address?:string | null;
    profileImage:string | null;
    office:string;
    office_uuid:string;
    uuid:string;
    role?:string | null;
    department?:string | null;
    position?:string | null;
    isActive?:boolean;
    password:string;
    createdAt?:Date;
    updatedAt?:Date | null;
    
}