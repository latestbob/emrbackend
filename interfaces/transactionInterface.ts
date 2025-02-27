import { Types } from 'mongoose'


export interface ITransaction {
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