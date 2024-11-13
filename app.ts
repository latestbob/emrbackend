import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import officeRouter from './routes/officeRoute';
import mongoose from 'mongoose';
import departRouter from './routes/departRoute';
import authRouter from './routes/authRoute';

import roleRouter from './routes/roleRoute';

 dotenv.config();
// initialize express

const app = express();

app.use(express.json());

app.use(cors());


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
  