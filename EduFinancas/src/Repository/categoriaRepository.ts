import CategoryModel from "../Model/categoriaModel";
import User from "../Model/userModel";

export class CategoryRepository {
  async createCategoria(userId: string, categoryData: any) {
    try {
      
      const user = await User.findById(userId);
      if (!user) {
        throw new Error(`Não tem usuário com esse id: ${userId}`);
      }
      
      console.log("2")
      const novaCategoria = new CategoryModel({
        nome: categoryData.nome,
        userId: user._id, // Associando a receita ao usuário
      });
      const categoriaSalva = await novaCategoria.save();
      // Adicionando a nova receita ao array de receitas do usuário
      user.categoria.push(categoriaSalva._id);
      await user.save();
      return categoriaSalva;
    } catch (error) {
      throw error;
    }
  }
}

export default new CategoryRepository();
