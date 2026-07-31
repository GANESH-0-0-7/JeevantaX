import express from "express";
import multer from "multer";
import { uploadToPinata, getMyVaultFiles } from "../controllers/vault.controller.js";
import protectRoute from "../middlewares/protectRoute.js";

const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.post("/upload", protectRoute ,upload.single("file"), uploadToPinata);
router.get("/my-files",protectRoute, getMyVaultFiles);

export default router;
