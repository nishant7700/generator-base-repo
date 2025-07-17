import { IUserDoc } from "../models/UserModel";
import { BaseService } from "./BaseService";
import { userRepository } from "../repositories/UserRepository";

class UserService extends BaseService<IUserDoc> {
  constructor() {
    super(userRepository);
  }
}

export const userService = new UserService();
