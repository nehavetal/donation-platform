export default function NGOCard({ ngo, onVerify }) {
  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h3 style={styles.title}>🏢 {ngo.name}</h3>

        <span
          style={{
            ...styles.badge,
            background: ngo.verified ? "#22c55e" : "#ef4444",
          }}
        >
          {ngo.verified ? "Verified" : "Not Verified"}
        </span>
      </div>

      <div style={styles.row}>📍 {ngo.location}</div>
      <div style={styles.row}>📞 {ngo.contact}</div>

      {!ngo.verified && onVerify && (
        <button
          onClick={() => onVerify(ngo._id)}
          style={styles.button}
        >
          Verify NGO
        </button>
      )}
    </div>
  );
}

const styles = {
  card: {
    background: "rgba(255,255,255,0.95)",
    borderRadius: "14px",
    padding: "18px",
    margin: "12px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
    border: "1px solid #e5e7eb",
    transition: "0.3s",
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
    fontWeight: "700",
  },

  row: {
    fontSize: "14px",
    color: "#475569",
    margin: "6px 0",
  },

  badge: {
    color: "white",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
    textTransform: "capitalize",
  },

  button: {
    marginTop: "12px",
    width: "100%",
    padding: "10px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(90deg, #2563eb, #1d4ed8)",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.3s",
  },
};