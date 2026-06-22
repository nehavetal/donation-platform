import { useState } from "react";
import api from "../services/api";
import "./AddNGO.css";

export default function AddNGO() {
  const [form, setForm] = useState({
    name: "",
    location: "",
    contact: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    try {
      await api.post("/ngos", form);
      alert("NGO added successfully");

      setForm({
        name: "",
        location: "",
        contact: "",
      });
    } catch (err) {
      console.log(err);
      alert("Failed to add NGO");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Add NGO</h2>

        <input
          name="name"
          placeholder="NGO Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
        />

        <input
          name="contact"
          placeholder="Contact"
          value={form.contact}
          onChange={handleChange}
        />

        <button onClick={submit}>Add NGO</button>
      </div>
    </div>
  );
}

