import { Request, Response } from "express";
import { CategoryService } from "../Service/categoriaService";
import { JwtPayload } from "jsonwebtoken";
import Categoria from "../Model/categoriaModel";

interface DecodedToken extends JwtPayload {
  id: string;
}

export class CategoriaController {
  private categoriaService: CategoryService;

  constructor() {
    this.categoriaService = new CategoryService();
  }

  async createCategory(req: Request, res: Response) {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: "Id inexistente" });
    }

    const categoryData = req.body;
    try {
      const category = await this.categoriaService.createCategory(
        userId,
        categoryData
      );

      console.log(userId);
      return res.status(201).json(category);
    } catch (error) {
      return res.status(500).json({ message: "erro" });
    }
  }
  async updateCategoria(req: Request, res: Response) {
    const { id } = req.params;
    const categoryData = req.body;

    try {
      const updatedCategory = await this.categoriaService.updateCategory(
        id,
        categoryData
      );

      if (!updatedCategory) {
        return res
          .status(404)
          .json({ updatedCategory, message: "Categoria não encontrada" });
      }

      res
        .status(200)
        .json({ updatedCategory, message: "Categoria atualizada" });
    } catch (error) {
      res.status(500).json({ message: "erro" });
    }
  }
  async getAllCategoria(req: Request, res: Response) {
    try {
      const categorias = await this.categoriaService.getAllCategoria();

      return res
        .status(200)
        .json({ categorias, message: "Listing All Tutors and Pets" });
    } catch (error) {
      res.status(500).json({ message: "erro" });
    }
  }
  async findById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const categoriaId = await this.categoriaService.findById(id);
      if (!categoriaId) {
        return res.status(404).json({ message: "Categoria não encontrada" });
      }

      return res.status(200).json({ categoriaId });
    } catch (error) {
      res.status(500).json({ message: "erro" });
    }
  }
  async deleteCategoria(req: Request, res: Response) {
    const { categoriaId } = req.params; // Renomeado para categoriaId para evitar conflito
    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).json({ error: "Id inexistente" });
    }

    try {
        const deletedData = await this.categoriaService.deleteCategoria(
            categoriaId, // Usando o categoriaId da URL
            userId
        );
        
        if (!deletedData) {
            return res.status(404).json({ message: "Não existe categoria com esse id" });
        }

        return res.status(204).send(); // 204 No Content
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error, message: "Request error" });
    }
}
}
