import Receita from "../Model/receitaModel";
import CategoriaReceita from "../Model/categoriaReceita";

export class CategoriaReceitaRepository {
  async createCategoriaReceita(receitaId: string, categoriaData: any) {
    try {
      const receita = await Receita.findById(receitaId);
      if (!receita) {
        throw new Error(`Não tem usuário com esse id: ${receitaId}`);
      }

      const novaCategoria = new CategoriaReceita({
        nome: categoriaData.nome,
        receitaId: receita._id, // Associando a categoria a receita
      });

      const categoriaSalva = await novaCategoria.save();

      // Adicionando a nova receita ao array de receitas do usuário
      receita.categoriaReceita.push(categoriaSalva._id);
      await receita.save();

      return categoriaSalva;
    } catch (error) {
      throw error;
    }
  }
  async updateCategoriaReceita(categoriaId: string, updatedData: any) {
    try {
      return await CategoriaReceita.findByIdAndUpdate(categoriaId, updatedData);
    } catch (error) {
      throw error;
    }
  }

  async deleteCategoriaReceita(categoriaReceitaId: string, receitaId: string) {
    try {
      // Encontre o usuário pelo ID
      const receita = await Receita.findById(receitaId);
      if (!receita) {
        throw new Error(`Não existe receita com esse id: ${receitaId}`);
      }
      receita.categoriaReceita = receita.categoriaReceita.filter(
        (categoria) => categoria.toString() !== categoriaReceitaId
      );

      await receita.save();

      // Exclua a receita do banco de dados
      const categoriaReceitaExcluida = await CategoriaReceita.findByIdAndRemove(
        categoriaReceitaId
      );
      if (!categoriaReceitaExcluida) {
        throw Error(`Não tem categoria com esse id: ${categoriaReceitaId}`);
      }

      return categoriaReceitaExcluida;
    } catch (error) {
      throw error;
    }
  }
  async getCategoriaReceitaById(categoriaReceitaId: string) {
    try {
      return await CategoriaReceita.findById(categoriaReceitaId);
    } catch (error) {}
  }
  async getAllCategoriaReceita() {
    try {
      return await CategoriaReceita.find();
    } catch (error) {
      throw error;
    }
  }
}
