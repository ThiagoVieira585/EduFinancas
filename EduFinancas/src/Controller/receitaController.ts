import { Response, Request } from "express";
import Receita from "../Model/receitaModel";
import { UserService } from "../Service/userService";
import User from "../Model/userModel";
import { ReceitaService } from "../Service/receitaService";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";

export class ReceitaController {
  private receitaService = new ReceitaService();
  private userService = new UserService();

  constructor() {
    this.receitaService = new ReceitaService();
    this.userService = new UserService();
  }

  async createReceita(req: Request, res: Response) {
    const { userId } = req.params;
    const receitaBody = req.body;

    try {
      const user = await this.userService.getUserById(userId);
      if (!user) {
        return res.status(404).json({
          error: true,
          code: 404,
          message: `No tutor with id ${userId}`,
        });
      }
      const newReceita = await this.receitaService.createReceita(
        userId,
        receitaBody
      ); // Aqui é onde ocorre o erro

      return res
        .status(201)
        .json({ newReceita, userId: user._id, message: "Receita criada!" });
    } catch (error) {
      return res.status(400).json({
        error,
        message: "Bad request error",
      });
    }
  }
  async updateReceita(req: Request, res: Response) {
    const { receitaId } = req.params;
    const updatedData = req.body;

    try {
      const updatedUserData = await this.receitaService.updateReceita(
        receitaId,
        updatedData
      );

      if (!updatedUserData) {
        return res.status(404).json({ message: "Id não encontrado" });
      }

      return res
        .status(200)
        .json({ updatedData, message: "Receita atualizada" });
    } catch (error) {
      return res.status(400).json({ error, message: "Request error" });
    }
  }
  async deleteReceita(req: Request, res: Response) {
    const { receitaId, userId } = req.params;

    try {
      const user = await this.userService.getUserById(userId);

      if (!user) {
        return res.status(404).json({
          error: true,
          message: `Não existe usuário com esse id: ${userId}`,
        });
      }

      const deletedUserData = await this.receitaService.deleteReceita(
        receitaId,
        userId
      );
      if (!deletedUserData) {
        return res.status(404).json({ message: "Não existe receita" });
      }

      return res.status(204).send(); // 204 No Content
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error, message: "Request error" });
    }
  }
  async getReceitaById(req: Request, res: Response) {
    const { receitaId } = req.params;

    try {
      const receita = await this.receitaService.getReceitaById(receitaId);
      if (!receita) {
        return res.status(404).json({ message: "Receita não encontrada" });
      }

      return res.status(200).json(receita);
    } catch (error) {
      return res.status(400).json({ error, message: "Request error" });
    }
  }
  async getAllReceita(req: Request, res: Response) {
    try {
      const despesa = await this.receitaService.getAllReceita();

      return res
        .status(200)
        .json({ despesa, message: "Listando todas as receitas" });
    } catch (error) {
      return res.status(500).json({ error, message: "Internal server error" });
    }
  }
}
