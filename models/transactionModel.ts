import { model, Document, Schema } from "mongoose";
import { PatientInterface } from "../interfaces/patientInterface";


// patientId
// type -> enum(appointment, encounter, cashier)
// Payment_policy -> enum (cash, claims),
// Date
// billingOfficer
// totalAmount
// billingStatus
// sponsor
// sponsor_plan
// type_uuid (appointment, encounter)
// Payment_ref? Optional

interface Transaction extends Document {
    patientUPI: string; // ID of the patient associated with the transaction
    type: "appointment" | "encounter" | "cashier";
    type_uuid?:string; //uuid of the appointment, encounter, cashierbilling
    paymentMethod: "cash" | "card" | "claims"; // Payment method
    date: Date; // Date and time of the transaction
    billingOfficer: string
    totalAmount: number; // Total amount of the transaction
    paymentStatus: "pending" | "paid" | "failed"; // Payment status
    sponsor:string;
    sponsor_plan:string;
    
    paymentReference?: string; // Optional: Payment reference or transaction ID
    
    updatedBy?: string; // Optional: ID of the user who last updated the transaction
    createdAt: Date; // Timestamp for when the transaction was created
    updatedAt?: Date; // Optional: Timestamp for when the transaction was last updated

    month?: string | null; // Month of the transaction
    year?: number | null; // Year of the transaction
   
  }

const transactionSchema = new Schema<Transaction>({
 
patientUPI: { type: String, required: true },
type: { type: String, enum: ["appointment", "encounter", "cashier"], required: true },
type_uuid: { type: String },
paymentMethod: { type: String, enum: ["cash", "card", "claims"], required: true },
date: { type: Date, required: true },
billingOfficer: { type: String, required: true },
totalAmount: { type: Number, required: true },
paymentStatus: { type: String, enum: ["pending", "paid", "failed"], required: true },
sponsor: { type: String, required: true },
sponsor_plan: { type: String, required: true },
paymentReference: { type: String },
updatedBy: { type: String },
createdAt: { type: Date, default: Date.now, required: true },
updatedAt: { type: Date },

month: {type:String, required:false, default:null},
year: {type:String, required:false, default:null},


});

const TransactionModel = model<Transaction>("Transaction", transactionSchema);

export default TransactionModel;