import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import "../Common/css/login.css";
import Menu from "./components/Menu";
import { useNavigate } from "react-router-dom";

function DatosBancarios() {
  const navigate = useNavigate();
  const [membresia, setMembresia] = useState("");
  const [num_tarjeta, setNum_tarjeta] = useState("");
  const [cvv, setCvv] = useState("");
  const [tipo, setTipo] = useState("");
  const [vencimiento, setVencimiento] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ membresia, num_tarjeta, cvv, tipo, vencimiento });
  };

  const handleRegisterClick = () => {
    navigate("/PowerZone/Acceso");
  };

  return (
    <>
      <Menu />
      <div className="login-body">
        <Container className="contLog" style={{ margin: "90px" }}>
          <Form
            className="formulario"
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
              Datos Bancarios
            </h1>
            <div className="info-1">
              <div className="field">
                <Form.Control
                  required
                  type="text"
                  placeholder="Número de Tarjeta"
                  value={num_tarjeta}
                  onChange={(e) => setNum_tarjeta(e.target.value)}
                />
              </div>

              <div className="field">
                <Form.Control
                  required
                  type="text"
                  placeholder="Tipo de Tarjeta"
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                />
              </div>
            </div>

            <div className="info-1">
              <div className="field">
                <Form.Control
                  required
                  type="text"
                  placeholder="CVV"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                />
              </div>

             {/**Pendiente el pedo ,jajaja */}

              <div className="field">
                <Form.Control
                  required
                  type="date"
                  placeholder="Fecha de vencimiento"
                  value={vencimiento}
                  onChange={(e) => setVencimiento(e.target.value)}
                />
              </div>
            </div>

            <div className="field-1">
              <Form.Group controlId="formSelectMembresia">
                <Form.Control
                  required
                  as="select"
                  value={membresia}
                  onChange={(e) => setMembresia(e.target.value)}
                  style={{
                    width: "180%", 
                    marginLeft: "-40%",
                    background:"#D9D9D9",
                   
                    marginTop: "40px",
                    borderRadius: "0.25rem", 
                    padding: "0.375rem 0.75rem",
                    border: "1px solid #ced4da",
                    color: "#495057", 
                  }}
                  >
                  <option value="">Tipo de Membresia</option>
                  <option value="membresia1">Membresía 1</option>
                  <option value="membresia2">Membresía 2</option>
                  <option value="membresia3">Membresía 3</option>
                </Form.Control>
              </Form.Group>
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
              Registrarse
            </Button>
          </Form>
        </Container>
      </div>
    </>
  );
}

export default DatosBancarios;
