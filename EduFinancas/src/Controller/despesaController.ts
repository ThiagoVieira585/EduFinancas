import { Response, Request } from "express";
import DespesaModel from "../Model/despesaModel";
import User from "../Model/userModel";

export class DespesaController {
 
  async createDespesa(req: Request, res: Response) {
    const { valor, data, descricao, categoriaId } = req.body; // Dados da requisição
    const userId = req.user?.id; // ID do usuário obtido do token

    if (!userId) {
      return res.status(401).json({ error: "Usuário não autenticado." });
    }

    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error(`Não tem usuário com esse id: ${userId}`);
      }
      const novaDespesa = new DespesaModel({
        valor,
        data,
        descricao,
        categoria: categoriaId, // ID da categoria
        user: userId, // ID do usuário
      });
      const despesaSalva = await novaDespesa.save();

      user.despesas.push(despesaSalva._id);
      await user.save();

      return res.status(201).json({despesaSalva, message: "Despesa criada com sucesso." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
  }
  async updateDespesa(req: Request, res: Response) {
    const { despesaId } = req.params;
    const userId = req.user?.id;
    const { valor, data, descricao, categoriaId } = req.body;

    if (!userId) {
      return res.status(401).json({ error: "Usuário não autenticado." });
    }

    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error(`Não existe usuário com o ID: ${userId}`);
      }

      const despesa = await DespesaModel.findById(despesaId);
      if (!despesa) {
        return res.status(404).json({ message: "Despesa não encontrada." });
      }

      // Verifica se a despesa pertence ao usuário
      if (despesa.user.toString() !== userId) {
        return res.status(403).json({ error: "Acesso não autorizado." });
      }

      despesa.valor = valor;
      despesa.data = data;
      despesa.descricao = descricao;
      despesa.categoria = categoriaId;

      await despesa.save();

      return res
        .status(200)
        .json({ message: "Despesa atualizada com sucesso." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
  }
  async deleteDespesa(req: Request, res: Response) {
    const { despesaId } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: "Usuário não autenticado." });
    }

    try {
      const despesa = await DespesaModel.findById(despesaId);

      if (!despesa) {
        return res.status(404).json({ error: "Despesa não encontrada." });
      }

      if (!despesa.user.equals(userId)) {
        return res.status(403).json({ error: "Acesso não autorizado." });
      }

      const deletedDespesa = await DespesaModel.findByIdAndDelete(despesaId);
      if (!deletedDespesa) {
        return res.status(404).json({ error: "Despesa não encontrada." });
      }

      const user = await User.findById(userId);
      if (user) {
        user.despesas = user.despesas.filter((id) => !id.equals(despesaId));
        await user.save();
      }

      return res.status(204).send(); // 204 No Content
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
  }
  async getAllDespesas(req: Request, res: Response) {
    try {
      const despesas = await DespesaModel.find();
      return res.status(200).json(despesas);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao obter as despesas." });
    }
  }

  async getDespesaById(req: Request, res: Response) {
    const { despesaId } = req.params;

    try {
      const despesa = await DespesaModel.findById(despesaId);
      if (!despesa) {
        return res.status(404).json({ message: "Despesa não encontrada." });
      }
      return res.status(200).json(despesa);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao obter a despesa." });
    }
  }
}
