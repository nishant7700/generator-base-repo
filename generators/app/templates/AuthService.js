import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/UserModel'; // Assuming you have a User model

class AuthService {
  // Register a new user
  async register(userData: {
    name: string;
    email: string;
    password: string;
    phone: string;
  }) {
    const { email, password, name, phone } = userData;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      email,
      password: hashedPassword,
      name,
      phone,
    });

    return newUser;
  }

  // Login user
  async login(credentials: { email: string; password: string }) {
    const { email, password } = credentials;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    // Generate JWT token and refresh token
    const accessToken = jwt.sign({ id: user.id }, process.env.jwtSecret!, {
      expiresIn: '1h',
    });
    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.refreshTokenSecret!,
      {
        expiresIn: '7d',
      }
    );

    // Save refresh token in the database
    user.refreshToken = refreshToken;
    await user.save();

    return { accessToken, refreshToken };
  }

  // Refresh access token
  async refreshToken(refreshToken: string) {
    try {
      const decoded = jwt.verify(refreshToken, process.env.refreshTokenSecret!);
      if (typeof decoded === 'object' && 'id' in decoded) {
        const user = await User.findById(decoded.id);
        if (!user || user.refreshToken !== refreshToken) {
          throw new Error('Invalid refresh token');
        }

        // Generate new access token
        const accessToken = jwt.sign({ id: user.id }, process.env.jwtSecret!, {
          expiresIn: '1h',
        });

        return { accessToken };
      } else {
        throw new Error('Invalid refresh token');
      }
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }

  // Forget password
  async forgetPassword(email: string) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    // Generate a reset token
    const resetToken = jwt.sign({ id: user.id }, process.env.jwtSecret!, {
      expiresIn: '15m',
    });

    // Send reset token via email (implement email sending logic)
    // Example: await emailService.sendResetPasswordEmail(email, resetToken);

    return 'Reset password email sent';
  }

  // Reset password
  async resetPassword(data: { resetToken: string; newPassword: string }) {
    const { resetToken, newPassword } = data;

    // Verify reset token
    const decoded = jwt.verify(resetToken, process.env.jwtSecret!);
    if (typeof decoded === 'object' && 'id' in decoded) {
      const user = await User.findById(decoded.id);
      if (!user) {
        throw new Error('Invalid token');
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update user's password
      user.password = hashedPassword;
      await user.save();

      return 'Password reset successfully';
    } else {
      throw new Error('Invalid token');
    }
  }

  // Get logged-in user details
  async getLoggedInUser(userId: string) {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}

export default new AuthService();
