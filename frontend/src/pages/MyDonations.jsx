import { useEffect, useState } from "react";
import api from "../services/api";
import DonationCard from "../components/DonationCard";

export default function MyDonations() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await api.get("/donations/user");
      setData(res.data.donations);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>📦 My Donations</h2>
        <p style={styles.subtitle}>Track all your donated items here</p>
      </div>

      {loading ? (
        <div style={styles.cardBox}>
          <div style={styles.loadingCard}>Loading donations...</div>
        </div>
      ) : data.length === 0 ? (
        <div style={styles.cardBox}>
          <div style={styles.emptyCard}>
            No donations found yet 😔
          </div>
        </div>
      ) : (
        <div style={styles.list}>
          {data.map((d) => (
            <DonationCard key={d._id} donation={d} />
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "40px 20px",
    minHeight: "100vh",
    background: "#f4f7fb",
    fontFamily: "Segoe UI, sans-serif",
  },

  header: {
    textAlign: "center",
    marginBottom: "30px",
  },

  title: {
    color: "#0f172a",
    fontSize: "26px",
    fontWeight: "700",
  },

  subtitle: {
    color: "#64748b",
    fontSize: "13px",
    marginTop: "5px",
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    maxWidth: "900px",
    margin: "0 auto",
  },

  cardBox: {
    display: "flex",
    justifyContent: "center",
    marginTop: "40px",
  },

  emptyCard: {
    background: "white",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
    color: "#64748b",
    fontWeight: "500",
  },

  loadingCard: {
    background: "white",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
    color: "#2563eb",
    fontWeight: "600",
  },
};