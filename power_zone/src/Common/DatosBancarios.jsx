import React, { useEffect, useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import "../Common/css/login.css";
import Menu from "./components/Menu";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function DatosBancarios() {
  const urlMembresias = "http://localhost:8080/api/power/membresia/";

  const navigate = useNavigate();
  const [membresias, setMembresias ] = useState([]);
  const [membresia, setMembresia ] = useState([]);
  const [num_tarjeta, setNum_tarjeta] = useState("");
  const [cvv, setCvv] = useState("");
  const [tipo, setTipo] = useState("");
  const [vencimiento, setVencimiento] = useState("");

  let nombre = localStorage.getItem("nombre");
  let correo = localStorage.getItem("correo");
  let telefono = localStorage.getItem("num_telefonico");
  let contra = localStorage.getItem("contra");
  let estatusCorreo= localStorage.getItem("estatusCorreo");

    useEffect(() => {    
      getMembresias();
  }, [])

  const getMembresias = async () => {
    const respuesta = await axios({
        method: 'GET',
        url: urlMembresias,
    });
    setMembresias(respuesta.data.data);
    console.log(nombre)
    console.log(correo)
    console.log(contra)
    console.log(telefono)
  }

  const datosPers = () => {
    navigate("/PowerZone/DatosPersonales");
  };

  const handleRegisterClick = () => {
    navigate("/PowerZone/Acceso");
  };

  const validar = async () => {
    event.preventDefault();
    let parametros;

    if(correo.trim() == '' || !correo || estatusCorreo==false) {
        Swal.fire("Correo vacío","El campo de correo se encuentra vacío o está incorrecto","warning")
    } else if(nombre.trim() == '' || !nombre){
        Swal.fire("Nombre vacío","El campo de nombre se encuentra vacío","warning")
    }else if(telefono.trim() == '' || !telefono){
        Swal.fire("Número de teléfono vacío","El campo del número telefónico se encuentra vacío","warning")
    }else if(contra.trim() == '' || !contra){
        Swal.fire("Contraseña vacía","El campo de contraseña se encuentra vacío","warning")
    }else if(num_tarjeta.trim() == '' || !num_tarjeta || num_tarjeta.length<16){
      Swal.fire("Número de tarjeta incorrecto","El campo de contraseña debe contener 16 digitos","warning")
    }else if(tipo.trim() == '' || !tipo){
      Swal.fire("Tipo de tarjeta vacío","Seleccione un tipo de tarjeta","warning")
    }else if(cvv.trim() == '' || !cvv || cvv.length<3){
      Swal.fire("CVV vacío","El campo de CVV debe contener 3 digitos","warning")
    }else if(vencimiento.trim() == '' || !vencimiento){
      Swal.fire("Fecha de vencimiento vacía","El campo de fecha de vencimiento se encuentra vacío","warning")
    }else if(!membresia){
      Swal.fire("Sin membresía seleccionada","Seleccione un tipo de membresía","warning")
    }else {
        parametros = {
            correo: correo,
            cotrasenia: contra,
            estatus: estatus,
            id: idGerente,
            identificadorusuario: identUsuario,
            nombre: nombre,
            rol: 'Cliente',
            telefono: telefono,
      }
        console.log(parametros)
        actualizar(parametros);
    }
  }

  return (
    <>
      <Menu />
      <div className="login-body">
        <Container className="formulario" style={{ marginTop: "30vh" }}>
          <h3
            className="d-flex justify-content-center mt-1"
            style={{
              fontFamily: "Roboto, sans-serif",
              fontSize: "30px",
              fontWeight: "bold",
            }}
          >
            Datos bancarios
          </h3>
          <Form>
            <Row className="d-flex justify-content-center mt-2">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Número de tarjeta:</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    placeholder="Número de Tarjeta"
                    value={num_tarjeta}
                    onChange={(e) => setNum_tarjeta(e.target.value)}
                    onInput={(e) => {e.target.value = e.target.value.slice(0, 16);
                        if (e.target.value < 0) e.target.value = "";
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Tipo de tarjeta:</Form.Label>
                  <Form.Select required onChange={(e) => setTipo(e.target.value)}>
                      <option value="">Selecciona tu banco</option>
                      <option value="BBVA">BBVA</option>
                      <option value="Banamex">Banamex</option>
                      <option value="Banorte">Banorte</option>
                      <option value="Santander">Santander</option>
                      <option value="HSBC">HSBC</option>
                      <option value="Scotiabank">Scotiabank</option>
                      <option value="Inbursa">Inbursa</option>
                      <option value="BancoAzteca">Banco Azteca</option>
                      <option value="BanCoppel">BanCoppel</option>
                      <option value="Afirme">Afirme</option>
                      <option value="BancoBienestar">Banco del Bienestar</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
  
            <Row className="d-flex justify-content-center mt-2">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">CVV:</Form.Label>
                  <Form.Control
                  required
                  type="number"
                  placeholder="CVV"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  onInput={(e) => { e.target.value = e.target.value.slice(0, 3);
                  if (e.target.value < 0) e.target.value = "";
                  }}
                />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Label className="fw-bold">Fecha de vencimiento:</Form.Label>
                <Form.Control
                  required
                  type="date"
                  placeholder="Fecha de vencimiento"
                  value={vencimiento}
                  onChange={(e) => setVencimiento(e.target.value)}
                />
              </Col>
            </Row>
            <Row className="d-flex justify-content-center mt-2">
              <Col md={12}>
                <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Tipo de membresía:</Form.Label>
                    <Form.Select required onChange={(e) => setMembresia(e.target.value)}>
                        <option id="selected">Selecciona una membresia</option>
                        {membresias.map((membresia => (
                            <option key={membresia.id} value={membresia.id}>{membresia.tipo_membresia}</option>
                        )))}
                    </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row className="d-flex justify-content-between mt-2">
                <Col md={4} className="ms-5 pe-5">
                <Button className="fw-bold" variant="light" onClick={datosPers}>Regresar</Button>{' '}
                </Col>
                <Col md={6} className="ps-5">
                <Button variant="warning" className="fw-bold" onClick={handleRegisterClick}>Registrarse</Button>
                </Col>
            </Row>
          </Form>
        </Container>
      </div>
    </>
  );
}
export default DatosBancarios;
