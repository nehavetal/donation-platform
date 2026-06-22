import { useEffect, useState } from "react";
import api from "../services/api";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ donations: 0, ngos: 0 });

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user"));
    setUser(u);

    if (u) loadStats(u);
  }, []);

  const loadStats = async (u) => {
    try {
      const donations = await api.get("/donations/user/" + u?.id);
      const ngos = await api.get("/ngos");

      setStats({
        donations: donations.data.length,
        ngos: ngos.data.length,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📊 Dashboard</h1>

      {/* CENTER WRAPPER */}
      <div style={styles.wrapper}>
        
        {/* USER CARD */}
        <div style={styles.userCard}>
          <h2>👤 {user?.name}</h2>
          <p>
            Role: <span style={styles.role}>{user?.role || "User"}</span>
          </p>
        </div>

        {/* SMALL CARDS ROW */}
        <div style={styles.row}>
          <div style={styles.card}>
            <h2>📦 {stats.donations}</h2>
            <p>Total Donations</p>
          </div>

          <div style={styles.card}>
            <h2>🏢 {stats.ngos}</h2>
            <p>Verified NGOs</p>
          </div>
        </div>

      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    background: "#f1f5f9",
    minHeight: "100vh",
    fontFamily: "Arial",
    textAlign: "center",
  },

  title: {
    color: "#1d3557",
    marginBottom: "20px",
  },

  wrapper: {
    maxWidth: "600px",   // 👈 MAIN FIX (NOT FULL WIDTH)
    margin: "0 auto",
  },

  userCard: {
    background: "white",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    marginBottom: "20px",
    textAlign: "left",
  },

  role: {
    background: "#1d3557",
    color: "white",
    padding: "3px 8px",
    borderRadius: "6px",
    fontSize: "12px",
  },

  row: {
    display: "flex",
    gap: "15px",
    justifyContent: "center",
  },

  card: {
    flex: 1,
    maxWidth: "200px",   // 👈 SMALL CARD WIDTH
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    borderTop: "4px solid #1d3557",
  },
};