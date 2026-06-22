import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

import {
  createPickup,
  getNGOPickups,
  updatePickupStatus,
  getAllPickups
} from "../controllers/pickupController.js";

const router = express.Router();

// NGO creates pickup
router.post("/", authMiddleware, createPickup);

// NGO pickups
router.get("/ngo/:ngoId", authMiddleware, getNGOPickups);

// Admin all pickups
router.get(
  "/admin/all",
  authMiddleware,
  roleMiddleware(["admin"]),
  getAllPickups
);

// update pickup status
router.patch("/:id", authMiddleware, updatePickupStatus);

export default router;