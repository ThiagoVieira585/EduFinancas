import User from "../Model/userModel";
import { UserRepository } from "../Repository/userRepository";

export class UserService {
    private userRepository: UserRepository;
    

  // Construtor da classe, onde é criada a instância do TutorService
  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(data: any) {
    try {
      
      return await this.userRepository.createUser(data);
    } catch (error) {
      throw error;
    }
  }
  async getUserById(userId: string) {
    try {
      return await this.userRepository.getUserById(userId);
    } catch (error) {
      throw error;
    }
  }
  async updateUser(userId:string, updatedUserData: any) {
    try {
        return await this.userRepository.updateUser(userId, updatedUserData);
    } catch (error) {
        throw error;
    }
  }
  async deleteUser(userId: string){
    try {
        const user = await User.findById(userId);
      if (!user) {
        throw new Error('Usuário não encontrado');
      }
      return await this.userRepository.deleteUser(userId);
    }
    catch (error){
        throw error;
    }
    }
}
