import Donation from "../models/Donation.js";

// CREATE DONATION
export const createDonation = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("USER:", req.user);

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        message: "User not authenticated",
      });
    }

    const { itemType, quantity, pickupAddress, scheduledDate } = req.body;

    if (!itemType || !quantity || !pickupAddress || !scheduledDate) {
      return res.status(400).json({
        message: "Required fields missing",
      });
    }

    const donation = await Donation.create({
      donorId: req.user.id,
      itemType,
      quantity: Number(quantity),
      pickupAddress,
      scheduledDate: new Date(scheduledDate),
      status: "pending",
    });

    return res.status(201).json({
      message: "Donation created successfully",
      donation,
    });

  } catch (err) {
    console.error("CREATE DONATION ERROR:", err);
    return res.status(500).json({ error: err.message });
  }
};

// GET USER DONATIONS
export const getUserDonations = async (req, res) => {
  try {
    const donations = await Donation.find({
      donorId: req.user.id,
    }).sort({ createdAt: -1 });

    res.json({
      count: donations.length,
      donations,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE STATUS (NGO / ADMIN)
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatus = [
      "pending",
      "accepted",
      "picked",
      "delivered",
      "cancelled",
    ];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        message: "Invalid status value",
      });
    }

    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({
        message: "Donation not found",
      });
    }

    // 🔥 UPDATE STATUS
    donation.status = status;

    // 🔥 STATUS HISTORY FIX
    donation.statusHistory.push({
      status,
      updatedAt: new Date(),
    });

    await donation.save();

    res.json({
      message: "Status updated successfully",
      donation,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find()
      .populate("donorId", "name email")
      .sort({ createdAt: -1 });

    res.json({
      count: donations.length,
      donations,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};