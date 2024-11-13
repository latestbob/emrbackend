import { model, Document, Schema } from 'mongoose';


interface IDepartment extends Document {
    office_uuid : string;
    name : string,
    branch?:string | null;
    isActive?:boolean;
    createdAt : Date;
}


const DepartSchema = new Schema<IDepartment>({

    office_uuid : {
        type : String,
        required: true,
    },

    name : {
        type : String,
        required : true,
    },
    branch : {
        type : String,
        required : false,
        default : null,
    },
    isActive : {
        type : Boolean,
        default : true,
    },

    createdAt : {
        type : Date,
        default: Date.now,
    }
});


const departModel = model<IDepartment>('Department', DepartSchema);
export default departModel;