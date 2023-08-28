import { CategoryRepository } from '../Repository/categoriaRepository';
import UsuarioModel from '../Model/userModel';



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
}

export default new CategoryService();
