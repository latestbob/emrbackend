import { model, Document, Schema } from "mongoose";

interface IPatient extends Document {
  title: string;
  firstname: string;
  lastname: string;
  middlename?: string | null;
  fullname?: string | null;
  upi?: string | null;
  email: string;
  phone: string;
  marital_status?: string | null;
  address?: string | null;
  state?: string | null;
  city?: string | null;
  religion?: string | null;
  blood_group?: string | null;
  genotype?: string | null;
  next_of_kin?: string | null;
  next_of_kin_relationship?: string | null;
  next_of_kin_phone?: string | null;
  next_of_kin_address?: string | null;
  height?: string | null;
  weight?: string | null;
  sponsor?: string | null;
  sponsor_plan?: string | null;
  profileImage: string | null;
  office: string;
  office_uuid: string;
  uuid: string;
  occupation?: string | null;

  isActive?: boolean;
  password?: string | null;
  createdAt?: Date;
  updatedAt?: Date | null;
  dob?: string | null;
  gender?: string | null;
}

const PatientSchema = new Schema<IPatient>({
  title: {
    type: String,
    required: true,
  },

  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },

  middlename: {
    type: String,
    required: false,
    default: null,
  },

  fullname: {
    type: String,
    required: false,
    default: null,
  },

  upi: {
    type: String,
    required: false,
    default: null,
  },

  marital_status: {
    type: String,
    required: false,
    default: null,
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: false,
    default: null
  },

  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: false,
    default: null,
  },

  state: {
    type: String,
    required: false,
    default: null,
  },

  city: {
    type: String,
    required: false,
    default: null,
  },

  religion: {
    type: String,
    required: false,
    default: null,
  },

  blood_group: {
    type: String,
    required: false,
    default: null,
  },

  genotype: {
    type: String,
    required: false,
    default: null,
  },

  next_of_kin: {
    type: String,
    required: false,
    default: null,
  },

  next_of_kin_relationship: {
    type: String,
    required: false,
    default: null,
  },

  next_of_kin_phone: {
    type: String,
    required: false,
    default: null,
  },

  next_of_kin_address: {
    type: String,
    required: false,
    default: null,
  },

  height: {
    type: String,
    required: false,
    default: null,
  },

  weight: {
    type: String,
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
  occupation: {
    type: String,
    required: false,
    default: null,
  },

  profileImage: {
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

 

  dob: {
    type: String,
    required: false,
    default: null,
  },

  gender: {
    type: String,
    required: false,
    default: null,
  },

  uuid: {
    type: String,
    required: false,
    default: null,
  },

  isActive: {
    type: Boolean,
    required: false,
    default: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: null,
  },
});

const patientModel = model<IPatient>("Patient", PatientSchema);
export default patientModel;
