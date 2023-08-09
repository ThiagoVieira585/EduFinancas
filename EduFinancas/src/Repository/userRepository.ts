import User from "../Model/userModel";

export class UserRepository {
  async createUser(data: any) {
    try {
      return await User.create(data);
      
    } catch (error) {
      throw error;
    }
  }

  async getUserById(userId: string) {
    try {
      return await User.findById(userId);
    } catch (error) {
      throw error;
    }
  }

  async updateUser(userId: string, updatedUserData: any) {
    try {
      return await User.findByIdAndUpdate(userId, updatedUserData);
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(userId: string) {
    try {
      return await User.findByIdAndDelete(userId);
    } catch (error) {
      throw error;
    }
  }
}
