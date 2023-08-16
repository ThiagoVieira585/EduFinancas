import { CategoriaDespesaRepository } from "../Repository/categoriaDespesaRepository";

export class CategoriaDespesaService {
  private categoriaDespesaRepository: CategoriaDespesaRepository;

  constructor() {
    this.categoriaDespesaRepository = new CategoriaDespesaRepository();
  }

  async createCategoriaDespesa(despesaId: string, data: any) {
    try {
      return await this.categoriaDespesaRepository.createCategoriaDespesa(despesaId, data);
    } catch (error) {
      throw error;
    }
  }
  async updateCategoriaDespesa(categoriaDespesaId: string, updatedData: any) {
    try {
      return await this.categoriaDespesaRepository.updateCategoriaDespesa(categoriaDespesaId, updatedData);
    } catch (error) {
      throw error;
    }
  }
  async deleteCategoriaDespesa(categoriaDespesaId: string, despesaId: string) {
    try {
      const deletedData = await this.categoriaDespesaRepository.deleteCategoriaDespesa(
        categoriaDespesaId,
        despesaId
      );
      return deletedData;
    } catch (error) {
      throw error;
    }
  }
  async getCategoriaDespesaById(categoriaDespesaId: string) {
    try {
      return await this.categoriaDespesaRepository.getCategoriaDespesaById(categoriaDespesaId);
    } catch (error) {
      throw error;
    }
  }
  async getAllCategoriaDespesa() {
    try {
      return await this.categoriaDespesaRepository.getAllCategoriaDespesa();
    } catch (error) {
      throw error;
    }
  }
}
