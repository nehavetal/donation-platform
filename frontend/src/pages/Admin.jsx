import api from "../services/api";

export default function Admin() {
  const verify = async (id) => {
    await api.patch(`/ngos/${id}/verify`);
    alert("NGO Verified");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Panel</h2>
      <p>Use NGO list page for verification in real app</p>
    </div>
  );
}