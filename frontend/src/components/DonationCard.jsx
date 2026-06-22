import api from "../services/api";

export default function DonationCard({ donation }) {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleCreatePickup = async (donationId) => {
    try {
      const res = await api.post("/pickups", {
        donationId,
      });

      console.log("RESPONSE:", res.data);
      alert("Pickup Created 🚚");
    } catch (err) {
      console.log("ERROR:", err.response?.data || err.message);
      alert("Pickup failed");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "#f59e0b";
      case "accepted":
        return "#22c55e";
      case "rejected":
        return "#ef4444";
      default:
        return "#64748b";
    }
  };

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h3 style={styles.title}>📦 {donation.itemType}</h3>

        <span
          style={{
            ...styles.badge,
            background: getStatusColor(donation.status),
          }}
        >
          {donation.status || "pending"}
        </span>
      </div>

      <div style={styles.row}>📊 Qty: {donation.quantity}</div>
      <div style={styles.row}>📍 {donation.pickupAddress}</div>
      <div style={styles.row}>
        📅 {donation.scheduledDate?.slice(0, 10)}
      </div>

      {user?.role === "admin" && (
        <button
          onClick={() => handleCreatePickup(donation._id)}
          disabled={donation.status === "accepted"}
          style={{
            ...styles.button,
            opacity: donation.status === "accepted" ? 0.6 : 1,
            cursor:
              donation.status === "accepted" ? "not-allowed" : "pointer",
          }}
        >
          🚚{" "}
          {donation.status === "accepted"
            ? "Already Picked"
            : "Create Pickup"}
        </button>
      )}
    </div>
  );
}

const styles = {
  card: {
    background: "rgba(255,255,255,0.9)",
    borderRadius: "16px",
    padding: "18px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
    border: "1px solid #e5e7eb",
    marginBottom: "16px",
    transition: "all 0.25s ease",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },

  title: {
    margin: 0,
    color: "#0f172a",
    fontSize: "16px",
    fontWeight: "800",
    letterSpacing: "0.3px",
  },

  row: {
    fontSize: "14px",
    color: "#475569",
    margin: "6px 0",
  },

  badge: {
    color: "white",
    padding: "5px 12px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "700",
    textTransform: "capitalize",
    transition: "0.3s",
  },

  button: {
    marginTop: "14px",
    width: "100%",
    padding: "11px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    color: "white",
    fontWeight: "700",
    cursor: "pointer",
    transition: "0.3s",
    boxShadow: "0 10px 25px rgba(15,23,42,0.2)",
  },
};