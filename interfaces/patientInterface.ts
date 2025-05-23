import { Types } from 'mongoose'


interface IAllergies {
    drugs: string[];  // List of drug allergies
    food: string[];   // List of food allergies
    other: string[];  // List of other allergies (e.g., environmental, skin)
  }

export interface PatientInterface {
    _id : Types.ObjectId;
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
    password?: string|null;
    createdAt?: Date;
    updatedAt?: Date | null;
    dob?: string | null;
    gender?: string | null;
    allergies?: IAllergies;
    reference_source?: string | null;
    cash_balance_today?: number | null;
    insurance_balance_today?: number | null;
    registered_at?: String | null;
    
}