import { BaseRepository } from "./BaseRepository";
import UserModel, { IUserDoc } from "../models/UserModel";
import { connectDB } from "../config/db";

export class UserRepository extends BaseRepository<IUserDoc> {
  constructor() {
    connectDB();
    super(UserModel);
  }
}

export const userRepository = new UserRepository();
