import { Schema, model, Document } from 'mongoose';

// Interface defining the structure of a User document
interface IOffice extends Document {
    name: string;
    email: string;
    phone : string;
    address? : string | null;
    logoUrl? : string  | null;
    isActive : boolean;
    isSubscribed? : boolean;
    userCount? : number;
    slogan? : string;
    uuid? :string;
    createdAt:Date;
}

// Schema definition for User
const OfficeSchema = new Schema<IOffice>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone : {
        type : String,
        required: true,
    }
    ,

    address : {
        type :String,
        required:false,
        default:null,

    },

    logoUrl : {
        type : String,
        required: false,
        default:null,
    },

    isActive : {
        type : Boolean,
        required : false,
        default:true,
    },

    isSubscribed : {
        type : Boolean,
        required: false,
        default:false,
    },

    userCount : {
        type : Number,
        required : false,
        default:0
    },

    slogan : {
        type : String,
        required : false
    }
    ,

    uuid: {
        type:String,
        required:false,
        
    },
    createdAt: { 
        type: Date, 
        default: Date.now }
});

// Model creation for User
const officeModel = model<IOffice>('Office', OfficeSchema);

export default officeModel;
