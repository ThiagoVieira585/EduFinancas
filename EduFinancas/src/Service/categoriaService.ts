import { CategoryRepository } from "../Repository/categoriaRepository";

export class CategoryService {
  private categoryRepository: CategoryRepository;

  constructor() {
    this.categoryRepository = new CategoryRepository();
  }

  async createCategory(userId: string, data: any) {
    try {
      return await this.categoryRepository.createCategoria(userId, data);
    } catch (error) {
      throw error;
    }
  }
  async updateCategory(id: string, categoryData: any) {
    try {
      return await this.categoryRepository.updateCategory(id, categoryData);
    } catch (error) {
      throw error;
    }
  }
  async getAllCategoria() {
    try {
      return await this.categoryRepository.getAllCategoria();
    } catch (error) {
      throw error;
    }
  }
  async findById(id:string){
    try {
      return await this.categoryRepository.findById(id);
    } catch (error) {
      throw error;
    }
  }
  async deleteCategoria(categoriaId: string, userId: string){
    try {
      return await this.categoryRepository.deleteCategoria(categoriaId,userId);      
    } catch (error) {
      throw error;
    }
  }
}

export default new CategoryService();
