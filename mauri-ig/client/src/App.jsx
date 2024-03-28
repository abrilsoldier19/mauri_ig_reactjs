import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Header";
import SignInForm from "./components/LoginPagina/LoginForm";
import CarritoForm from "./components/CarritoPagina/Carrito"
import ProductosHome from "./components/DepartamentosPagina/Productos"
import RegistrarForm from "./components/RegistrarForm";
import AdminHome from "./components/AdminHome";
import CrearProducto from "./components/AgregarPagina";
import Home from "./components/Home";
import axios from 'axios';
import {Toaster} from 'react-hot-toast';

axios.defaults.baseURL = 'http://localhost:5173';
axios.defaults.withCredentials = true

function App() {
  return (
    <Router>
      <Header />
      <Toaster position="bottom-right" toastOptions={{duration: 2000}}/>
      <Routes>
        <Route path="/login" element={<SignInForm />} />
        <Route path="/sign-up" element={<RegistrarForm />} />
        <Route path="/home" element={<AdminHome />} />
        <Route path="/" element={<Home />} />
        <Route path="/carrito" element={<CarritoForm />} />
        <Route path="/crear-producto" element={<CrearProducto />} />
        <Route path="/productos" element={<ProductosHome />} />
      </Routes>
    </Router>
  );
}

export default App;
