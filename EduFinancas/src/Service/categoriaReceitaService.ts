import { CategoriaReceitaRepository } from "../Repository/categoriaReceitaRepository";

export class CategoriaReceitaService {
  private categoriaReceitaRepository: CategoriaReceitaRepository;

  constructor() {
    this.categoriaReceitaRepository = new CategoriaReceitaRepository();
  }

  async createCategoriaReceita(receitaId: string, data: any) {
    try {
      return await this.categoriaReceitaRepository.createCategoriaReceita(receitaId, data);
    } catch (error) {
      throw error;
    }
  }
  async updateCategoriaReceita(categoriaReceitaId: string, updatedData: any) {
    try {
      return await this.categoriaReceitaRepository.updateCategoriaReceita(categoriaReceitaId, updatedData);
    } catch (error) {
      throw error;
    }
  }
  async deleteCategoriaReceita(categoriaReceitaId: string, receitaId: string) {
    try {
      const deletedData = await this.categoriaReceitaRepository.deleteCategoriaReceita(
        categoriaReceitaId,
        receitaId
      );
      return deletedData;
    } catch (error) {
      throw error;
    }
  }
  async getCategoriaReceitaById(categoriaReceitaId: string) {
    try {
      return await this.categoriaReceitaRepository.getCategoriaReceitaById(categoriaReceitaId);
    } catch (error) {
      throw error;
    }
  }
  async getAllCategoriaReceita() {
    try {
      return await this.categoriaReceitaRepository.getAllCategoriaReceita();
    } catch (error) {
      throw error;
    }
  }
}
