import { Request, Response } from 'express';
import express from "express";
import { ReceitaController } from './../Controller/receitaController';
import autenticateMiddleware from '../Middleware/token'

const receitaController = new ReceitaController();
const routerReceita = express.Router();
routerReceita.use(express.json());

// routerReceita.get("/receita"), receitaController.getAllReceita.bind(receitaController)
routerReceita.post("/receita", autenticateMiddleware, receitaController.createReceita.bind(receitaController))
routerReceita.delete("/receita/:receitaId",autenticateMiddleware, receitaController.deleteReceita.bind(receitaController))
routerReceita.put("/receita/:receitaId",autenticateMiddleware, receitaController.updateReceita.bind(receitaController))
routerReceita.get("/receita", autenticateMiddleware, receitaController.getAllReceitas);
routerReceita.get("/receita/:receitaId", autenticateMiddleware, receitaController.getReceitaById);


export default routerReceita;