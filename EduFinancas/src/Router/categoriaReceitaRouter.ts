import { Request, Response } from 'express';
import express from "express";
import { CategoriaReceitaController } from '../Controller/categoriaReceitaController';

const categoriaReceitaController = new CategoriaReceitaController();
const routerCategoriaReceita = express.Router();
routerCategoriaReceita.use(express.json());

routerCategoriaReceita.get("/categoriaReceita/:categoriaReceitaId", categoriaReceitaController.getCategoriaReceitaById.bind(categoriaReceitaController))
routerCategoriaReceita.get("/categoriaReceita"), categoriaReceitaController.getAllCategoriaReceita.bind(categoriaReceitaController)
routerCategoriaReceita.post("/categoriaReceita/:receitaId", categoriaReceitaController.createCategoriaReceita.bind(categoriaReceitaController))
routerCategoriaReceita.delete("/categoriaReceita/:categoriaReceitaId/receita/:receitaId", categoriaReceitaController.deleteCategoriaReceita.bind(categoriaReceitaController))
routerCategoriaReceita.put("/categoriaReceita/:categoriaReceitaId/receita/:receitaId", categoriaReceitaController.updateCategoriaReceita.bind(categoriaReceitaController))

export default routerCategoriaReceita;