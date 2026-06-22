import { useEffect, useState } from "react";
import api from "../services/api";
import DonationCard from "../components/DonationCard";

export default function NGODashboard() {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    loadDonations();
  }, []);

  const loadDonations = async () => {
    try {
      const res = await api.get("/donations/user/all");
      setDonations(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  // 👉 NGO accept donation
  const acceptDonation = async (id) => {
    try {
      await api.patch(`/donations/${id}`, {
        status: "accepted",
      });

      alert("Donation Accepted");
      loadDonations();
    } catch (err) {
      alert("Error accepting donation");
    }
  };

  // 👉 mark as picked
  const markPicked = async (id) => {
    try {
      await api.patch(`/donations/${id}`, {
        status: "picked",
      });

      loadDonations();
    } catch (err) {}
  };

  // 👉 mark as delivered
  const markDelivered = async (id) => {
    try {
      await api.patch(`/donations/${id}`, {
        status: "delivered",
      });

      loadDonations();
    } catch (err) {}
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🏢 NGO Dashboard</h1>

      <div style={styles.grid}>
        {donations.map((d) => (
          <div key={d._id} style={styles.card}>
            <DonationCard donation={d} />

            <div style={styles.actions}>
              {d.status === "pending" && (
                <button style={styles.btn} onClick={() => acceptDonation(d._id)}>
                  Accept
                </button>
              )}

              {d.status === "accepted" && (
                <button style={styles.btn} onClick={() => markPicked(d._id)}>
                  Mark Picked
                </button>
              )}

              {d.status === "picked" && (
                <button style={styles.btn} onClick={() => markDelivered(d._id)}>
                  Deliver
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 🎨 STYLES */
const styles = {
  container: {
    padding: "20px",
    background: "#f8fafc",
    minHeight: "100vh",
  },

  title: {
    color: "#1b4332",
    marginBottom: "20px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "15px",
  },

  card: {
    background: "white",
    padding: "10px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },

  actions: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },

  btn: {
    padding: "6px 10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    background: "#2d6a4f",
    color: "white",
  },
};