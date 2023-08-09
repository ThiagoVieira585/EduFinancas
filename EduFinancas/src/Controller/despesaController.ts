import { Response, Request } from 'express';
import Despesa from '../Model/despesaModel';
import { UserController } from '../Controller/userController';
import User from '../Model/userModel';
import { DespesaService } from '../Service/despesaService'; }

export class DespesaController {
    private despesaService = new DespesaService();
    private userController = new UserController();

    constructor() {
        this.despesaService = new DespesaService();
        this.userController = new UserController();
      }

      async createDespesa(req: Request, res: Response) {
        const { userId } = req.params;
        const despesaBody = req.body;
      
        try {
          const user = await this.userController.getUserById(userId);
          if (!user) {
            return res.status(404).json({
              error: true,
              code: 404,
              message: `No tutor with id ${userId}`,
            });
          }
          const newDespesa = await this.despesaService.createDespesa(userId, despesaBody); // Aqui é onde ocorre o erro
      
          return res.status(201).json({ newDespesa, userId: user._id, message: 'Receita criada!' });
      
        } catch (error) {
          return res.status(400).json({
            error,
            message: "Bad request error",
          });
        }
      }
    async updateDespesa (req: Request, res: Response) {
        const { despesaId, userId } = req.params;
        const updatedDespesaData = req.body;

        try {
            const updatedUserData = await this.despesaService(despesaId, userId, updatedDespesaData)
           
            if (!updatedUserData) {
                return res.status(404).json({ message: 'Id não encontrado' });
            }

            return res.status(200).json({ updatedDespesaData, message: 'Despesa atualizada' });
        } catch (error) {
            return res.status(400).json({ error, message: 'Request error' });
        }
        

    }
    async deleteDespesa (req: Request, res: Response) {
        const { despesaId, userId } = req.params;
        const deletedDespesaData = req.body;

        try {
            const user = await this.userController.getTutorById(userId);
            //const tutor = await Tutors.findById(tutorId);
          
            if (!user) {
              return res.status(404).json({
                error: true,
                code: 404,
                message: `No tutor with id ${userId}`,
              });
            }
            
            const index = user.despesa.findIndex((despesa: any) => despesa.id === despesaId);
            
            const del = user.despesa.splice(index, 1);

            const deleteDespesa = await this.despesaService.deletePet(despesaId);

            if (!deleteDespesa) {
                return res.status(404).json({ message: 'Despesa não encontrada' });
            }

            return res.status(204).json({ message: 'Despesa apagada' });
        }
        catch (error){
            return res.status(400).json({ error, message: 'Request error' });
        }

    }


}