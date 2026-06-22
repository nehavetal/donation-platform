import { useEffect, useState } from "react";
import api from "../services/api";

export default function NGOList() {
  const [ngos, setNgos] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchNgos();
  }, []);

  const fetchNgos = async () => {
    try {
      const res = await api.get("/ngos");
      setNgos(res.data.ngos || []);
    } catch (err) {
      console.log(err);
    }
  };

  const filtered = ngos.filter((ngo) =>
    ngo.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.page}>
      
      {/* HERO */}
      <div style={styles.hero}>
        <h1>🏢 Trusted NGO Network</h1>
        <p>Connect your donations with verified organizations making real impact</p>

        <input
          placeholder="Search NGOs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.search}
        />
      </div>

      {/* GRID */}
      <div style={styles.grid}>
        {filtered.map((ngo) => (
          <div key={ngo._id} style={styles.card}>
            
            {/* HEADER */}
            <div style={styles.cardHeader}>
              <h3>🏢 {ngo.name}</h3>

              <span
                style={{
                  ...styles.badge,
                  background: ngo.verified ? "#16a34a" : "#dc2626",
                }}
              >
                {ngo.verified ? "Verified" : "Pending"}
              </span>
            </div>

            {/* LOCATION */}
            <p style={styles.row}>📍 {ngo.location}</p>

            {/* DESCRIPTION (optional future field) */}
            <p style={styles.desc}>
              🌱 Helping communities through food, clothing & education support
            </p>

            {/* TAGS */}
            <div style={styles.tags}>
              <span>#NGO</span>
              <span>#SocialImpact</span>
              <span>#Trusted</span>
            </div>

            {/* STATS */}
            <div style={styles.stats}>
              <div>
                <h4>120+</h4>
                <p>Donations</p>
              </div>
              <div>
                <h4>50+</h4>
                <p>Volunteers</p>
              </div>
              <div>
                <h4>4.8⭐</h4>
                <p>Rating</p>
              </div>
            </div>

            {/* BUTTON */}
            <button style={styles.button}>
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: "30px",
    background: "#f6f7fb",
    minHeight: "100vh",
    fontFamily: "Segoe UI",
  },

  hero: {
    textAlign: "center",
    marginBottom: "25px",
  },

  search: {
    marginTop: "15px",
    padding: "12px",
    width: "60%",
    borderRadius: "10px",
    border: "1px solid #ddd",
    outline: "none",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "18px",
  },

  card: {
    background: "white",
    padding: "18px",
    borderRadius: "14px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    transition: "0.3s",
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  row: {
    color: "#555",
    marginTop: "6px",
  },

  desc: {
    marginTop: "10px",
    fontSize: "13px",
    color: "#666",
  },

  badge: {
    color: "white",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "12px",
  },

  tags: {
    display: "flex",
    gap: "6px",
    marginTop: "10px",
    fontSize: "11px",
    color: "#64748b",
  },

  stats: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "12px",
    textAlign: "center",
  },

  button: {
    marginTop: "12px",
    width: "100%",
    padding: "10px",
    border: "none",
    borderRadius: "10px",
    background: "#1d3557",
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
  },
};