import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "donor",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) {
      alert("⚠️ Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        ...form,
        role: form.role, // unchanged
      };

      await api.post("/auth/register", payload);

      alert("🎉 Registered Successfully");

      navigate("/login");

    } catch (err) {
      alert(err?.response?.data?.message || "❌ Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>📝 Create Account</h2>
        <p style={styles.subtitle}>Donation & Reuse Platform</p>

        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          style={styles.input}
        />

        {/* 🔥 FIXED: NGO role removed confusion (SAFE DESIGN) */}
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          style={styles.select}
        >
          <option value="user">Donor</option>
          <option value="admin">Admin (Restricted)</option>
        </select>

        <button
          onClick={handleRegister}
          style={{
            ...styles.button,
            opacity: loading ? 0.6 : 1,
          }}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
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
    background: "linear-gradient(135deg, #e9ecef, #f8f9fa)",
    fontFamily: "Segoe UI, sans-serif",
  },

  card: {
    width: "380px",
    padding: "30px",
    borderRadius: "14px",
    background: "#ffffff",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    border: "1px solid #e5e7eb",
    textAlign: "center",
  },

  title: {
    color: "#1f2937",
    marginBottom: "5px",
    fontSize: "22px",
    fontWeight: "600",
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
    transition: "0.2s",
  },

  select: {
    width: "100%",
    padding: "11px",
    margin: "8px 0",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    outline: "none",
    fontSize: "14px",
    background: "#fff",
    cursor: "pointer",
  },

  button: {
    width: "100%",
    padding: "11px",
    marginTop: "12px",
    background: "linear-gradient(90deg, #1d3557, #457b9d)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "15px",
    transition: "0.3s",
  },
};