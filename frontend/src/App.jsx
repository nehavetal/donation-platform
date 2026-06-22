import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddDonation from "./pages/AddDonation";
import MyDonations from "./pages/MyDonations";
import NGOList from "./pages/NGOList";
import AddNGO from "./pages/AddNGO";
import AdminNGOList from "./pages/AdminNGOList";
import AdminPickups from "./pages/AdminPickups";

function App() {
  return (
    <BrowserRouter>
      
      {/* 🌟 GLOBAL APP WRAPPER */}
      <div className="app-container">

        {/* NAVBAR */}
        <Navbar />

        {/* ROUTES */}
        <main className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add" element={<AddDonation />} />
            <Route path="/my" element={<MyDonations />} />
            <Route path="/ngos" element={<NGOList />} />
            <Route path="/add-ngo" element={<AddNGO />} />
            <Route path="/admin-pickups" element={<AdminPickups />} />
            <Route path="/admin" element={<AdminNGOList />} />
          </Routes>
        </main>

      </div>

    </BrowserRouter>
  );
}

export default App;