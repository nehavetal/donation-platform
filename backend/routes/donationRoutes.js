// import express from "express";
// import authMiddleware from "../middleware/authMiddleware.js";
// import {
//   createDonation,
//   getUserDonations,
//   updateStatus,
// } from "../controllers/donationController.js";

// const router = express.Router();

// // CREATE DONATION
// router.post("/", authMiddleware, createDonation);

// // GET USER DONATIONS
// router.get("/user", authMiddleware, getUserDonations);

// // UPDATE STATUS (ADMIN / NGO ONLY)
// router.patch("/:id/status", authMiddleware, updateStatus);
// router.get(
//   "/all",
//   authMiddleware,
//   roleMiddleware(["admin"]),
//   async (req, res) => {
//     try {
//       const donations = await Donation.find().sort({ createdAt: -1 });
//       res.json(donations);
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   }
// );
// export default router;

import express from "express";
import roleMiddleware from "../middleware/roleMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createDonation,
  getAllDonations,
  getUserDonations,
  updateStatus,
} from "../controllers/donationController.js";

const router = express.Router();

router.post("/", authMiddleware, createDonation);

// user donations
router.get("/user", authMiddleware, getUserDonations);

// ⭐ ADMIN - ALL DONATIONS (ADD THIS)
router.get("/", authMiddleware, async (req, res) => {
  const Donation = (await import("../models/Donation.js")).default;

  const donations = await Donation.find().sort({ createdAt: -1 });

  res.json(donations);
});

router.get(
  "/all",
  authMiddleware,
  roleMiddleware(["admin"]),
  getAllDonations
);

router.patch("/:id/status", authMiddleware, updateStatus);

export default router;