import { model, Document, Schema } from 'mongoose';


interface IRole extends Document {
    office_uuid : string;
    name : string,
    createdAt : Date;
}


const RoleSchema = new Schema<IRole>({

    office_uuid : {
        type : String,
        required: true,
    },

    name : {
        type : String,
        required : true,
    },
 
    createdAt : {
        type : Date,
        default: Date.now,
    }
});


const roleModel = model<IRole>('Role', RoleSchema);
export default roleModel;