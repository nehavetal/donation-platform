import NGO from "../models/NGO.js";

// CREATE NGO
export const createNGO = async (req, res) => {
  try {
    const { name, location, contact } = req.body;

    if (!name || !location || !contact) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingNGO = await NGO.findOne({ contact });

    if (existingNGO) {
      return res.status(400).json({
        message: "NGO already exists",
      });
    }

    const ngo = await NGO.create({
      name,
      location,
      contact,
      verified: false,
    });

    res.status(201).json({
      message: "NGO created successfully",
      ngo,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL NGOS
export const getNGOs = async (req, res) => {
  try {
    const ngos = await NGO.find().sort({ createdAt: -1 });

    res.json({
      count: ngos.length,
      ngos,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// VERIFY NGO (ADMIN ONLY)
export const verifyNGO = async (req, res) => {
  try {
    const ngo = await NGO.findById(req.params.id);

    if (!ngo) {
      return res.status(404).json({
        message: "NGO not found",
      });
    }

    if (ngo.verified) {
      return res.status(400).json({
        message: "NGO already verified",
      });
    }

    ngo.verified = true;
    await ngo.save();

    res.json({
      message: "NGO verified successfully",
      ngo,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};