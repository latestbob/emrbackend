import { Schema, model, Document, Decimal128 } from 'mongoose';

interface IService extends Document {
    type:string;
    name:string;
    price: Number;
    sponsor_uuid:string;
    plan_code:string;
    uuid:string;
    is_Active?:boolean;
    
   

}

const serviceSchema = new Schema<IService>({
   
    type: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    
    price: {
        type: Number,
        required: true,
    },
    
    sponsor_uuid: {
        type: String,
        required: true,
    },
    
    plan_code: {
        type: String,
        required: true,
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

const serviceModel = model<IService>('Service', serviceSchema);

export default serviceModel;