import { useState } from "react";
import api from "../services/api";

export default function AddDonation() {
  const [form, setForm] = useState({
    itemType: "",
    quantity: "",
    pickupAddress: "",
    scheduledDate: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
  try {
    const token = localStorage.getItem("token");

    await api.post(
      "/donations",
      form,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("🎉 Donation Added Successfully");

    setForm({
      itemType: "",
      quantity: "",
      pickupAddress: "",
      scheduledDate: "",
    });
  } catch (err) {
    console.log(err);
    alert("❌ Failed to add donation");
  }
};

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>📦 Add Donation</h2>
        <p style={styles.subtitle}>Share your unused items with NGOs</p>

        <input
          name="itemType"
          placeholder="Item Type (Clothes, Books...)"
          value={form.itemType}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="quantity"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="pickupAddress"
          placeholder="Pickup Address"
          value={form.pickupAddress}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="scheduledDate"
          type="date"
          value={form.scheduledDate}
          onChange={handleChange}
          style={styles.input}
        />

        <button onClick={submit} style={styles.button}>
          Submit Donation
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
    background: "#f1f5f9",
    fontFamily: "Arial",
  },

  card: {
    width: "360px",
    padding: "25px",
    borderRadius: "12px",
    background: "white",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    borderTop: "4px solid #1d3557",
    textAlign: "center",
  },

  title: {
    color: "#1d3557",
    marginBottom: "5px",
  },

  subtitle: {
    fontSize: "13px",
    color: "#6b7280",
    marginBottom: "20px",
  },

  input: {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    outline: "none",
  },

  button: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    background: "#1d3557",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};