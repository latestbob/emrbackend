import { Types } from 'mongoose'

export interface AppointmentInterface {
    _id : Types.ObjectId;
      
    firstname: string;
    lastname: string;
    upi?: string | null;
    email: string;
    sponsor?: string | null;
    sponsor_plan?: string | null;
    office: string;
    office_uuid: string;
    uuid: string;
    purpose?:string | null;
    visit_type?:string | null;
   
    visit_date?:string | null;
    scheduled_time?:string | null;
    is_urgent?:boolean | null;
    comment?:string | null;
  
    vital_weight?:number | null;
    vital_height?:number | null;
    vital_blood_pressure?: number | null;
    vital_temperature?: number | null;
    vital_pulserate?: number | null;
    is_billed?:boolean | null;
    status?:string | null;
    appointment_schedule?:Date | null;
    createdAt?: Date;
    updatedAt?: Date | null;

    consultant?:string | null;
    biller?:string | null;
    consultant_uuid?:string | null;
    payment_policy?:string | null;
    
}