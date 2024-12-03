import {model, Document, Schema} from 'mongoose';


interface IUser  extends Document {
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
    dob?:string | null;
    gender?:string | null;
    aos?:string | null;
    fee?:number | null;


}


const UserSchema = new Schema<IUser>({
    
   firstname : {
        type : String,
        required : true,
   },
   lastname : {
        type : String,
        required : true,
    },

    email : {
        type : String,
        required : true,
    },

    password : {
        type : String,
        required : true,
    },

    phone : {
        type : String,
        required : true,
    },
    address : {
        type : String,
        required :false,
        default: null
    },
    profileImage : {
        type : String,
        required : false,
        default : null,
    },

    office : {
        type : String,
        required : true,
    },

    office_uuid : {
        type : String,
        required :true
    },

    role : {
        type : String,
        required : true,
    },


    department : {
        type : String,
        required : false,
        default: null,
    },

    dob : {
        type : String,
        required : false,
        default: null,
    },

    gender : {
        type : String,
        required : false,
        default: null,
    },

    aos : {
        type : String,
        required : false,
        default: null,
    },

    fee : {
        type : Number,
        required : false,
        default: null,
    },

  position : {
        type : String,
        required : false,
        default: null,
    },

    

    uuid : {
        type : String,
        required : false,
        default: null,
    },

   isActive : {
        type : Boolean,
        required : false,
        default: true,
    },

    createdAt : {
        type : Date,
        default : Date.now,
    },

    updatedAt : {
        type : Date,
        default :null,
    }



});


const userModel = model<IUser>('User',UserSchema);
export default userModel;
