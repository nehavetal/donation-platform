import { useEffect, useState } from "react";
import api from "../services/api";

export default function AdminNGOList() {
  const [ngos, setNgos] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadNGOs = async () => {
    try {
      setLoading(true);
      const res = await api.get("/ngos");
      setNgos(res.data.ngos);
    } catch (err) {
      console.log(err);
      alert("Failed to load NGOs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNGOs();
  }, []);

  const verifyNGO = async (id) => {
    try {
      await api.patch(`/ngos/${id}/verify`);
      alert("NGO Verified Successfully");
      loadNGOs();
    } catch (err) {
      alert(err?.response?.data?.message || "Error verifying NGO");
    }
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>🧑‍💼 Admin Panel - NGO Verification</h1>

      {loading ? (
        <p style={styles.loading}>Loading NGOs...</p>
      ) : ngos.length === 0 ? (
        <p style={styles.empty}>No NGOs found</p>
      ) : (
        <div style={styles.grid}>
          {ngos.map((ngo) => (
            <div key={ngo._id} style={styles.card}>
              
              <div style={styles.header}>
                <h2 style={styles.name}>🏢 {ngo.name}</h2>

                <span
                  style={{
                    ...styles.badge,
                    background: ngo.verified ? "#16a34a" : "#dc2626",
                  }}
                >
                  {ngo.verified ? "Verified" : "Pending"}
                </span>
              </div>

              <div style={styles.info}>
                <p>📍 {ngo.location}</p>
                <p>📞 {ngo.contact}</p>
              </div>

              {!ngo.verified && (
                <button
                  onClick={() => verifyNGO(ngo._id)}
                  style={styles.button}
                >
                  ✅ Verify NGO
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* 🎨 STYLES */
const styles = {
  page: {
    padding: "25px",
    background: "linear-gradient(135deg, #f6f8fc, #eef2f7)",
    minHeight: "100vh",
    fontFamily: "Arial",
  },

  title: {
    color: "#1d3557",
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "bold",
  },

  loading: {
    color: "#555",
  },

  empty: {
    color: "#888",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "15px",
  },

  card: {
    background: "#fff",
    padding: "18px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    border: "1px solid #eee",
    transition: "0.3s",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  name: {
    fontSize: "18px",
    color: "#1d3557",
    margin: 0,
  },

  badge: {
    color: "white",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold",
  },

  info: {
    marginTop: "10px",
    color: "#444",
    fontSize: "14px",
    lineHeight: "1.6",
  },

  button: {
    marginTop: "12px",
    padding: "8px 12px",
    background: "linear-gradient(90deg, #1d3557, #457b9d)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    width: "100%",
  },
};