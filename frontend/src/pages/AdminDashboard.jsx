import { useEffect, useState } from "react";
import api from "../services/api";
import NGOCard from "../components/NGOCard";

export default function AdminDashboard() {
  const [ngos, setNgos] = useState([]);
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

 const loadData = async () => {
  try {
    const ngoRes = await api.get("/ngos");
    const donationRes = await api.get("/donations/all");

    setNgos(ngoRes.data.ngos || []);
    setDonations(donationRes.data.donations || []);
  } catch (err) {
    console.log(err);
  }
};

  const verifyNGO = async (id) => {
    try {
      await api.patch(`/ngos/${id}/verify`);
      alert("NGO Verified");
      loadData();
    } catch (err) {
      alert("Error verifying NGO");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>👑 Admin Dashboard</h1>

      {/* STATS */}
      <div style={styles.statsRow}>
        <div style={styles.card}>
          📦 Total Donations: {donations.length}
        </div>

        <div style={styles.card}>
          🏢 Total NGOs: {ngos.length}
        </div>
      </div>

      {/* NGO LIST */}
      <h2 style={{ marginTop: "20px" }}>🏢 NGOs</h2>

      <div style={styles.grid}>
        {ngos.map((ngo) => (
          <NGOCard key={ngo._id} ngo={ngo} onVerify={verifyNGO} />
        ))}
      </div>

      {/* DONATIONS PREVIEW */}
      <h2 style={{ marginTop: "20px" }}>📦 Recent Donations</h2>

      <div style={styles.donationBox}>
        {donations.slice(0, 5).map((d) => (
          <div key={d._id} style={styles.donationCard}>
            <p>📦 {d.itemType}</p>
            <p>📊 Qty: {d.quantity}</p>
            <p>🔄 Status: {d.status}</p>
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
    background: "#f4f7fb",
    minHeight: "100vh",
  },

  title: {
    color: "#1d3557",
    marginBottom: "20px",
  },

  statsRow: {
    display: "flex",
    gap: "15px",
  },

  card: {
    flex: 1,
    padding: "15px",
    background: "white",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    fontWeight: "bold",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "10px",
  },

  donationBox: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },

  donationCard: {
    background: "white",
    padding: "10px",
    borderRadius: "8px",
    width: "200px",
    boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
  },
};