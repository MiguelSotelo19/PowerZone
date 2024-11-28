import React, { useEffect, useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import "../Common/css/login.css";
import Menu from "./components/Menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function DatosPersonales() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState(localStorage.getItem("nombre") || "");
  const [num_telefonico, setNum] = useState(localStorage.getItem("num_telefonico") || "");
  const [correo, setCorreo] = useState(localStorage.getItem("correo") || "");
  const [estatusCorreo, setEstatusCorreo] = useState(
    JSON.parse(localStorage.getItem("estatusCorreo")) || false
  );
  const [contra, setContra] = useState(localStorage.getItem("contra") || "");

  const [showPassword, setShowPassword] = useState(false);
  const [emailStatus, setEmailStatus] = useState(true);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const validarEmail = (e) => {
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const isValid = emailRegex.test(e.value);

    setEstatusCorreo(isValid);
    localStorage.setItem("estatusCorreo", JSON.stringify(isValid));
  };

  const validarPrevEmail = (correo) => {
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const isValid = emailRegex.test(correo);

    setEmailStatus(isValid);
    setEstatusCorreo(isValid);
    localStorage.setItem("estatusCorreo", JSON.stringify(isValid));
  };

  useEffect(() => {
    validarPrevEmail(correo);
  }, [correo]);

  const datosBanc = () => {
    localStorage.setItem("nombre", nombre);
    localStorage.setItem("num_telefonico", num_telefonico);
    localStorage.setItem("correo", correo);
    localStorage.setItem("contra", contra);
    localStorage.setItem("estatusCorreo", estatusCorreo.toString());
    navigate("/PowerZone/DatosBancarios");
  };

  return (
    <>
      <Menu />
      <div className="login-body">
        <Container className="formulario" style={{ marginTop: "30vh" }}>
          <h3 className="d-flex justify-content-center mt-1" style={{ fontFamily: "Roboto, sans-serif", fontSize: "30px", fontWeight: "bold" }}>
            Datos personales
          </h3>
          <Form>
            <Row className="d-flex justify-content-center mt-2">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Nombre completo:</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Nombre completo"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Número telefónico:</Form.Label>
                  <Form.Control
                    required
                    value={num_telefonico}
                    type="number"
                    placeholder="Número telefónico"
                    maxLength="10"
                    onInput={(e) => {
                      e.target.value = e.target.value.slice(0, 10);
                      if (e.target.value < 0) e.target.value = "";
                      setNum(e.target.value);
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="d-flex justify-content-center mt-2">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Correo electrónico:</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    placeholder="Correo Electrónico"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    onInput={(e) => validarEmail(e.target)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Contraseña:</Form.Label>
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }} className="password-input-container">
                    <Form.Control
                      required
                      type={showPassword ? "text" : "password"}
                      placeholder="Contraseña"
                      value={contra}
                      onChange={(e) => setContra(e.target.value)}
                    />
                    <FontAwesomeIcon
                      icon={showPassword ? faEyeSlash : faEye}
                      className="password-toggle-icon ps-1"
                      onClick={togglePasswordVisibility}
                    />
                  </div>
                </Form.Group>
              </Col>
            </Row>
            <div className="d-flex justify-content-center mt-2">
              <Button variant="warning" className="fw-bold" style={{ width: "60%" }} onClick={datosBanc}>
                Siguiente
              </Button>
            </div>
          </Form>
        </Container>
      </div>
    </>
  );
}

export default DatosPersonales;
