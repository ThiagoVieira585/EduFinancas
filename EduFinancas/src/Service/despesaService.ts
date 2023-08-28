// import { DespesaRepository } from './../Repository/despesaRepository';

// export class DespesaService {
//     private despesaRepository: DespesaRepository;

//     constructor() {
//         this.despesaRepository = new DespesaRepository();
//       }

//     async createDespesa(userId:string, data:any){
//         try {
//             return await this.despesaRepository.createDespesa(userId ,data)
//         } catch (error) {
//             throw error;
//         }
//     }
//     async updateDespesa(despesaId: string, updatedData:any ){
//         try {
//             return await this.despesaRepository.updateDespesa(despesaId, updatedData)
//         } catch (error) {
//             throw error;
//         }
//     }
//     async deleteDespesa(despesaId: string, userId: string){
//         try {
//             const deletedData = await this.despesaRepository.deleteDespesa(despesaId,userId)
//             return deletedData;
//         } catch (error) {
//             throw error;
//         }
//     }
//     async getDespesaById(despesaId: string){
//         try {
//             return await this.despesaRepository.getDespesaById(despesaId);
//         } catch (error) {
//             throw error;    
//         }
//     }
//     async getAllDespesa(){
//         try {
//             return await this.despesaRepository.getAllDespesa();
//         } catch (error) {
//             throw error;
//         }
//     }
// }