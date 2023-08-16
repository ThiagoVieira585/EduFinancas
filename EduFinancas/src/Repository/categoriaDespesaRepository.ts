import Despesa from "../Model/despesaModel";
import CategoriaDespesa from "../Model/categoriaDespesa";

export class CategoriaDespesaRepository {
  async createCategoriaDespesa(despesaId: string, categoriaData: any) {
    try {
      const despesa = await Despesa.findById(despesaId);
      if (!despesa) {
        throw new Error(`Não tem usuário com esse id: ${despesaId}`);
      }

      const novaCategoria = new CategoriaDespesa({
        nome: categoriaData.nome,
        despesaId: despesa._id, // Associando a categoria a despesa
      });

      const categoriaSalva = await novaCategoria.save();

      // Adicionando a nova despesa ao array de despesas do usuário
      despesa.categoriaDespesa.push(categoriaSalva._id);
      await despesa.save();

      return categoriaSalva;
    } catch (error) {
      throw error;
    }
  }
  async updateCategoriaDespesa(categoriaId: string, updatedData: any) {
    try {
      return await CategoriaDespesa.findByIdAndUpdate(categoriaId, updatedData);
    } catch (error) {
      throw error;
    }
  }

  async deleteCategoriaDespesa(categoriaDespesaId: string, despesaId: string) {
    try {
      // Encontre o usuário pelo ID
      const despesa = await Despesa.findById(despesaId);
      if (!despesa) {
        throw new Error(`Não existe despesa com esse id: ${despesaId}`);
      }
      despesa.categoriaDespesa = despesa.categoriaDespesa.filter(
        (categoria) => categoria.toString() !== categoriaDespesaId
      );

      await despesa.save();

      // Exclua a despesa do banco de dados
      const categoriaDespesaExcluida = await CategoriaDespesa.findByIdAndRemove(
        categoriaDespesaId
      );
      if (!categoriaDespesaExcluida) {
        throw Error(`Não tem categoria com esse id: ${categoriaDespesaId}`);
      }

      return categoriaDespesaExcluida;
    } catch (error) {
      throw error;
    }
  }
  async getCategoriaDespesaById(categoriaDespesaId: string) {
    try {
      return await CategoriaDespesa.findById(categoriaDespesaId);
    } catch (error) {}
  }
  async getAllCategoriaDespesa() {
    try {
      return await CategoriaDespesa.find();
    } catch (error) {
      throw error;
    }
  }
}
