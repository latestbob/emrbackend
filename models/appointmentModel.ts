import { model, Document, Schema } from "mongoose";

interface IAppointment extends Document {
    
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

  consultant_uuid?:string | null;

 

 
}

const AppointmentSchema = new Schema<IAppointment>({
  

  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },

  upi: {
    type: String,
    required: false,
    default: null,
  },

email: {
    type: String,
    required: false,
    default: null,
  },

  purpose: {
    type: String,
    required: false,
    default: null,
  },

  visit_type: {
    type: String,
    required: false,
    default: null,
  },

  visit_date: {
    type: String,
    required: false,
    default: null,
  },


  scheduled_time: {
    type: String,
    required: false,
    default: null,
  },


  is_urgent: {
    type: Boolean,
    required: false,
    default: null,
  },

  comment: {
    type: String,
    required: false,
    default: null,
  },

  vital_height: {
    type: Number,
    required: false,
    default: null,
  },

  vital_weight: {
    type: Number,
    required: false,
    default: null,
  },

  vital_blood_pressure: {
    type: Number,
    required: false,
    default: null,
  },

  vital_temperature: {
    type: Number,
    required: false,
    default: null,
  },

  vital_pulserate: {
    type: Number,
    required: false,
    default: null,
  },


  sponsor: {
    type: String,
    required: false,
    default: null,
  },

  sponsor_plan: {
    type: String,
    required: false,
    default: null,
  },
 



  office: {
    type: String,
    required: true,
  },

  office_uuid: {
    type: String,
    required: true,
  },

 

  uuid: {
    type: String,
    required: false,
    default: null,
  },

 appointment_schedule: {
    type: Date,
    default: null,
  },

 
  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: null,
  },

  consultant: {
    type: String,
    default: null,
  },

  is_billed: {
    type: Boolean,
    default: null,
  },

  status: {
    type: String,
    default: null,
  },

  consultant_uuid: {
    type: String,
    default: null,
  },

  
});

const appointmentModel = model<IAppointment>("Appointment", AppointmentSchema);
export default appointmentModel;
