// import Receita from "../Model/receitaModel";
// import User from "../Model/userModel";

// export class ReceitaRepository {
//   async createReceita(userId: string, receitaData: any) {
//     try {
//       const user = await User.findById(userId);
//       if (!user) {
//         throw new Error(`Não tem usuário com esse id: ${userId}`);
//       }

//       const novaReceita = new Receita({
//         valor: receitaData.valor,
//         data: receitaData.data,
//         descrição: receitaData.descrição,
//         categoria: receitaData.categoria,
//         userId: user._id, // Associando a receita ao usuário
//       });

//       const receitaSalva = await novaReceita.save();

//       // Adicionando a nova receita ao array de receitas do usuário
//       user.receita.push(receitaSalva._id);
//       await user.save();

//       return receitaSalva;
//     } catch (error) {
//       throw error;
//     }
//   }
//   async getReceitaByIdWithUser(receitaId: string, userId: string){
//     try {
//       const receita = await Receita.findById(receitaId).populate('user');

//       // Verifica se a receita existe e pertence ao usuário
//       if (receita && receita.user?._id.toString() === userId) {
//         return receita;
//       } else {
//         return null;
//       }
//     } catch (error) {
//       throw error;
//     }
//   }
//   async updateReceita(receitaId: string, updatedData: any) {
//     try {
//       return await Receita.findByIdAndUpdate(receitaId, updatedData);
//     } catch (error) {
//       throw error;
//     }
//   }

//   async deleteReceita(receitaId: string, userId: string) {
//     try {
//       // Encontre o usuário pelo ID
//       const user = await User.findById(userId);
//       if (!user) {
//         throw new Error(`No user with id ${userId}`);
//       }

//       // Verifique se a receita existe no array de receitas do usuário
      
//       // Remova a receita do array de receitas do usuário
//       user.receita = user.receita.filter(
//         (receita) => receita.toString() !== receitaId
//       );
    
//       await user.save();

//       // Exclua a receita do banco de dados
//       const receitaExcluida = await Receita.findByIdAndRemove(receitaId);
//       if (!receitaExcluida) {
        
//         throw Error(`No receita with id ${receitaId}`);
//       }
      
//       return receitaExcluida;
      
//     } catch (error) {
     
//       throw error;
//     }
//   }
//   async getReceitaById(receitaId:string){
//     try {
//       return await Receita.findById(receitaId)
//     } catch (error) {
      
//     }
//   }
//   async getAllReceita(){
//     try {
//       return await Receita.find();
//     } catch (error) {
//       throw error;
//     }
//   }
// }
