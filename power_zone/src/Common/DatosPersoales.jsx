import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import "../Common/css/login.css";
import Menu from "./components/Menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function DatosPersonales() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [ape_p, setApe_p] = useState("");
  const [ape_m, setApe_m] = useState("");
  const [num_telefonico, setNum] = useState("");
  const [correo, setCorreo] = useState("");
  const [contra, setContra] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  //Queda pendiente el pex del icono
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({ nombre, ape_p, ape_m, num_telefonico, correo, contra });
  };

  const handleRegisterClick = () => {
    navigate("/PowerZone/DatosBancarios");
  };

  return (
    <>
      <Menu />
      <div className="login-body">
        <Container className="contLog" style={{ margin: "90px" }}>
          <Form
            className=" formulario"
            onSubmit={handleSubmit}
            style={{
              width: "90%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: "20",
            }}
          >
            <h1
              style={{
                fontFamily: "Roboto, sans-serif",
                fontSize: "30px",
                fontWeight: "bold",
              }}
            >
              Datos Personales
            </h1>
            <div className="info-1">
              <div className="field">
                <Form.Control
                  required
                  type="text"
                  placeholder="Nombre(s)"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>

              <div className="field">
                <Form.Control
                  required
                  type="text"
                  placeholder="Apellido Paterno"
                  value={ape_p}
                  onChange={(e) => setApe_p(e.target.value)}
                />
              </div>
            </div>

            <div className="info-1">
              <div className="field">
                <Form.Control
                  required
                  type="text"
                  placeholder="Apellido Materno"
                  value={ape_m}
                  onChange={(e) => setApe_m(e.target.value)}
                />
              </div>

              <div className="field">
                <Form.Control
                  required
                  type="text"
                  placeholder="Número telefónico"
                  value={num_telefonico}
                  onChange={(e) => setNum(e.target.value)}
                />
              </div>
            </div>

            <div className="field-1">
              <Form.Control
                required
                type="email"
                placeholder="Correo Electrónico"
                className="w-50"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
            </div>

            <div className="field-1">
              <Form.Control
                required
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                value={contra}
                onChange={(e) => setContra(e.target.value)}
                icon={showPassword ? faEyeSlash : faEye}
                className="password-toggle-icon w-50"
                onClick={togglePasswordVisibility}
              />
            </div>

            <Button
              style={{
                width: "60%",
                marginTop: "30px",
                background: "#FFB612",
                border: "1px solid #FFB612",
                color: "black",
                fontWeight: "bold",
              }}
              type="submit"
              onClick={handleRegisterClick}
            >
              Siguiente
            </Button>
          </Form>
        </Container>
      </div>
    </>
  );
}

export default DatosPersonales;
