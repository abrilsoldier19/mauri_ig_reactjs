import React, { useState, useEffect } from "react";
import "./Carrito.css";
import { useNavigate, useLocation } from "react-router-dom";

function CarritoHome() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const userName = location.state && location.state.userName; // Obtén el nombre del usuario desde el estado

  useEffect(() => {
    fetch('http://localhost:8000/carrito')
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(err => console.error("Error fetching data: ", err));
  }, []);

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="auth-wrapper" style={{ height: "auto", marginTop: 50 }}>
      <div className="auth-inner" style={{ width: "fit-content" }}>
        <h3 style={{ color: "#00ff00", textShadow: "0 0 10px #00ff00" }}>Welcome {userName}</h3> {/* Muestra el nombre del usuario */}
        <button onClick={handleLogout} className="btn btn-primary" style={{ marginTop: 10, background: "#00ff00", border: "none", boxShadow: "0 0 10px #00ff00" }}>
          Log Out
        </button>
        <div className="futuristic-decoration"></div>
      </div>
    </div>
  );
}

export default CarritoHome;
