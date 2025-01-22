import { Schema, model, Document } from 'mongoose';

interface ISponsor extends Document {
    name:string;
    type:string;
    phone?:string;
    contact_email?:string;
    contact_person?:string;
    uuid:string;
    is_Active?:boolean;
   

}

const sponsorSchema = new Schema<ISponsor>({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: false,
    },
    contact_email: {
        type: String,
        required: false,
        default:null,
    },
    contact_person: {
        type: String,
        required: false,
        default:null,
    },
    uuid: {
        type: String,
        required: true,
    },
    is_Active: {
        type: Boolean,
        required: false,
        default: true
    }

}, { timestamps: true
});

const sponsorModel = model<ISponsor>('Sponsor', sponsorSchema);

export default sponsorModel;