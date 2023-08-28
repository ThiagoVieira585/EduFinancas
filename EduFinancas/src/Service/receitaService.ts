// import { ReceitaRepository } from "./../Repository/receitaRepository";

// export class ReceitaService {
//   private receitaRepository: ReceitaRepository;

//   constructor() {
//     this.receitaRepository = new ReceitaRepository();
//   }
//   async getReceitaByIdWithUser(receitaId: string, userId: string){
//     return this.receitaRepository.getReceitaByIdWithUser(receitaId, userId);
//   }
//   async createReceita(userId: string, data: any) {
//     try {
//       return await this.receitaRepository.createReceita(userId, data);
//     } catch (error) {
//       throw error;
//     }
//   }
//   async updateReceita(receitaId: string, updatedData: any) {
//     try {
//       return await this.receitaRepository.updateReceita(receitaId, updatedData);
//     } catch (error) {
//       throw error;
//     }
//   }
//   async deleteReceita(receitaId: string, userId: string) {
//     try {
//       const deletedData = await this.receitaRepository.deleteReceita(
//         receitaId,
//         userId
//       );
//       return deletedData;
//     } catch (error) {
//       throw error;
//     }
//   }
//   async getReceitaById(receitaId: string) {
//     try {
//       return await this.receitaRepository.getReceitaById(receitaId);
//     } catch (error) {
//       throw error;
//     }
//   }
//   async getAllReceita() {
//     try {
//       return await this.receitaRepository.getAllReceita();
//     } catch (error) {
//       throw error;
//     }
//   }
// }
