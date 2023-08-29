import express from "express";
import { CategoriaController } from "../Controller/categoriaController";
import authenticateMiddleware from "../Middleware/token";

const categoriaController = new CategoriaController();
const routerCategory = express.Router();
routerCategory.use(express.json());

routerCategory.post(
  "/categoria/user",
  authenticateMiddleware,
  categoriaController.createCategory.bind(categoriaController)
);
routerCategory.put(
  "/categoria/:id",
  authenticateMiddleware,
  categoriaController.updateCategoria.bind(categoriaController)
);
routerCategory.get(
  "/categoria",
  authenticateMiddleware,
  categoriaController.getAllCategoria.bind(categoriaController)
);
routerCategory.get(
  "/categoria/:id",
  authenticateMiddleware,
  categoriaController.findById.bind(categoriaController)
);
routerCategory.delete("/categoria/:categoriaId/user", authenticateMiddleware, categoriaController.deleteCategoria.bind(categoriaController))

export default routerCategory;
