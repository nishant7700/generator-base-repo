import { userService } from "../services/UserService";
import BaseController from "./BaseController";

class UserController extends BaseController {
  constructor() {
    super();
  }
}

const userController = new UserController();

export default {
  createUser: [userController.create(userService)],
  getAllUsers: [userController.getAll(userService)],
  getUserById: [userController.getById(userService)],
  updateUser: [userController.update(userService)],
  deleteUser: [userController.delete(userService)]
};
