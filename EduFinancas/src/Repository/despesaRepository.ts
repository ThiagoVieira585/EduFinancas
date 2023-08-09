import Despesa from "../Model/despesaModel";
import User from "../Model/userModel"

export class DespesaRepository{
    
    async createDespesa(userId: string, despesaData: any) {
        try {
          const user = await User.findById(userId);
          if (!user) {
            throw new Error(`Não tem usuário com esse id: ${userId}`);
          }
    
          const novaDespesa = new Despesa({
            valor: despesaData.valor,
            data: despesaData.data,
            descrição: despesaData.descrição,
            categoria: despesaData.categoria,
            userId: user._id, // Associando a despesa ao usuário
          });
    
          const despesaSalva = await novaDespesa.save();
    
          // Adicionando a nova despesa ao array de despesas do usuário
          user.despesa.push(despesaSalva._id);
          await user.save();
    
          return despesaSalva;
        } catch (error) {
          throw error;
        }
      }
      async deleteDepesa(despesaId:string, userId:string, deletedDespesaData: any){
        try {
          User.despesa = user.despesa
        } catch (error) {
          throw error;
        }

      }


}