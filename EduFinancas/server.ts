import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import RouterUser from './src/Router/userRouter';
import RouterDespesa from './src/Router/despesaRouter';
import RouterReceita from './src/Router/receitaRouter'
import RouterCategoriaReceita from './src/Router/categoriaReceitaRouter';

dotenv.config();


const app = express();
const port = process.env.PORT || 3000;

app.use(RouterUser);
app.use(RouterDespesa);
app.use(RouterReceita)
app.use(RouterCategoriaReceita)


mongoose.connect(process.env.MONGODB_URI!)
  .then(() => {
    app.listen(port, () => {
      console.log(`Conectado ao banco de dados na porta ${port}`);
    });
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });
