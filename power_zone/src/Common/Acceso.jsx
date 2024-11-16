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
  const urlEmpleados = "http://localhost:8080/api/power/empleado/";
  const urlGerente = "http://localhost:8080/api/power/gerente/";

  const [ usuario, setUsuario ] = useState("");
  const [ contra, setContra ] = useState("");
  const [ showPassword, setShowPassword ] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    getGerente();
  }, [])

  const getClientes = async () => {
      const respuesta = await axios({
          method: 'GET',
          url: urlClientes,
      });
      console.log(respuesta.data.data);

      return respuesta.data.data;
  }

  const getEmpleados = async () => {
    const respuesta = await axios({
        method: 'GET',
        url: urlEmpleados,
    });
    console.log(respuesta.data.data);

    return respuesta.data.data;
  }

  const getGerente = async () => {
    const respuesta = await axios({
        method: 'GET',
        url: urlGerente,
    });
    console.log(respuesta.data.data);

    return respuesta.data.data;
  }
    
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev); 
  };

  useEffect(() => {
    getCliente();
  }, []);

  const getCliente = async () => {
    const respuesta = await axios({
        method: 'GET',
        url: urlClientes
    });
    console.log("Cliente: ",respuesta.data.data)
    }

    const getEmpleado = async () => {
      const respuesta = await axios({
          method: 'GET',
          url: urlClientes
      });
      console.log("Empleado: ",respuesta.data.data)
      }

    const getGerente = async () => {
      const respuesta = await axios({
          method: 'GET',
          url: urlClientes
      });
      console.log("Gerente: ",respuesta.data.data)
      }

    const getPersona = async () => {
      const respuesta = await axios({
          method: 'GET',
          url: urlClientes
      });
      console.log("Persona: ",respuesta.data.data)
      }

  const iniciarSesion = async () => {
    if (!numMem || !contra) {
      Swal.fire(
        "Error",
        "Por favor, ingresa un número de membresía y contraseña",
        "error"
      );
      return;
    }

    try {
      const respuesta = await axios.get(urlPersonal);
      const usuarios = respuesta.data.data;

      if (usuarios.length > 0) {
        const usuarioValido = usuarios.find((user) => user.email === email);

        if (usuarioValido) {
          const rol = usuarioValido.rol;
          const nombre = usuarioValido.nombre;
          console.log(`${rol} de ${nombre}`);
          console.log(usuarioValido);

          await axios({
            method: "POST",
            url: urlSignin,
            data: {
              username: usuarioValido.username,
              password: password,
            },
          }).then(function (res) {
            console.log(res);
            if (res.data.status == "OK") {
              localStorage.setItem("token", res.data.data);
              localStorage.setItem("usuario", usuarioValido.idPersonal);
              localStorage.setItem("rol", usuarioValido.rol);

              switch (rol) {
                case "Admin":
                  navigate("/MesasAdm");
                  break;
                case "Caja":
                  navigate("/MesasCaja");
                  break;
                case "Cocina":
                  navigate("/MesasCocina");
                  break;
                default:
                  Swal.fire({
                    iconHtml: `<img src="${LogoTACO}" style="width: 250px; height: auto;">`,
                    title: "Error",
                    text: "El mesero no puede acceder a la interfaz web",
                  });
                  break;
              }
            }
          });
        } else {
          Swal.fire("Error", "Correo y/o contraseña incorrectos", "error");
        }
      } else {
        Swal.fire("Error", "No se encontraron usuarios", "error");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      Swal.fire("Error", "Correo y/o contraseña equivocados", "error");
    }
  };
  
  const registro = () => {
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

        if (usuarioIniciado) {
          localStorage.setItem("usuario", JSON.stringify(usuarioIniciado));

            switch(rol.nombre){
              case "Cliente":
                navigate("/PowerZone/C/Membresias");
                break;

              case "Empleado":
                navigate("/PowerZone/E/Cliente");
                break;

                case "Gerente":
                  navigate("/PowerZone/G/Clientes");
                break;
            }
            break;
        }
    }

    if (!usuarioIniciado) {
        console.log("El usuario y/o contraseña son incorrectos");
    }

    console.log(usuarioIniciado);
  };

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
                  onClick={contrasenaVisible}
                />
              </div>

              <Button className="form-submit-button" type="submit" onClick={() => iniciarSesion()}>
                Iniciar sesión
              </Button>

              <p className="forgot-password mt-5 mb-1">
                ¿No tienes una cuenta?{" "}
                <span onClick={registro} className="register-link" style={{cursor: 'pointer',color:'blue'}}>
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
