import { Types } from 'mongoose'

export interface IAddResult {
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