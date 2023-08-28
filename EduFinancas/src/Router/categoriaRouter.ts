import express from 'express';
import { CategoriaController } from '../Controller/categoriaController';
import authenticateMiddleware from '../Middleware/token';

const categoriaController = new CategoriaController();
const routerCategory = express.Router();
routerCategory.use(express.json());

routerCategory.post('/categoria/user', authenticateMiddleware, categoriaController.createCategory.bind(categoriaController));
// Adicione aqui as outras rotas para listar, atualizar e excluir categorias

export default routerCategory;
