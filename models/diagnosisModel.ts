import { Schema, model, Document } from 'mongoose';

interface IDiagnosis extends Document {
    code:string,
    name: string;
   

}

const diagnosisSchema = new Schema<IDiagnosis>({
    code: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    

}, { timestamps: true
});

const diagnosisModel = model<IDiagnosis>('Diagnosis', diagnosisSchema);

export default diagnosisModel;