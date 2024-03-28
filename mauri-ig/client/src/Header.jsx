import React, { useState } from "react";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import icon from "./components/icon.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { BsFileEarmarkPlus, BsPaletteFill  } from "react-icons/bs";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado de autenticación
  const location = useLocation();

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    // Aquí debes implementar la lógica para cerrar la sesión del usuario
    // Por ejemplo, limpiar el token de autenticación, etc.
    setIsLoggedIn(false); // Cambiar el estado de autenticación a falso
  };

  return (
    <div>
      {/* Primera barra de navegación */}
      <Navbar bg="EA2C2E" expand="lg" className="custom-navbar fixed-top" style={{ backgroundColor: "#EA2C2E" }}>
        <Navbar.Brand as={Link} to={location.pathname === "/" ? "/" : "/home"} style={{ color: "white", fontWeight: "bold", display: "flex", alignItems: "center" }}>
          <img src={icon} alt="Logo" style={{ height: "100%", marginRight: "10px" }} />
          <div>
            <div>LA CASA DE PAPEL</div>
            <div style={{ fontSize: "0.8em" }}>Super-papelerías</div>
          </div>
          
        </Navbar.Brand>

        

        {location.pathname === "/home" || location.pathname === "/carrito" || location.pathname === "/crear-producto" || location.pathname === "/productos" ? (
          <div>
            <Link to="/" onClick={handleLogout} style={{ color: "white", marginLeft: "50px", marginRight: "50px", textDecoration: "none" }}>Logout</Link>
            <Link to="/carrito" as={Link} style={{ color: "white", marginLeft: "50px", marginRight: "50px", textDecoration: "none" }}>
              <FontAwesomeIcon icon={faShoppingCart} /> {/* Esto mostrará el icono del carrito */}
            </Link>
          </div>

        ) : (
            // Si no está en la página de inicio, muestra los botones de Login y Sign Up
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ color: "white" }}>
                <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ marginRight: "60px" }} />
                <Navbar.Collapse id="basic-navbar-nav" className="mr-auto">
                  <Nav className="ml-auto">
                    <NavDropdown.Item as={Link} to="/login">Login</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/sign-up">Sign Up</NavDropdown.Item>
                  </Nav>
                </Navbar.Collapse>

              </div>
            </div>
          )}
      </Navbar>


      <Navbar bg="EA2C2E" expand="lg" className="custom-navbar fixed-top" style={{ backgroundColor: "#EA2C2E", top: "125px"  }}>


        {location.pathname === "/home" || location.pathname === "/carrito" || location.pathname === "/crear-producto" || location.pathname === "/productos" ? (
          <div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ marginRight: "60px", marginLeft: "20px" }} />
          <Navbar.Collapse id="basic-navbar-nav" className="mr-auto">
            <div style={{ marginTop: "14px" }}>
              <Link to="/crear-producto" as={Link} style={{ color: "white", marginLeft: "20px", marginRight: "50px", textDecoration: "none", borderRadius: '10px' }}>
                <BsFileEarmarkPlus />  Agregar Producto
              </Link>
            </div>
            <div style={{ marginTop: "14px" }}>
              <Link to="/productos" as={Link} style={{ color: "white", marginLeft: "20px", marginRight: "50px", textDecoration: "none", borderRadius: '10px' }}>
                <BsPaletteFill />  Departamentos
              </Link>
            </div>
            <div style={{ marginTop: "14px" }}>
              <Link to="/carrito" as={Link} style={{ color: "white", marginLeft: "20px", marginRight: "50px", textDecoration: "none", borderRadius: '10px' }}>
                <FontAwesomeIcon icon={faShoppingCart} />  Carrito
              </Link>
            </div>
          </Navbar.Collapse>
        </div>
        
        
        
      ) : (
            // Si no está en la página de inicio, muestra los botones de Login y Sign Up
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ color: "white" }}>
                <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ marginRight: "60px" }} />
                <Navbar.Collapse id="basic-navbar-nav" className="mr-auto">
                  <div style={{ marginTop: "14px" }}>
                    <Link to="/productos" as={Link} style={{ color: "white", marginLeft: "20px", marginRight: "50px", textDecoration: "none", borderRadius: '10px' }}>
                      <BsPaletteFill />  Departamentos
                    </Link>

                  </div>
                  <div style={{ marginTop: "14px" }}>
                    <Link to="/carrito" as={Link} style={{ color: "white", marginLeft: "20px", marginRight: "50px", textDecoration: "none", borderRadius: '10px' }}>
                      <FontAwesomeIcon icon={faShoppingCart} />  Carrito
                    </Link>
                  </div>
                </Navbar.Collapse>
              </div>
            </div>
          )}
      </Navbar>
    </div>
  );
}

export default Header;
