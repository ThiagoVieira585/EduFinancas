import { Request, Response } from 'express';
import express from "express";
import { DespesaController } from './../Controller/despesaController';
import autenticateMiddleware from '../Middleware/token'

const despesaController = new DespesaController();
const routerDespesa = express.Router();
routerDespesa.use(express.json());

// routerDespesa.get("/despesa"), despesaController.getAllDespesa.bind(despesaController)
routerDespesa.post("/despesa", autenticateMiddleware, despesaController.createDespesa.bind(despesaController))
routerDespesa.delete("/despesa/:despesaId",autenticateMiddleware, despesaController.deleteDespesa.bind(despesaController))
routerDespesa.put("/despesa/:despesaId",autenticateMiddleware, despesaController.updateDespesa.bind(despesaController))
routerDespesa.get("/despesa", autenticateMiddleware, despesaController.getAllDespesas);
routerDespesa.get("/despesa/:despesaId", autenticateMiddleware, despesaController.getDespesaById);


export default routerDespesa;