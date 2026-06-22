import mongoose from "mongoose";
import Pickup from "../models/Pickup.js";
import Donation from "../models/Donation.js";

/* ================= GET BY ID ================= */
export const getPickupById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid pickup ID" });
    }

    const pickup = await Pickup.findById(id).populate("donationId");

    if (!pickup) {
      return res.status(404).json({ message: "Pickup not found" });
    }

    res.json({ pickup });

  } catch (err) {
    console.log("GET PICKUP ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

/* ================= CREATE PICKUP ================= */
export const createPickup = async (req, res) => {
  try {
    const { donationId } = req.body;

    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const ngoId = req.user.id;

    const donation = await Donation.findById(donationId);

    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    const pickup = await Pickup.create({
      donationId,
      ngoId,
      pickupAddress: donation.pickupAddress,
      scheduledDate: donation.scheduledDate,
    });

    donation.status = "accepted";
    await donation.save();

    res.status(201).json({ message: "Pickup created", pickup });

  } catch (err) {
    console.log("CREATE PICKUP ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

/* ================= UPDATE STATUS ================= */
export const updatePickupStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid pickup ID" });
    }

    if (!status) {
      return res.status(400).json({ message: "Status missing" });
    }

    const pickup = await Pickup.findById(id);

    if (!pickup) {
      return res.status(404).json({ message: "Pickup not found" });
    }

    pickup.status = status;
    await pickup.save();

    const donation = await Donation.findById(pickup.donationId);

    if (donation) {
      donation.status = status;

      if (!donation.statusHistory) {
        donation.statusHistory = [];
      }

      donation.statusHistory.push({
        status,
        updatedAt: new Date(),
      });

      await donation.save();
    }

    res.json({ message: "Status updated successfully", pickup });

  } catch (err) {
    console.log("UPDATE STATUS ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

/* ================= NGO PICKUPS ================= */
export const getNGOPickups = async (req, res) => {
  try {
    const pickups = await Pickup.find({ ngoId: req.params.ngoId })
      .populate("donationId")
      .sort({ createdAt: -1 });

    res.json({ pickups });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= ALL PICKUPS ================= */
export const getAllPickups = async (req, res) => {
  try {
    const pickups = await Pickup.find()
      .populate("donationId")
      .sort({ createdAt: -1 });

    res.json({ pickups });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};