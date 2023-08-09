import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Router from './src/Router/userRouter';

dotenv.config();


const app = express();
const port = process.env.PORT || 3000;

app.use(Router);

mongoose.connect(process.env.MONGODB_URI!)
  .then(() => {
    app.listen(port, () => {
      console.log(`Conectado ao banco de dados na porta ${port}`);
    });
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });
