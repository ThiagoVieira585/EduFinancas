import categoriaModel from "../Model/categoriaModel";
import CategoryModel from "../Model/categoriaModel";
import User from "../Model/userModel";

export class CategoryRepository {
  async createCategoria(userId: string, categoryData: any) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error(`Não tem usuário com esse id: ${userId}`);
      }

      console.log("2");
      const novaCategoria = new CategoryModel({
        nome: categoryData.nome,
        userId: user._id, // Associando a receita ao usuário
      });
      const categoriaSalva = await novaCategoria.save();
      // Adicionando a nova receita ao array de receitas do usuário
      user.categorias.push(categoriaSalva._id);
      await user.save();
      return categoriaSalva;
    } catch (error) {
      throw error;
    }
  }
  async updateCategory(id: string, categoryData: any) {
    try {
      return await CategoryModel.findByIdAndUpdate(id, categoryData);
    } catch (error) {
      throw error;
    }
  }
  async getAllCategoria() {
    return CategoryModel.find();
  }
  async findById(id: string) {
    try {
      return await CategoryModel.findById(id);
    } catch (error) {
      throw error;
    }
  }
  async deleteCategoria(categoriaId: string, userId: string) {
    try {
      console.log(userId, "id do usuario");
      console.log(categoriaId, "id da categoria")
      const user = await User.findById(userId);
      
      if (!user) {
        throw new Error(`Usuário não encontrado: ${userId}`);
      }

      // Remova a categoria do array de categorias do usuário
      user.categorias = user.categorias.filter(
        (categoria) => categoria.toString() !== categoriaId
      );
      await user.save();

      // Encontre e exclua a categoria
      const categoriaExcluida = await CategoryModel.findByIdAndRemove(categoriaId);
      if (!categoriaExcluida) {
        throw new Error(`Não existe categoria com esse ID: ${categoriaId}`);
      }

      return categoriaExcluida;
    } catch (error) {
      throw error;
    }
  }
}

export default new CategoryRepository();
