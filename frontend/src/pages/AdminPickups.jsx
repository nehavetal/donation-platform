import { useEffect, useState } from "react";
import api from "../services/api";

export default function AdminPickups() {
  const [pickups, setPickups] = useState([]);

  useEffect(() => {
    loadPickups();
  }, []);

  const loadPickups = async () => {
    try {
      const res = await api.get("/pickups/admin/all");
      setPickups(res.data.pickups || []);
    } catch (err) {
      console.log(err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/pickups/${id}`, { status });
      loadPickups();
    } catch (err) {
      alert("Error updating status");
    }
  };

  const getColor = (status) => {
    switch (status) {
      case "assigned":
        return "#f59e0b";
      case "picked":
        return "#3b82f6";
      case "completed":
        return "#22c55e";
      default:
        return "#64748b";
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🚚 Admin Pickup Management</h2>

      {pickups.length === 0 ? (
        <p style={styles.empty}>No pickups available</p>
      ) : (
        pickups.map((p) => (
          <div key={p._id} style={styles.card}>
            <div style={styles.header}>
              <h3 style={styles.item}>📦 {p.donationId?.itemType}</h3>

              <span
                style={{
                  ...styles.badge,
                  background: getColor(p.status),
                }}
              >
                {p.status}
              </span>
            </div>

            <p style={styles.text}>📍 {p.pickupAddress}</p>
            <p style={styles.text}>
              📅 {p.scheduledDate?.slice(0, 10)}
            </p>

            <div style={styles.btnGroup}>
              <button
                style={styles.btn}
                onClick={() => updateStatus(p._id, "picked")}
              >
                Mark Picked
              </button>

              <button
                style={{ ...styles.btn, background: "#22c55e" }}
                onClick={() => updateStatus(p._id, "completed")}
              >
                Mark Completed
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    padding: "30px",
    // background: "linear-gradient(135deg, #cacfdc, #1e293b)",
    fontFamily: "Segoe UI, sans-serif",
  },

  // title: {
  //   color: "",
  //   marginBottom: "20px",
  //   fontSize: "24px",
  //   fontWeight: "700",
  // },

  empty: {
    color: "#cbd5e1",
  },

  card: {
    background: "rgba(255,255,255,0.95)",
    borderRadius: "14px",
    padding: "18px",
    marginBottom: "15px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
    transition: "0.3s",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  item: {
    margin: 0,
    fontSize: "16px",
    fontWeight: "700",
    color: "#0f172a",
  },

  text: {
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
  },

  btnGroup: {
    display: "flex",
    gap: "10px",
    marginTop: "12px",
  },

  btn: {
    flex: 1,
    padding: "10px",
    border: "none",
    borderRadius: "10px",
    background: "#f59e0b",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.3s",
  },
};