import Donation from "../models/Donation.js";
import NGO from "../models/NGO.js";

export const getAdminStats = async (req, res) => {
  try {
    const totalDonations = await Donation.countDocuments();

    const verifiedNGOs = await NGO.countDocuments({
      verified: true,
    });

    res.json({
      totalDonations,
      verifiedNGOs,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};