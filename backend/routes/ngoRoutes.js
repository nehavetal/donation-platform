import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import {
  createNGO,
  getNGOs,
  verifyNGO,
} from "../controllers/ngoController.js";

const router = express.Router();

router.get("/", getNGOs);

router.post("/", authMiddleware, createNGO);

router.patch(
  "/:id/verify",
  authMiddleware,
  roleMiddleware(["admin"]),
  verifyNGO
);

export default router;