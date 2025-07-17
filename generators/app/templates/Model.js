import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from 'src/interfaces/IUser';

export interface IUserDoc extends IUser, Document {}

const userSchema: Schema = new Schema<IUserDoc>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    refreshToken: { type: String }, // Field to store refresh token
  },
  {
    timestamps: true,
  }
);

const UserModel =
  mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default UserModel;
