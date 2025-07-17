import express from 'express';
import AuthController from '../controllers/AuthController';
import Validation from '../utils/Validation';
import {
  loginSchema,
  registerSchema,
  refreshTokenSchema,
  forgetPasswordSchema,
  resetPasswordSchema,
} from '../validations/AuthSchema'; // Assuming you have validation schemas for auth

class AuthRoutes {
  public router = express.Router();

  constructor() {
    this.setupRoutes();
  }

  private setupRoutes() {
    // Register a new user
    this.router.post(
      '/register',
      Validation.validate(registerSchema),
      AuthController.register
    );

    // Login user
    this.router.post(
      '/login',
      Validation.validate(loginSchema),
      AuthController.login
    );

    // Refresh access token
    this.router.post(
      '/refresh-token',
      Validation.validate(refreshTokenSchema),
      AuthController.refreshToken
    );

    // Forget password
    this.router.post(
      '/forget-password',
      Validation.validate(forgetPasswordSchema),
      AuthController.forgetPassword
    );

    // Reset password
    this.router.post(
      '/reset-password',
      Validation.validate(resetPasswordSchema),
      AuthController.resetPassword
    );

    // Get logged-in user details (requires authentication middleware)
    this.router.get('/me', AuthController.loggedInUser);
  }
}

export default new AuthRoutes().router;
