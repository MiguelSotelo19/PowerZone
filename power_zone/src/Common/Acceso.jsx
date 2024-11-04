import React, { useState } from "react";
import Footer from "./Footer";
import Menu from "./Menu";
import { Container, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "../Common/css/login.css";
import { useNavigate } from 'react-router-dom';


function Acceso() {
  const [showPassword, setShowPassword] = useState(false); 
  const navigate = useNavigate();
  
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev); 
  };

  
  
  const handleRegisterClick = () => {
    navigate('/PowerZone/DatosPersonales'); 
  };

  return (
    <>
      <Menu />
      <div className="login-body" >
        <Container className="contLog" style={{margin:"50px"}}>
          <Form className="formulario">
            <Form.Group className="formu">
              <h1 className="ttl">Iniciar sesión</h1>

              <Form.Label htmlFor="membresia" className="info" >
                Número de Membresía
              </Form.Label>
              <Form.Control type="text" name="membresia" id="membresia" required />

              <Form.Label htmlFor="password" className="info">
                Contraseña
              </Form.Label>
              <div className="password-input-container">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  required
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className="password-toggle-icon"
                  onClick={togglePasswordVisibility}
                />
              </div>

              <Button className="form-submit-button" type="submit">
                Iniciar sesión
              </Button>

              <p className="forgot-password">
                ¿No tienes una cuenta?{" "}
                <span onClick={handleRegisterClick} className="register-link" style={{cursor: 'p',color:'blue'}}>
                  Regístrate aquí
                </span>
              </p>
            </Form.Group>
          </Form>
        </Container>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default Acceso;
