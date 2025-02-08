import { model, Document, Schema } from "mongoose";
import { PatientInterface } from "../interfaces/patientInterface";

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







interface IEncounter extends Document {

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








  
}

const EncounterSchema = new Schema<IEncounter>({

    uuid: {
        type: String,
        required: true,
      },
      payment_policy: {
        type: String,
        default: null,
      },
      patient: {
        type: Schema.Types.ObjectId,
        ref: "Patient",
        required: true,
      },
      request_date: {
        type: Date,
        required: true,
      },
      consultant: {
        type: String,
        required: true,
      },
      isUrgent: {
        type: Boolean,
        required: false,
      },
      comment: {
        type: String,
        default: null,
      },
      status: {
        type: String,
        default: null,
      },
      vitals: {
        weight: {
          type: Number,
          default: null,
        },
        height: {
          type: Number,
          default: null,
        },
        blood_pressure: {
          type: String,
          default: null,
        },
        temperature: {
          type: Number,
          default: null,
        },
        pulse_rate: {
          type: Number,
          default: null,
        },
      },
      allergies: {
        drugs: {
          type: [String],
          default: [],
        },
        food: {
          type: [String],
          default: [],
        },
        other: {
          type: [String],
          default: [],
        },
      },
      symptoms: {
        type: [String],
        default: null,
      },
      family_history: {
        type: [String],
        default: null,
      },
      social_history: {
        type: [String],
        default: null,
      },
      diagnosis: {
        type: [
          {
            name: String,
            suspected: Boolean,
          },
        ],
        default: null,
      },
      investigations: {
        type: [
          {
            name: String,
            amount: Number,
            billing_status: {
                type: String,
                default: null,
            },
          },
        ],
        default: null,
      },
      imaging: {
        type: [
          {
            name: String,
            amount: Number,
            billing_status: {
                type: String,
                default: null,
            },
          },
        ],
        default: null,
      },
      otherservices: {
        type: [
          {
            name: String,
            amount: Number,
            billing_status: {
                type: String,
                default: null,
            },
          },
        ],
        default: null,
      },
      prescription: {
        type: Schema.Types.Mixed,
        default: null,
      },
      invoice_status: {
        type: Boolean,
        default: null,
      },
      billing_status: {
        type: Boolean,
        default: null,
      },
      receipt_status: {
        type: Boolean,
        default: null,
      },
      billing_officer: {
        type: String,
        default: null,
      },
      outcome: {
        type: String,
        default: null,
      },

 

});

const encounterModel = model<IEncounter>("Encounter", EncounterSchema);
export default encounterModel;
