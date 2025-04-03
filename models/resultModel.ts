import mongoose, { Schema, Document } from "mongoose";

// Interface for Result
export interface IResult extends Document {
  encounterUuid? : string;
  userType:string;
  
  testType: "Pathology Investigations" | "Imaging Investigations";
  testDetails: {
    testName: string;
    description?: string;
    sampleType?: string; // e.g., "Blood", "Urine", "X-ray"
  };
  status: "completed" | "pending";
  results?: {
    resultFile?: string; // URL or file path for reports like PDFs, images
    notes?: string; // Interpretation notes from the lab/radiologist
     // Key-Value for test parameters
  };
  uploadedBy?: string; // Lab technician/radiologist
  createdAt: Date;
  updatedAt?: Date | null;

}

// Define Schema
const ResultSchema: Schema = new Schema(
  {
    encounterUuid: { type: String, required: true },
    userType: { type: String, required: true },
    testType: { type: String, required: true },
    testDetails: {
      testName: { type: String, required: true },
      description: { type: String, required:false, default:null },
      sampleType: { type: String }, // Optional, e.g., blood, urine
    },
    status: { type: String, required:true },
    results: {
      resultFile: { type: String }, // Cloud storage URL or file path
      notes: { type: String },
      
    },
    uploadedBy: { type: String, required:false },
    
  },
  { timestamps: true } // Automatically adds createdAt & updatedAt fields
);

// Create Model
const resultModel = mongoose.model<IResult>("Result", ResultSchema);

export default resultModel;
