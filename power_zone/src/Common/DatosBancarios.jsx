import React, { useEffect, useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import "../Common/css/login.css";
import Menu from "./components/Menu";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function DatosBancarios() {
  const urlC = "http://localhost:8080/api/power/cliente/";
  const urlMembresias = "http://localhost:8080/api/power/membresia/";

  const navigate = useNavigate();
  const [ idMembresia, setIdMembresia ] = useState("");
  const [membresias, setMembresias ] = useState([]);
  const [membresia, setMembresia ] = useState([]);
  const [num_tarjeta, setNum_tarjeta] = useState(localStorage.getItem("num_tarjeta") || "");
  const [cvv, setCvv] = useState(localStorage.getItem("cvv") || "");
  const [tipo, setTipo] = useState("");
  const [vencimiento, setVencimiento] = useState("");

  let nombre = localStorage.getItem("nombre");
  let correo = localStorage.getItem("correo");
  let telefono = localStorage.getItem("num_telefonico");
  let contra = localStorage.getItem("contra");
  let estatusCorreo = localStorage.getItem("estatusCorreo") === "true";

  useEffect(() => {    
      getMembresias();
  }, [])

  const getMembresias = async () => {
    const respuesta = await axios({
        method: 'GET',
        url: urlMembresias,
    });
    setMembresias(respuesta.data.data);
    console.log(estatusCorreo)
  }

  const datosPers = () => {
    localStorage.setItem("num_tarjeta", num_tarjeta);
    localStorage.setItem("cvv", cvv);
    navigate("/PowerZone/DatosPersonales");
  };

  const validar = async () => {
    event.preventDefault();
    let parametros;

     if(nombre.trim() == '' || !nombre){
      Swal.fire("Nombre vacío","El campo de nombre se encuentra vacío","warning")
    }else if(telefono.trim() == '' || !telefono || telefono.length<10){
      Swal.fire("Número de teléfono vacío","El campo del número telefónico debe contener 10 digitos","warning")
    }else if((correo.trim() == '' || !correo ) || !estatusCorreo) {
      Swal.fire("Correo vacío","El campo de correo se encuentra vacío o no tiene el formato requerido","warning")
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
    }else if(!membresia || !idMembresia){
      Swal.fire("Sin membresía seleccionada","Seleccione un tipo de membresía","warning")
    }else {
        let identificador= `PZC_${(Math.random().toString().slice(2, 7))}`;
        parametros = {
            correo: correo,
            cotrasenia: contra,
            estatus: true,
            id: 0,
            identificadorusuario: identificador,
            nombre: nombre,
            rol: 'Cliente',
            telefono: telefono,
            adquisicion: "",
            vencimiento: "",
            numero_tarjeta: num_tarjeta,
            cvv: cvv,
            membresia: {
                id: idMembresia == null ? parseInt(membresia, 10) : idMembresia
            }
      }
        console.log(parametros)
        enviarSolicitud(parametros,urlC);
    }
  }

  const enviarSolicitud = async(parametros, url) => {

    //console.log(parametros);
    await axios({
        method: 'POST',
        url: url,
        data: parametros
    }).then(async (result) =>{
        if(result.data.status == "OK"){
          Swal.fire({
            title: 'Cliente registrado',
            text:`Gracias por usar PowerZone.\n
            Tu número de membresía es: ${parametros.identificadorusuario}`,
            icon: 'success',
            allowOutsideClick: false,
            confirmButtonText: 'Iniciar sesión'
        }).then((result) => {
            if(result.isConfirmed){
              window.location = '/PowerZone/Acceso';
              localStorage.clear();
            }})
          }
    })
    .catch(function (error) {
        Swal.fire("Error en la Solicitud", "error");
        console.log(error);
    });
  
  } 

  const alertDatos=()=>{
    Swal.fire({
        title: 'Registrar cuenta',
        icon: 'warning',
        text:'Verifique su información antes de registrarse.',
        confirmButtonText: 'Registrarse',
        showCancelButton: true,
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if(result.isConfirmed){
            validar()
        }   
    })
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
                    <Form.Select required onChange={(e) => setIdMembresia(e.target.value)}>
                        <option value="">Selecciona una membresía</option>
                        {membresias.map((membresia) => (
                            <option key={membresia.id} value={membresia.id}>
                                {membresia.tipo_membresia}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row className="d-flex justify-content-between mt-2">
                <Col md={4} className="ms-5 pe-5">
                <Button className="fw-bold" variant="light" onClick={datosPers}>Regresar</Button>{' '}
                </Col>
                <Col md={6} className="ps-5">
                <Button variant="warning" className="fw-bold" onClick={()=> alertDatos()}>Registrarse</Button>
                </Col>
            </Row>
          </Form>
        </Container>
      </div>
    </>
  );
}
export default DatosBancarios;
