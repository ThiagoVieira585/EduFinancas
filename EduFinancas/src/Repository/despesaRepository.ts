// import Despesa from "../Model/despesaModel";
// import User from "../Model/userModel";

// export class DespesaRepository {
//   async createDespesa(userId: string, despesaData: any) {
//     try {
//       const user = await User.findById(userId);
//       if (!user) {
//         throw new Error(`Não tem usuário com esse id: ${userId}`);
//       }

//       const novaDespesa = new Despesa({
//         valor: despesaData.valor,
//         data: despesaData.data,
//         descrição: despesaData.descrição,
//         categoria: despesaData.categoria,
//         userId: user._id, // Associando a despesa ao usuário
//       });

//       const despesaSalva = await novaDespesa.save();

//       // Adicionando a nova despesa ao array de despesas do usuário
//       user.despesa.push(despesaSalva._id);
//       await user.save();

//       return despesaSalva;
//     } catch (error) {
//       throw error;
//     }
//   }
//   async updateDespesa(despesaId: string, updatedData: any) {
//     try {
//       return await Despesa.findByIdAndUpdate(despesaId, updatedData);
//     } catch (error) {
//       throw error;
//     }
//   }

//   async deleteDespesa(despesaId: string, userId: string) {
//     try {
//       // Encontre o usuário pelo ID
//       const user = await User.findById(userId);
//       if (!user) {
//         throw new Error(`No user with id ${userId}`);
//       }

//       // Verifique se a despesa existe no array de despesas do usuário

//       // Remova a despesa do array de despesas do usuário
//       user.despesa = user.despesa.filter(
//         (despesa) => despesa.toString() !== despesaId
//       );

//       await user.save();

//       // Exclua a despesa do banco de dados
//       const despesaExcluida = await Despesa.findByIdAndRemove(despesaId);
//       if (!despesaExcluida) {
//         throw Error(`No despesa with id ${despesaId}`);
//       }

//       return despesaExcluida;
//     } catch (error) {
//       throw error;
//     }
//   }
//   async getDespesaById(despesaId: string) {
//     try {
//       return await Despesa.findById(despesaId);
//     } catch (error) {}
//   }
//   async getAllDespesa() {
//     try {
//       return await Despesa.find();
//     } catch (error) {
//       throw error;
//     }
//   }
// }
