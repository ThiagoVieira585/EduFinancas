import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import RouterUser from './src/Router/userRouter';
import RouterDespesa from './src/Router/despesaRouter';
import RouterReceita from './src/Router/receitaRouter'
import RouterCategory from './src/Router/categoriaRouter';

dotenv.config();


const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(RouterUser);
app.use(RouterDespesa);
app.use(RouterReceita);
app.use(RouterCategory);

mongoose.connect(process.env.MONGODB_URI!)
  .then(() => {
    app.listen(port, () => {
      console.log(`Conectado ao banco de dados na porta ${port}`);
    });
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });
