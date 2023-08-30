import { Response, Request } from "express";
import ReceitaModel from "../Model/receitaModel";
import User from "../Model/userModel";

export class ReceitaController {
 
  async createReceita(req: Request, res: Response) {
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
      const novaReceita = new ReceitaModel({
        valor,
        data,
        descricao,
        categoria: categoriaId, // ID da categoria
        user: userId, // ID do usuário
      });
      const receitaSalva = await novaReceita.save();

      user.receitas.push(receitaSalva._id);
      await user.save();

      return res.status(201).json({receitaSalva, message: "Receita criada com sucesso." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
  }
  async updateReceita(req: Request, res: Response) {
    const { receitaId } = req.params;
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

      const receita = await ReceitaModel.findById(receitaId);
      if (!receita) {
        return res.status(404).json({ message: "Receita não encontrada." });
      }

      // Verifica se a receita pertence ao usuário
      if (receita.user.toString() !== userId) {
        return res.status(403).json({ error: "Acesso não autorizado." });
      }

      receita.valor = valor;
      receita.data = data;
      receita.descricao = descricao;
      receita.categoria = categoriaId;

      await receita.save();

      return res
        .status(200)
        .json({ message: "Receita atualizada com sucesso." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
  }
  async deleteReceita(req: Request, res: Response) {
    const { receitaId } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: "Usuário não autenticado." });
    }

    try {
      const receita = await ReceitaModel.findById(receitaId);

      if (!receita) {
        return res.status(404).json({ error: "Receita não encontrada." });
      }

      if (!receita.user.equals(userId)) {
        return res.status(403).json({ error: "Acesso não autorizado." });
      }

      const deletedReceita = await ReceitaModel.findByIdAndDelete(receitaId);
      if (!deletedReceita) {
        return res.status(404).json({ error: "Receita não encontrada." });
      }

      const user = await User.findById(userId);
      if (user) {
        user.receitas = user.receitas.filter((id) => !id.equals(receitaId));
        await user.save();
      }

      return res.status(204).send(); // 204 No Content
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
  }
  async getAllReceitas(req: Request, res: Response) {
    try {
      const receitas = await ReceitaModel.find();
      return res.status(200).json(receitas);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao obter as receitas." });
    }
  }

  async getReceitaById(req: Request, res: Response) {
    const { receitaId } = req.params;

    try {
      const receita = await ReceitaModel.findById(receitaId);
      if (!receita) {
        return res.status(404).json({ message: "Receita não encontrada." });
      }
      return res.status(200).json(receita);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao obter a receita." });
    }
  }
}
