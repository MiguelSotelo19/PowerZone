import React, { useState } from "react"; // Importa useState para gestionar el estado
import Footer from "./Footer";
import Menu from "./Menu";
import { Container, Form, Button } from "react-bootstrap"; // Asegúrate de importar estos componentes si aún no lo has hecho
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "../Common/css/login.css";

function Acceso() {
  const [showPassword, setShowPassword] = useState(false); // Estado para la visibilidad de la contraseña

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev); // Alterna el estado de visibilidad de la contraseña
  };

  return (
    <>
      <Menu />
      <div className="login-body">
        <Container className="contLog">
          <Form className="formulario">
            <Form.Group className="formu">
              <h1 className="ttl">Iniciar sesión</h1>

              <Form.Label htmlFor="membresia" className="info">
                Número de Membresía
              </Form.Label>
              <Form.Control type="text" name="membresia" id="membresia" />

              <Form.Label htmlFor="password" className="info">
                Contraseña
              </Form.Label>
              <div className="password-input-container">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
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
                <a href="#" className="register-link">
                  Registrate aquí
                </a>
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
