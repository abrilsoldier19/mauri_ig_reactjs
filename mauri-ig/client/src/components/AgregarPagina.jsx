import React, { useState } from "react";
import "./AdminPage.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import background from "./LoginPagina/fondo.png";

function CrearProducto() {
  const navigate = useNavigate();

  const [nombre, setnombreProducto] = useState("");
  const [descripcion, setdescripcion] = useState("");
  const [precio, setprecio] = useState("");
  const [imagen, setImagen] = useState(null); // Estado para almacenar la imagen seleccionada por el usuario

  const handleChangeImagen = (e) => {
    const file = e.target.files[0];
    setImagen(file);
  };

  const agregarProducto = async (e) => {
    e.preventDefault();

    // Crear un objeto FormData para enviar datos del formulario y la imagen
    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("descripcion", descripcion);
    formData.append("precio", precio);
    formData.append("imagen", imagen);

    axios.post("http://localhost:8000/crear-producto", formData)
      .then((response) => {
        if (response.status === 201) {
          toast.success("Producto agregado exitosamente");
          navigate("/productos");
        } else {
          toast.error(response.data.error);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error al crear el producto");
      });

      
  };

  const fondo = {
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    height: "100vh",
    width: "100vw",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div className="sign-in-wrapper">
      <div style={fondo}>
        <div></div>
      </div>
      <div className="sign-in-container">
        <form onSubmit={agregarProducto}>
          <h1>Crear producto</h1>
          <span className="bold-italic">Nombre del producto</span>
          <input
            type="text"
            id="name"
            name="nombreProducto"
            value={nombre}
            onChange={(e) => setnombreProducto(e.target.value)}
            placeholder="Nombre"
            required
          />
          <span className="bold-italic">Descripción del producto</span>
          <input
            type="text"
            name="descripcion"
            value={descripcion}
            onChange={(e) => setdescripcion(e.target.value)}
            placeholder="Descripción"
            required
          />
          <span className="bold-italic">Precio del producto</span>
          <input
            type="text"
            name="precio"
            value={precio}
            onChange={(e) => setprecio(e.target.value)}
            placeholder="Precio"
            required
          />
          <span className="bold-italic">Imagen del producto</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleChangeImagen}
            required
          />
          <button type="submit">Agregar</button>
        </form>
      </div>
    </div>
  );
}

export default CrearProducto;
