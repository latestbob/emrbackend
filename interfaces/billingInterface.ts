import { Types } from 'mongoose'

export interface BillingInterface {
    _id : Types.ObjectId;
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