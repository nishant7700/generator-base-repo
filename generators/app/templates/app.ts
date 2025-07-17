import cors from "cors";
import express from "express";
import morgan from "morgan";
import { ROUTES } from "./constants";
import errorHandler from "./middlewares/errorHandler";
// import AuthRoutes from './routes/AuthRoutes';
import dotenv from "./utils/EnvSetup";
import { connectDB } from "./config/db";

import UserRoutes from "./routes/UserRoutes";

import AuthRoutes from "./routes/AuthRoutes";
import UploadRoutes from "./routes/UploadRoutes";
import path from "path";
dotenv.config();
class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
    this.errorHandling();
    connectDB();
  }

  private middleware(): void {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(morgan("dev"));
  }

  private routes(): void {
    this.app.use(ROUTES.AUTH, AuthRoutes);
    this.app.use(ROUTES.USER, UserRoutes);
    this.app.use(ROUTES.UPLOAD, UploadRoutes);
    const _dirname = path.resolve();
    this.app.use("/uploads", express.static(path.join(_dirname, "/uploads")));
  }

  private errorHandling(): void {
    this.app.use(errorHandler);
  }
}

export default new App().app;
