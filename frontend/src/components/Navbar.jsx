import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div style={styles.navbar}>
      <div style={styles.logo}>🏢 Donation Platform</div>

      <div style={styles.links}>
        <Link style={styles.link} to="/">Home</Link>
        {/* <Link style={styles.link} to="/dashboard">Dashboard</Link> */}
        <Link style={styles.link} to="/add">Donate</Link>

        {/* USER + ADMIN */}
        {(user?.role === "donor" || user?.role === "admin") && (
          <Link style={styles.link} to="/my">
            My Donations
          </Link>
        )}

        <Link style={styles.link} to="/ngos">NGOs</Link>

        {/* ADMIN ONLY */}
        {user?.role === "admin" && (
          <Link style={styles.link} to="/admin-pickups">
            🚚 Pickups
          </Link>
        )}

        <Link to="/add-ngo">
          <button style={styles.button}>Add NGO</button>
        </Link>

        <button style={styles.button} onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  navbar: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 26px",
    background: "rgba(15, 23, 42, 0.9)",
    backdropFilter: "blur(12px)",
    color: "white",
    boxShadow: "0 8px 25px rgba(0,0,0,0.25)",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
  },

  logo: {
    fontSize: "18px",
    fontWeight: "700",
    letterSpacing: "1px",
    color: "#ffffff",
  },

  links: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap",
  },

  link: {
    color: "#e2e8f0",
    textDecoration: "none",
    padding: "7px 10px",
    borderRadius: "8px",
    fontSize: "14px",
    transition: "0.3s",
  },

  button: {
    background: "linear-gradient(90deg, #ef4444, #dc2626)",
    color: "white",
    border: "none",
    padding: "7px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "13px",
    transition: "0.3s",
  },
};