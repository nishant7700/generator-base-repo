import express from 'express';

import UserController from '../controllers/UserController';
import Validation from '../utils/Validation';
import {
  userParamsSchema,
  createUserSchema,
  updateUserSchema,
} from '../validations/UserSchema';

class UserRoutes {
  public router = express.Router();

  constructor() {
    this.setupRoutes();
  }

  private setupRoutes() {
    this.router.get('/', UserController.getAllUsers);
    this.router.get(
      '/:id',
      Validation.validateParams(userParamsSchema),
      UserController.getUserById
    );
    this.router.post(
      '/',
      Validation.validate(createUserSchema),
      UserController.createUser
    );
    this.router.put(
      '/:id',
      Validation.validateParams(userParamsSchema),
      Validation.validate(updateUserSchema),
      UserController.updateUser
    );
    this.router.delete('/:id', UserController.deleteUser);
  }
}

export default new UserRoutes().router;
