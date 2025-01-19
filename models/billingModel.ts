import { Schema, model, Document } from 'mongoose';

interface IBilling extends Document {
    patientUPI: string;
    encounterId: string;
    dateOfService: Date;
    placeOfService: string;
   amount:number;
   currency:string;

   provider: {
    office: string; //
    office_uuid: string; // 
  };

  billing_officer:string;
  billing_service:string;
  sponsor:string;
  sponsor_plan:string;



    status: 'paid' | 'unpaid' | 'pending';
    uuid?:string;
}

const billingSchema = new Schema<IBilling>({
    patientUPI: {
        type: String,
        required: true,
    },
    encounterId: {
        type: String,
        required: true,
    },
    dateOfService: {
        type: Date,
        required: true,
    },
    placeOfService: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        required: true,
    },
    provider: {
        office: {
            type: String,
            required: true,
        },
        office_uuid: {
            type: String,
            required: true,
        },
    },
    billing_officer: {
        type: String,
        required: true,
    },
    billing_service: {
        type: String,
        required: true,
    },
    sponsor: {
        type: String,
        required: true,
    },
    sponsor_plan: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['paid', 'unpaid', 'pending'],
        default: 'pending',
    },

    uuid: {
        type: String,
        required: false,
        default: null,
    },

}, { timestamps: true
});

const billingModel = model<IBilling>('Billing', billingSchema);

export default billingModel;