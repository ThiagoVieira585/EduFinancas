import { Response, Request } from "express";
import { DespesaService } from "../Service/despesaService";
import { CategoriaDespesaService } from "../Service/categoriaDespesaService";

export class CategoriaDespesaController {
  private despesaService = new DespesaService();
  private categoriaDespesaService = new CategoriaDespesaService();
  
  constructor() {
    this.despesaService = new DespesaService();
    this.categoriaDespesaService = new CategoriaDespesaService();
  }

  async createCategoriaDespesa(req: Request, res: Response) {
    const { despesaId } = req.params;
    const categoriaBody = req.body;

    try {
      const despesa = await this.despesaService.getDespesaById(despesaId);
      if (!despesa) {
        return res.status(404).json({
          error: true,
          code: 404,
          message: `Não existe categoria com esse id: ${despesaId}`,
        });
      }
      const newCategoria = await this.categoriaDespesaService.createCategoriaDespesa(despesaId, categoriaBody);

      return res
        .status(201)
        .json({ newCategoria, despesaId: despesa._id, message: "Categoria criada!" });
    } catch (error) {
      return res.status(400).json({
        error,
        message: "Bad request error",
      });
    }
  }
  async updateCategoriaDespesa(req: Request, res: Response) {
    const { categoriaDespesaId } = req.params;
    const updatedData = req.body;

    try {
      const updatedDespesaData = await this.categoriaDespesaService.updateCategoriaDespesa(categoriaDespesaId, updatedData);

      if (!updatedDespesaData) {
        return res.status(404).json({ message: "Id não encontrado" });
      }

      return res
        .status(200)
        .json({ updatedData, message: "Categoria atualizada" });
    } catch (error) {
      return res.status(400).json({ error, message: "Request error" });
    }
  }
  async deleteCategoriaDespesa(req: Request, res: Response) {
    const { categoriaDespesaId, despesaId } = req.params;

    try {
      const despesa = await this.despesaService.getDespesaById(despesaId);

      if (!despesa) {
        return res.status(404).json({
          error: true,
          message: `Não existe ceita com esse id: ${despesaId}`,
        });
      }

      const deletedCategoriaData = await this.categoriaDespesaService.deleteCategoriaDespesa(
        categoriaDespesaId,
        despesaId
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
  async getCategoriaDespesaById(req: Request, res: Response) {
    const { categoriaDespesaId } = req.params;

    try {
      const categoria = await this.categoriaDespesaService.getCategoriaDespesaById(categoriaDespesaId);
      if (!categoria) {
        return res.status(404).json({ message: "Despesa não encontrada" });
      }

      return res.status(200).json(categoria);
    } catch (error) {
      return res.status(400).json({ error, message: "Request error" });
    }
  }
  async getAllCategoriaDespesa(req: Request, res: Response) {
    try {
      // Chama o método do serviço para obter todos os tutores com seus pets associados
      const despesa = await this.categoriaDespesaService.getAllCategoriaDespesa();

      return res
        .status(200)
        .json({ despesa, message: "Listando todas as categorai de despesas" });
    } catch (error) {
      // Em caso de erro, retorna uma resposta com o erro e uma mensagem de falha
      return res.status(500).json({ error, message: "Internal server error" });
    }
  }
}
