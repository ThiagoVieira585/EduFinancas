import { Request, Response } from "express";
import {CategoryService} from "../Service/categoriaService";
import { JwtPayload } from "jsonwebtoken";

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

    
    console.log(userId, "controller")
    const categoryData = req.body;
    try {
      const category = await this.categoriaService.createCategory(
        userId,
        categoryData
      );
      
      console.log(userId)
      return res.status(201).json(category);
    } catch (error) {
      return res.status(500).json( {message: "erro"});
    }
  }
}
