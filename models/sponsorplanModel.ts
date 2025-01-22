import { Schema, model, Document } from 'mongoose';

interface ISponsorPlan extends Document {
    name:string;
    plan_code:string;
    sponsor_uuid:string;
    plan_id?:string;
    is_Active?:boolean;
   

}

const sponsorplanSchema = new Schema<ISponsorPlan>({
    name: {
        type: String,
        required: true,
    },
    plan_code: {
        type: String,
        required: true,
    },
    sponsor_uuid: {
        type: String,
        required: false,
    },

    plan_id: {
        type: String,
        required: false,
        default:null
    },
    
    
    is_Active: {
        type: Boolean,
        required: false,
        default: true
    }

}, { timestamps: true
});

const sponsorplanModel = model<ISponsorPlan>('Sponsorplan', sponsorplanSchema);

export default sponsorplanModel;