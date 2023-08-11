import { Request, Response } from 'express';
import express from "express";
import { DespesaController } from './../Controller/despesaController';

const despesaController = new DespesaController();
const routerDespesa = express.Router();
routerDespesa.use(express.json());

routerDespesa.get("/despesa/:despesaId", despesaController.getDespesaById.bind(despesaController))
routerDespesa.get("/despesa", despesaController.getAllDespesa.bind(despesaController))
routerDespesa.post("/despesa/:userId", despesaController.createDespesa.bind(despesaController))
routerDespesa.delete("/despesa/:despesaId/user/:userId", despesaController.deleteDespesa.bind(despesaController))
routerDespesa.put("/despesa/:despesaId/user/:userId", despesaController.updateDespesa.bind(despesaController))


export default routerDespesa;