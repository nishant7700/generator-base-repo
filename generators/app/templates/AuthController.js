import { Request, Response } from 'express';
import authService from '../services/AuthService';

// Add custom typings here if needed

class AuthController {
  // Register a new user
  async register(req: Request, res: Response): Promise<void> {
    try {
      const user = await authService.register(req.body);
      res.status(201).json({ success: true, data: user });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // Login user
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { accessToken, refreshToken } = await authService.login(req.body);
      res.status(200).json({ success: true, accessToken, refreshToken });
    } catch (error: any) {
      res.status(401).json({ success: false, message: error.message });
    }
  }

  // Refresh access token
  async refreshToken(req: Request, res: Response): Promise<void> {
    try {
      const { refreshToken } = req.body;
      const newAccessToken = await authService.refreshToken(refreshToken);
      res
        .status(200)
        .json({ success: true, accessToken: newAccessToken.accessToken });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // Forget password
  async forgetPassword(req: Request, res: Response): Promise<void> {
    try {
      const result = await authService.forgetPassword(req.body.email);
      res.status(200).json({ success: true, message: result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // Reset password
  async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      const result = await authService.resetPassword(req.body);
      res.status(200).json({ success: true, message: result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // Get logged-in user details
  async loggedInUser(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user?.id) {
        throw new Error('User not authenticated');
      }
      const user = await authService.getLoggedInUser(req.user.id);
      res.status(200).json({ success: true, data: user });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}

export default new AuthController();
