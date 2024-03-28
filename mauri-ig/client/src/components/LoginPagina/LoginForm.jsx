import { useState } from "react";
import "./LoginPage.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import background from "./fondo.png";

function SignInForm() {
  const navigate = useNavigate(); // Utiliza useNavigate para obtener la función navigate
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:8000/login", { correo, password }); // Utiliza axios.post para enviar datos al servidor
      console.log(result);
      if (result.data.message === "Ingresado exitosamente") {
        navigate("/home", { state: { userName: result.data.userName } }); // Pasa el nombre del usuario a AdminHome
      }else {
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
      <div style={fondo}></div>
      <div className="sign-in-container">
        <form onSubmit={loginUser}>
          <h1 className="bold-italic">Iniciar Sesión</h1>
          <h1 className="sesion-text" style={{ fontSize: '16px' }}>¿Es tu primera vez?  <Link to="/sign-up">Registrate</Link></h1>
          
          <span className="sesion-text" style={{ fontSize: '16px'}}>E-mail</span>
          <input
            type="email"
            placeholder="email"
            name="correo"
            value={correo} // Usa value para establecer el valor del input
            onChange={(e) => setCorreo(e.target.value)}
          />
           <span className="sesion-text" style={{ fontSize: '16px'}}>Password</span>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password} // Usa value para establecer el valor del input
            onChange={(e) => setPassword(e.target.value)}
          />
          <a href="#">Forgot your password?</a>
          <button type="submit">Sign In</button> {/* Añade type="submit" al botón */}
        </form>
      </div>
    </div>
  );
}

export default SignInForm;
