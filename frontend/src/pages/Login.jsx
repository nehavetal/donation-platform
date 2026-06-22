import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user)); // FIX

      const role = res.data.user.role;

      alert("Login Success");

      // 🔥 ONLY ADDITION (ADMIN SUPPORT)
      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

    } catch (err) {
      alert(err?.response?.data?.message || "Invalid Credentials");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🏢 Donation Platform</h2>
        <p style={styles.subtitle}>Sign in to continue</p>

        <input
          style={styles.input}
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.button} onClick={handleLogin}>
          Login
        </button>

        <p style={styles.registerText}>
          Don’t have an account?{" "}
          <Link to="/register" style={styles.link}>
            Register
          </Link>
        </p>

        <p style={styles.footerText}>
          Donate • Track • Make Impact
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f1f5f9",
    fontFamily: "Arial",
  },

  card: {
    width: "350px",
    padding: "30px",
    borderRadius: "12px",
    background: "#ffffff",
    boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
    textAlign: "center",
    borderTop: "4px solid #1d3557",
  },

  title: {
    marginBottom: "5px",
    color: "#1d3557",
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: "13px",
    color: "#6b7280",
    marginBottom: "20px",
  },

  input: {
    width: "100%",
    padding: "11px",
    margin: "8px 0",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    outline: "none",
    fontSize: "14px",
  },

  button: {
    width: "100%",
    padding: "11px",
    marginTop: "10px",
    background: "#1d3557",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  registerText: {
    marginTop: "15px",
    fontSize: "13px",
    color: "#6b7280",
  },

  link: {
    color: "#1d3557",
    fontWeight: "bold",
    textDecoration: "none",
  },

  footerText: {
    marginTop: "10px",
    fontSize: "11px",
    color: "#9ca3af",
  },
};