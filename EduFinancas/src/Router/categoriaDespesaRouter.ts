import { Request, Response } from 'express';
import express from "express";
import { CategoriaDespesaController } from '../Controller/categoriaDespesaController';

const categoriaDespesaController = new CategoriaDespesaController();
const routerCategoriaDespesa = express.Router();
routerCategoriaDespesa.use(express.json());

routerCategoriaDespesa.get("/categoriaDespesa/:categoriaDespesaId", categoriaDespesaController.getCategoriaDespesaById.bind(categoriaDespesaController))
routerCategoriaDespesa.get("/categoriaDespesa"), categoriaDespesaController.getAllCategoriaDespesa.bind(categoriaDespesaController)
routerCategoriaDespesa.post("/categoriaDespesa/:despesaId", categoriaDespesaController.createCategoriaDespesa.bind(categoriaDespesaController))
routerCategoriaDespesa.delete("/categoriaDespesa/:categoriaDespesaId/despesa/:despesaId", categoriaDespesaController.deleteCategoriaDespesa.bind(categoriaDespesaController))
routerCategoriaDespesa.put("/categoriaDespesa/:categoriaDespesaId/despesa/:despesaId", categoriaDespesaController.updateCategoriaDespesa.bind(categoriaDespesaController))

export default routerCategoriaDespesa;