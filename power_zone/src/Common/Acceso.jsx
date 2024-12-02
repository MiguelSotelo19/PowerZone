import React, { useState, useEffect } from "react";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

import "../Common/css/login.css";
import Swal from "sweetalert2";


function Acceso() {
  const urlClientes = "http://localhost:8080/api/power/cliente/";
  const urlEmpleados = "http://localhost:8080/api/power/empleado/";
  const urlGerente = "http://localhost:8080/api/power/gerente/";

  const [ usuario, setUsuario ] = useState("");
  const [ contra, setContra ] = useState("");
  const [ showPassword, setShowPassword ] = useState(false); 
  const navigate = useNavigate();

  const getClientes = async () => {
      const respuesta = await axios({
          method: 'GET',
          url: urlClientes,
      });

      return respuesta.data.data;
  }

  const getEmpleados = async () => {
    const respuesta = await axios({
        method: 'GET',
        url: urlEmpleados,
    });

    return respuesta.data.data;
  }

  const getGerente = async () => {
    const respuesta = await axios({
        method: 'GET',
        url: urlGerente,
    });

    return respuesta.data.data;
  }

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev); 
  };



  const handleRegisterClick = () => {
    navigate('/PowerZone/DatosPersonales'); 
  };

  const iniciarSesion = async () => {
    let usuarioIniciado = null;

    const roles = [
        { nombre: "Cliente", getData: getClientes },
        { nombre: "Empleado", getData: getEmpleados },
        { nombre: "Gerente", getData: getGerente }
    ];

    for (const rol of roles) {

      const data = await rol.getData();
      usuarioIniciado = data.find(persona =>
          persona.cotrasenia === contra && persona.identificadorusuario === usuario
      );

      if(usuarioIniciado != null && usuarioIniciado != undefined){
        if (usuarioIniciado.estatus) {
          localStorage.setItem("usuario", JSON.stringify(usuarioIniciado));
          switch (rol.nombre) {
              case "Cliente":
                  navigate("/PowerZone/C/Perfil");
                  return;
              case "Empleado":
                  navigate("/PowerZone/E/Cliente");
                  return;
              case "Gerente":
                  navigate("/PowerZone/G/Clientes");
                  return;
          }
        } else {
            Swal.fire("Usuario desactivado","El usuario ingresado no se encuentra activo","warning");
            return;
        }
      }      
    }

    if (!usuarioIniciado) {
        Swal.fire("Usuario no encontrado","El número de membresía y/o contraseña son incorrectos","error")
    }
  };

  return (
    <>
      <Menu />
      <div className="login-body" >
        <Container className="contLog" style={{margin:"50px"}}>
          <div className="formulario-login">
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
                <span onClick={handleRegisterClick} className="register-link" style={{cursor: 'pointer',color:'blue'}}>
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