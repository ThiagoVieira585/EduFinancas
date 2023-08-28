import { Request, Response } from "express";
import User from "../Model/userModel";
import { UserService } from "../Service/userService";
import { JwtPayload } from "jsonwebtoken";
interface DecodedToken extends JwtPayload {
  id: string;
  email: string;
}
// Estendendo a interface de definição de tipo do Express Request
export class UserController {

    private userService: UserService;
   // Construtor da classe, onde é criada a instância do TutorService
  constructor() {
    this.userService = new UserService();
  }

  async createUser(req: Request, res: Response) {
    const userBody = req.body;
    try {
      const newUser = await this.userService.createUser(userBody);
        return res.status(201).json({
        newUser,
        message: "User criado"});
    } catch (error) {
     
      return res.status(400).json({
        error,
        message: "Bad request error",
      });
    }
  }
  async updateUser(req: Request, res: Response) {
    const { userId } = req.params;
    const updatedUserData = req.body;

    try {
      const updateUser = await this.userService.updateUser(
        userId,
        updatedUserData
      );

      if (!updateUser) {
        return res.status(404).json({ message: "User not found" });
      }

      return res
        .status(200)
        .json({
          updatedUserData,
          message: "Tutor updated successfullyUsuário atualizado",
        });
    } catch (error) {
      return res.status(400).json({ error, message: "Request error" });
    }
  }
  async getUserById(req: Request, res: Response) {
    const { userId } = req.params;

    try {
      const user = await this.userService.getUserById(userId);
      if (!user) {
        return res.status(404).json({ message: "User não encontrado" });
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ error, message: "Request error" });
    }
  }
  async deleteUser(req: Request, res: Response){
    const userId = req.user?.id;

    try {
      if (!userId) {
        return res.status(401).json({ message: "Usuário não autenticado" });
      }
        const deletedUser = await this.userService.deleteUser(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
          }
    
          return res.status(204).json({ message: 'Usuário deletado' });
    } catch (error) {
        return res.status(400).json({ message: 'Request error' })
    }
  }
}
