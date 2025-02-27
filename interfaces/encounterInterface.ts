import { Types } from 'mongoose'
import { PatientInterface } from './patientInterface';


interface IAllergies {
  drugs: string[];  // List of drug allergies
  food: string[];   // List of food allergies
  other: string[];  // List of other allergies (e.g., environmental, skin)
}

interface IVitalSigns {
    weight?: number | null;          // Weight in kilograms
    height?: number | null;          // Height in centimeters
    blood_pressure?: string | null;  // Blood pressure in format "systolic/diastolic"
    temperature?: number | null;     // Body temperature in Celsius
    pulse_rate?: number | null;      // Pulse rate in beats per minute
}


interface ISymptoms {
    symptoms: string[];  // List of symptoms
}

interface DiagnosisType {
    name: string;
    suspected: boolean;
 
  };

  interface InvestigationType {
    name: string;
   amount: number;
   billing_status?: string | null;
  };

  interface ImagingType {
    name: string;
   amount: number;
   billing_status?: string | null;
  };


  interface ServiceType {
    name: string;
   amount: number;
   billing_status?: string | null;
  };







export interface IEncounter extends Document {

    uuid:string;
    payment_policy?: string | null;

    patient: PatientInterface;
    request_date: Date;
    consultant : string;
    isUrgent : boolean;
    comment?: string | null;
    status?: string | null;
    vitals : IVitalSigns;
    allergies : IAllergies;
    symptoms? : string[] | null;
    family_history?: string[] | null;
    social_history?: string[] | null;
    diagnosis?: DiagnosisType[] | null;
    investigations?: InvestigationType[] | null;
    imaging?: ImagingType[] | null;
    otherservices? : ServiceType[] | null;
    prescription?: null;

    invoice_status?: boolean | null;
    billing_status?: boolean | null;
    receipt_status?: boolean | null;

    billing_officer?: string | null;

    outcome?: string | null;

    appointment_uuid?: string | null;








  
}