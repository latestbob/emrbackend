import { Schema, model, Document } from 'mongoose';

interface IGeneric extends Document {
    generic_id:string,
    generic: string;
   

}

const drugenericSchema = new Schema<IGeneric>({
    generic_id: {
        type: String,
        required: true,
    },
    generic: {
        type: String,
        required: true,
    },
    

}, { timestamps: true
});

const drugenericModel = model<IGeneric>('Drugeneric', drugenericSchema);

export default drugenericModel;