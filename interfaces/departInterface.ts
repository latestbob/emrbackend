import { Types } from 'mongoose';


export interface DepartInterface {
    office_uuid : string;
    name : string,
    branch?:string | null;
    isActive?:boolean;
    createdAt : Date;
}