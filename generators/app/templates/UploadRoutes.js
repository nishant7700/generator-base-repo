import express, { Request, Response } from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../uploads")); // Save files in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

// Multer instance
const upload = multer({ storage });

// Route for single image upload
router.post(
  "/",
  upload.single("image"),
  (req: Request, res: Response): void => {
    try {
      if (!req.file) {
        res.status(400).json({ success: false, message: "No file uploaded" });

        return;
      }
      // console.log(req.file);

      res.status(200).json({
        success: true,
        filePath: `/uploads/${(req.file as Express.Multer.File).filename}`,
      });
      // console.log((req.file as Express.Multer.File).path);
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// Route for multiple gallery uploads
router.post(
  "/gallery",
  upload.array("images", 10),
  (req: Request, res: Response): void => {
    try {
      if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
        res.status(400).json({ success: false, message: "No files uploaded" });
        return;
      }
      const filePaths = (req.files as Express.Multer.File[]).map(
        (file) => file.path
      );
      res.status(200).json({ success: true, filePaths });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

export default router;
