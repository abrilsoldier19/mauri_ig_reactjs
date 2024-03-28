import { useState } from "react";
import "./RegisterForm.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import background from "./LoginPagina/fondo.png";

function RegistrarForm() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // State to manage message display

  const registrarUsuario = async (e) => {
    e.preventDefault();
    axios.post("http://localhost:8000/sign-up", { nombre, correo, password })
      .then((response) => {
        if (response.status === 201) {
          toast.success("Account created successfully");
          navigate("/login");
        } else {
          toast.error(response.data.error);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          setMessage(error.response.data.message); // Display server's error message
        } else {
          console.log(error); // Log other errors for debugging
          setMessage("An error occurred while registering");
        }
      });
      
  };
  const fondo = {
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    height: "100vh", // 100% de la altura del viewport
    width: "100vw", // 100% del ancho del viewport
    backgroundRepeat: "no-repeat",
  };

  return (
    <div className="sign-in-wrapper" >
    <div style={fondo}>
    <div ></div>
    </div>
    <div className="sign-in-container">
      {message && <p className="error-message">{message}</p>} {/* Display message */}
      <form onSubmit={registrarUsuario}>
        <h1>Crear cuenta</h1>
        <span className="bold-italic">Nombre</span>
        <input
          type="text"
          id="name"
          name="nombre"
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Name"
        />
        <span className="bold-italic">E-mail</span>
        <input
          type="email"
          name="correo"
          onChange={(e) => setCorreo(e.target.value)}
          placeholder="Email"
        />
        <span className="bold-italic">Contrasena*</span>
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Registrar</button>
      </form>
    </div>
    </div>
  );
}

export default RegistrarForm;
