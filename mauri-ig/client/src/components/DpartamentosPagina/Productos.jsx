import React, { useState, useEffect } from "react";
import "./Productos.css";
import { useNavigate, useLocation } from "react-router-dom";

function ProductosHome() {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para almacenar el término de búsqueda
  const navigate = useNavigate();
  const location = useLocation();
  const userName = location.state && location.state.userName; // Obtén el nombre del usuario desde el estado

  useEffect(() => {
    fetch('http://localhost:8000/productos')
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(err => console.error("Error fetching data: ", err));
  }, []);

  // Función para manejar el cambio en el campo de búsqueda
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filtrar los elementos según el término de búsqueda
  const filteredItems = items.filter(item =>
    item.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="auth-wrapper " style={{ height: "auto"}}>
      <div className="center-container">
        <form className="form-container" style={{ width: "210px", marginLeft:"200px" }}>
          <input className="form-control form-container"
            type="text"
            placeholder="Search by product name"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </form>
      </div>
      <div className="auth-inner" style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center", alignItems: "flex-start", marginTop: "30px" }}>
        {filteredItems.map(item => (
          <div className="card" key={item._id} style={{ maxWidth: "18rem", margin: "10px" }}>
            <img src={`http://localhost:8000/${item.imagen}`} className="card-img-top" alt="Producto" style={{ maxHeight: "200px", objectFit: "contain" }} />
            <div className="card-body">
              <h5 className="card-title">{item.nombre}</h5>
              <p className="card-text">Descripción: {item.descripcion}</p>
              <p className="card-text">Precio: ${item.precio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductosHome;
