import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      {/* HERO SECTION */}
      <div style={styles.hero}>
        <h1 style={styles.title}>🏢 Donation & Reuse Platform</h1>
        <p style={styles.subtitle}>
          Connect with verified NGOs and donate unused clothes & household items easily.
        </p>

        <div style={styles.btnGroup}>
          <button style={styles.primaryBtn} onClick={() => navigate("/add")}>
            Donate Now
          </button>

          <button style={styles.secondaryBtn} onClick={() => navigate("/ngos")}>
            View NGOs
          </button>
        </div>
      </div>

      {/* FEATURES */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>✨ How It Works</h2>

        <div style={styles.grid}>
          <div style={styles.card}>
            <h3>📝 Register</h3>
            <p>Create your donor account in seconds.</p>
          </div>

          <div style={styles.card}>
            <h3>📦 Donate Items</h3>
            <p>Add clothes & household items easily.</p>
          </div>

          <div style={styles.card}>
            <h3>🚚 Pickup Service</h3>
            <p>Schedule doorstep collection.</p>
          </div>

          <div style={styles.card}>
            <h3>🏢 Verified NGOs</h3>
            <p>Your donations reach trusted NGOs.</p>
          </div>
        </div>
      </div>

      {/* IMPACT SECTION */}
      <div style={styles.stats}>
        <div style={styles.statBox}>
          <h2>10K+</h2>
          <p>Donations</p>
        </div>

        <div style={styles.statBox}>
          <h2>500+</h2>
          <p>NGOs</p>
        </div>

        <div style={styles.statBox}>
          <h2>25+</h2>
          <p>Cities</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Segoe UI, sans-serif",
    background: "#f4f7fb",
    minHeight: "100vh",
  },

  hero: {
    textAlign: "center",
    padding: "80px 20px",
    background: "linear-gradient(135deg, #0f172a, #1e293b, #334155)",
    color: "white",
    animation: "fadeIn 0.8s ease-in-out",
  },

  title: {
    fontSize: "38px",
    marginBottom: "12px",
    fontWeight: "700",
  },

  subtitle: {
    fontSize: "16px",
    opacity: 0.85,
    maxWidth: "600px",
    margin: "0 auto",
  },

  btnGroup: {
    marginTop: "25px",
  },

  primaryBtn: {
    padding: "12px 20px",
    marginRight: "12px",
    border: "none",
    borderRadius: "10px",
    background: "linear-gradient(90deg, #ef4444, #dc2626)",
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
    transition: "0.3s",
    boxShadow: "0 10px 25px rgba(239,68,68,0.3)",
  },

  secondaryBtn: {
    padding: "12px 20px",
    border: "1px solid rgba(255,255,255,0.4)",
    borderRadius: "10px",
    background: "transparent",
    color: "white",
    cursor: "pointer",
    fontWeight: "500",
    transition: "0.3s",
  },

  section: {
    padding: "60px 20px",
    textAlign: "center",
  },

  sectionTitle: {
    marginBottom: "30px",
    color: "#0f172a",
    fontSize: "26px",
    fontWeight: "700",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    padding: "10px",
    maxWidth: "1000px",
    margin: "0 auto",
  },

  card: {
    background: "rgba(255,255,255,0.9)",
    padding: "20px",
    borderRadius: "14px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
    transition: "0.3s",
    cursor: "pointer",
  },

  stats: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    padding: "50px 20px",
    background: "white",
    flexWrap: "wrap",
  },

  statBox: {
    textAlign: "center",
    padding: "20px",
    minWidth: "120px",
  },
};