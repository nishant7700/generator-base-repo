import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { userService } from '../services/UserService'; // Adjust path as needed

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    [key: string]: any;
  };
}

interface JWTPayload {
  id: string;
  [key: string]: any;
}

class AuthUser {
  static authenticate = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Authentication Required' });
        return;
      }

      const token = authHeader.substring(7); // Remove 'Bearer ' prefix
      console.log('token', token);

      if (!token) {
        res.status(401).json({ error: 'Invalid token format' });
        return;
      }

      // Verify JWT token
      const decoded = jwt.verify(token, process.env.jwtSecret!) as JWTPayload;

      if (!decoded.id) {
        res.status(401).json({ error: 'Invalid token payload' });
        return;
      }

      // Check if user exists
      const userExists = await userService.getById(decoded.id);
      if (!userExists) {
        res.status(401).json({ error: 'User not found' });
        return;
      }
      // Add user info to request object
      req.user = { id: decoded.id };

      next();
    } catch (error) {
      console.log('Error', error);

      if (error instanceof jwt.JsonWebTokenError) {
        res.status(401).json({ error: 'Invalid token' });
        return;
      }

      if (error instanceof jwt.TokenExpiredError) {
        res.status(401).json({ error: 'Token expired' });
        return;
      }

      console.error('Authentication error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}

export default AuthUser;
