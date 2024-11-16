import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Menu from "./Menu";
import { Container, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "../Common/css/login.css";
import { useNavigate } from 'react-router-dom';

import axios from "axios";


function Acceso() {
  const urlClientes = "http://localhost:8080/api/power/cliente/";
  const urlEmpleado = "http://localhost:8080/api/power/empleado/";

  const [ usuario, setUsuario ] = useState("");
  const [ contra, setContra ] = useState("");
  const [ showPassword, setShowPassword ] = useState(false); 
  const navigate = useNavigate();

  const getClientes = async () => {
      const respuesta = await axios({
          method: 'GET',
          url: urlClientes,
      });
      console.log(respuesta.data.data);

      return respuesta.data.data;
  }
    
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev); 
  };

  
  
  const handleRegisterClick = () => {
    navigate('/PowerZone/DatosPersonales'); 
  };

  const iniciarSesion = async() => {
    const clientes = await getClientes();
    let usuarioIniciado = null;

    usuarioIniciado = clientes.find(cliente => 
      cliente.cotrasenia === contra && cliente.identificadorusuario === usuario
    );

    if(usuarioIniciado != null || usuarioIniciado != undefined){ 
      console.log("CLIENTE");
    }

    if(usuarioIniciado == null || usuarioIniciado == undefined){

    }

    console.log(usuarioIniciado);
  }

  return (
    <>
      <Menu />
      <div className="login-body" >
        <Container className="contLog" style={{margin:"50px"}}>
          <div className="formulario">
            <Form.Group className="formu">
              <h1 className="ttl">Iniciar sesión</h1>

              <Form.Label htmlFor="membresia" className="info">
                Número de Membresía
              </Form.Label>
              <Form.Control type="text" name="membresia" id="membresia" onChange={(e) => setUsuario(e.target.value)} required />

              <Form.Label htmlFor="password" className="info">
                Contraseña
              </Form.Label>
              <div className="password-input-container">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  onChange={(e) => setContra(e.target.value)}
                  required
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className="password-toggle-icon"
                  onClick={togglePasswordVisibility}
                />
              </div>

              <Button className="form-submit-button" type="submit" onClick={() => iniciarSesion()}>
                Iniciar sesión
              </Button>

              <p className="forgot-password">
                ¿No tienes una cuenta?{" "}
                <span onClick={handleRegisterClick} className="register-link" style={{cursor: 'p',color:'blue'}}>
                  Regístrate aquí
                </span>
              </p>
            </Form.Group>
          </div>
        </Container>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default Acceso;
