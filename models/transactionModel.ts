import { model, Document, Schema } from "mongoose";

interface Transaction extends Document {
    patientId: string; // ID of the patient associated with the transaction
    encounterUuid: string; // Optional: ID of the encounter (if applicable)
    date: Date; // Date and time of the transaction
    totalAmount: number; // Total amount of the transaction
    paymentStatus: "pending" | "paid" | "failed"; // Payment status
    paymentMethod: "cash" | "card" | "claims"; // Payment method
    paymentReference?: string; // Optional: Payment reference or transaction ID
    services: {
      // List of selected services
      investigations: Array<{
        _id: string; // Service ID
        name: string; // Service name
        amount: number; // Service price
        billingStatus: "pending" | "invoiced" | "billed"; // Billing status
      }>;
      imaging: Array<{
        _id: string;
        name: string;
        amount: number;
        billingStatus: "pending" | "invoiced" | "billed";
      }>;
      otherservices: Array<{
        _id: string;
        name: string;
        amount: number;
        billingStatus: "pending" | "invoiced" | "billed";
      }>;
    };
    createdBy: string; // ID of the user who created the transaction
    updatedBy?: string; // Optional: ID of the user who last updated the transaction
    createdAt: Date; // Timestamp for when the transaction was created
    updatedAt?: Date; // Optional: Timestamp for when the transaction was last updated
    sponsor:string;
    sponsor_plan:string;
  }

const transactionSchema = new Schema<Transaction>({
 
    patientId: { type: String, required: true },
    encounterUuid: { type: String, required: false },
    date: { type: Date, required: true },
    totalAmount: { type: Number, required: true },
    paymentStatus: { type: String, enum: ["pending", "paid", "failed"], required: true },
    paymentMethod: { type: String, enum: ["cash", "card", "claims"], required: true },
    paymentReference: { type: String, required: false },
    services: {
        investigations: {
            type: [
                {
                    _id: { type: String, required: true },
                    name: { type: String, required: true },
                    amount: { type: Number, required: true },
                    billingStatus: { type: String, enum: ["pending", "invoiced", "billed"], required: true },
                },
            ],
            required: false,
            default: [],
        },
        imaging: {
            type: [
                {
                    _id: { type: String, required: true },
                    name: { type: String, required: true },
                    amount: { type: Number, required: true },
                    billingStatus: { type: String, enum: ["pending", "invoiced", "billed"], required: true },
                },
            ],
            required: false,
            default: [],
        },
        otherservices: {
            type: [
                {
                    _id: { type: String, required: true },
                    name: { type: String, required: true },
                    amount: { type: Number, required: true },
                    billingStatus: { type: String, enum: ["pending", "invoiced", "billed"], required: true },
                },
            ],
            required: false,
            default: [],
        },
    },
    createdBy: { type: String, required: true },
    updatedBy: { type: String, required: false },
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: false },
    sponsor: { type: String, required: true },
    sponsor_plan: { type: String, required: true },
});

const TransactionModel = model<Transaction>("Transaction", transactionSchema);

export default TransactionModel;