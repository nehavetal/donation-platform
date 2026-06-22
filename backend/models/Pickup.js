import mongoose from "mongoose";

const pickupSchema = new mongoose.Schema(
  {
    donationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donation",
      required: true,
    },

    // ngoId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "NGO",
    //   required: true,
    // },

    assignedTo: {
      type: String, // driver / volunteer name (future)
      default: null,
    },

    pickupAddress: {
      type: String,
      required: true,
    },

    scheduledDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["requested", "assigned", "picked", "completed"],
      default: "requested",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Pickup", pickupSchema);