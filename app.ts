import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import officeRouter from './routes/officeRoute';
import mongoose from 'mongoose';
import departRouter from './routes/departRoute';
import authRouter from './routes/authRoute';

import roleRouter from './routes/roleRoute';

import userRouter from './routes/userRoutes';
import patientRouter from './routes/patientRoute';

import appointmentRouter from './routes/appointmentRoute';
import billingRouter from './routes/billingRoute';

import consultationRouter from './routes/consultationRoute';
import diagnosisRouter from './routes/diagnosisRoute';
import drugsRouter from './routes/drugsRoute';
import sponsorRouter from './routes/sponsorRoute';
import serviceRouter from './routes/serviceRoute';
import encounterRouter from './routes/encounterRoute';
import transactionRouter from './routes/transactionRoute';
import resultRouter from './routes/resultRoute';





 dotenv.config();
// initialize express

const app = express();

app.use(express.json());



app.use(cors({
    origin: ["https://nelloehr.onrender.com", "*"], // Allow only your frontend
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true // Allow cookies if needed
}));

// app.use(cors()); 




app.get('/',function(req, res){
    return res.send("hello world");
});

// Register officeRouter with the correct path prefix
app.use('/api/office', officeRouter);

//department routes

app.use('/api/department',departRouter);

//authentication routes

app.use('/api/auth', authRouter);


//role routes

app.use('/api/role', roleRouter);

//user routes

app.use('/api/user', userRouter);

app.use('/api/patient', patientRouter);


app.use('/api/appointment', appointmentRouter);

app.use('/api/billing', billingRouter);

app.use('/api/consultation', consultationRouter);

app.use('/api/diagnosis', diagnosisRouter);

app.use('/api/drugs', drugsRouter);

app.use('/api/sponsor', sponsorRouter);

app.use('/api/service', serviceRouter);

app.use('/api/encounter', encounterRouter);

app.use('/api/transaction', transactionRouter);
app.use('/api/result', resultRouter);

// Retrieve the MongoDB URI from environment variables
const mongodbURI = process.env.MONGO_URI;

if (!mongodbURI) {
  console.error('MONGO_URI environment variable is not defined');
  process.exit(1); // Exit the process with a failure code
}

mongoose.connect(mongodbURI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');

}).catch(err => {
    console.error('Connection error', err);
});




const PORT = process.env.PORT;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  