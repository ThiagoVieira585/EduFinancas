import { DespesaRepository } from './../Repository/despesaRepository';

export class DespesaService {
    private despesaRepository: DespesaRepository;

    constructor() {
        this.despesaRepository = new DespesaRepository();
      }

    async createDespesa(userId:string, data:any){
        try {
            return await this.despesaRepository.createDespesa(userId ,data)
        } catch (error) {
            throw error;
        }
    }
    async updateDespesa(despesaId: string,userId: string, updatedData:any ){
        try {
            return await this.despesaRepository.updateDespesa(userId, updatedData)
        } catch (error) {
            throw error;
        }
    }
    async deleteDespesa(despesaId: string, userId: string, deletedDespesaData:any ){
        try {
            return await this.despesaRepository.deleteDespesa(despesaId,userId, deletedDespesaData)
        } catch (error) {
            throw error;
        }
    }
}