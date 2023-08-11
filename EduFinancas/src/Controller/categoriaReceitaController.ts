import { Response, Request } from "express";
import { ReceitaService } from "../Service/receitaService";
import { CategoriaReceitaService } from "../Service/categoriaReceitaService";

export class CategoriaReceitaController {
  private receitaService = new ReceitaService();
  private categoriaReceitaService = new CategoriaReceitaService();
  
  constructor() {
    this.receitaService = new ReceitaService();
    this.categoriaReceitaService = new CategoriaReceitaService();
  }

  async createCategoriaReceita(req: Request, res: Response) {
    const { receitaId } = req.params;
    const categoriaBody = req.body;

    try {
      const receita = await this.receitaService.getReceitaById(receitaId);
      if (!receita) {
        return res.status(404).json({
          error: true,
          code: 404,
          message: `Não existe categoria com esse id: ${receitaId}`,
        });
      }
      const newCategoria = await this.categoriaReceitaService.createCategoriaReceita(receitaId, categoriaBody);

      return res
        .status(201)
        .json({ newCategoria, receitaId: receita._id, message: "Categoria criada!" });
    } catch (error) {
      return res.status(400).json({
        error,
        message: "Bad request error",
      });
    }
  }
  async updateCategoriaReceita(req: Request, res: Response) {
    const { categoriaReceitaId } = req.params;
    const updatedData = req.body;

    try {
      const updatedReceitaData = await this.categoriaReceitaService.updateCategoriaReceita(categoriaReceitaId, updatedData);

      if (!updatedReceitaData) {
        return res.status(404).json({ message: "Id não encontrado" });
      }

      return res
        .status(200)
        .json({ updatedData, message: "Categoria atualizada" });
    } catch (error) {
      return res.status(400).json({ error, message: "Request error" });
    }
  }
  async deleteCategoriaReceita(req: Request, res: Response) {
    const { categoriaReceitaId, receitaId } = req.params;

    try {
      const receita = await this.receitaService.getReceitaById(receitaId);

      if (!receita) {
        return res.status(404).json({
          error: true,
          message: `Não existe ceita com esse id: ${receitaId}`,
        });
      }

      const deletedCategoriaData = await this.categoriaReceitaService.deleteCategoriaReceita(
        categoriaReceitaId,
        receitaId
      );
      if (!deletedCategoriaData) {
        return res.status(404).json({ message: "Não existe categoria" });
      }
      return res.status(204).send(); // 204 No Content
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error, message: "Request error" });
    }
  }
  async getCategoriaReceitaById(req: Request, res: Response) {
    const { categoriaReceitaId } = req.params;

    try {
      const categoria = await this.categoriaReceitaService.getCategoriaReceitaById(categoriaReceitaId);
      if (!categoria) {
        return res.status(404).json({ message: "Despesa não encontrada" });
      }

      return res.status(200).json(categoria);
    } catch (error) {
      return res.status(400).json({ error, message: "Request error" });
    }
  }
  async getAllCategoriaReceita(req: Request, res: Response) {
    try {
      // Chama o método do serviço para obter todos os tutores com seus pets associados
      const despesa = await this.categoriaReceitaService.getAllCategoriaReceita();

      return res
        .status(200)
        .json({ despesa, message: "Listando todas as categorai de receitas" });
    } catch (error) {
      // Em caso de erro, retorna uma resposta com o erro e uma mensagem de falha
      return res.status(500).json({ error, message: "Internal server error" });
    }
  }
}
