import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { show_alerta } from "../Common/js/funciones";


import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Menu from "./etiquetas/Menu"
import Contenedor from "./etiquetas/Contenedor"

 
//CSS
import './css/Clientes.css'

//Imágenes
import cross from './img/cross.png'
import lupa from './img/lupa.png'
import { Col, Container, InputGroup, Row } from "react-bootstrap";

const customStyles = {
    content: {
      width: "auto",
      height: "auto",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderWidth: 2,
      borderColor: "blue",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }
};

function Clientes () {
    const urlClientes = "http://localhost:8080/api/power/cliente/";
    const urlMembresias = "http://localhost:8080/api/power/membresia/";
    const [ clientes, setClientes ] = useState([]);
    const [ membresias, setMembresias ] = useState([]);
    const [membresiaCliente, setMembresiaCliente] = useState([]);

    const [ idCliente, setIdCliente ] = useState("");
    const [ nombre, setNombre ] = useState("");
    const [ ape_p, setApe_p ] = useState("");
    const [ ape_m, setApe_m ] = useState("");    
    const [ num_telefonico, setNum ] = useState("");
    const [ correo, setCorreo ] = useState("");
    const [ membresia, setMembresia ] = useState([]);
    const [ contra, setContra ] = useState("");
    const [ num_tarjeta, setNumTarjeta ] = useState("");
    const [ cvv, setCVV ] = useState(0);
    const [ tipo_tarjeta, setTipoTarjeta ] = useState("");
    const [ fecha_venc, setFechaVenc ] = useState("");
    const [ identificador, setIdentificador] = useState("");
    const [ idMembresia, setIdMembresia ] = useState("");
    const [ estatus, setEstatus ] = useState(true);
    const [adquisicion, setAdquisicion]= useState("");
    const [tipo_membresia, setTipo_membresia]= useState("");

    const [ emailStatus, setEmailStatus ] = useState(false);

    let user = JSON.parse(localStorage.getItem("usuario"));
    //console.log("USUARIO INICIADO: ");
    //console.log(user);

    //Traer datos de cliente
    useEffect(() => {     
        getClientes();
        getMembresias();
    }, [])

    const getClientes = async () => {
        const respuesta = await axios({
            method: 'GET',
            url: urlClientes,
        });
        //console.log(respuesta.data.data);
        setClientes(respuesta.data.data);
    }

    const getMembresias = async () => {
        const respuesta = await axios({
            method: 'GET',
            url: urlMembresias,
        });
        setMembresias(respuesta.data.data);
        setClienteMembresias(respuesta.data.data);
        console.log(respuesta.data.data)
    }

    const setClienteMembresias = async (membresias) => {
        const clientesConMembresia = [];
    
        for (const membresia of membresias) {
            if (membresia.clienteBeans && membresia.clienteBeans.length > 0) {
                for (const cliente of membresia.clienteBeans) {
                    const clienteMembresia = {
                        //Cliente
                        idC: cliente.id,
                        nombre: cliente.nombre,
                        correo: cliente.correo,
                        telefono: cliente.telefono,
                        numero_tarjeta: cliente.numero_tarjeta,
                        vencimiento: cliente.vencimiento,
                        cvv: cliente.cvv,
                        identificadorusuario: cliente.identificadorusuario,
                        rol: cliente.rol,
                        adquisicion: cliente.adquisicion,
                        cotrasenia: cliente.cotrasenia,
                        estatus: cliente.estatus,

                        //Membresía
                        idM: membresia.id,
                        tipo_membresia: membresia.tipo_membresia,
                        costo: membresia.costo,
                    };
                    clientesConMembresia.push(clienteMembresia);
                }
            }
        }

        setMembresiaCliente(clientesConMembresia);
        console.log("membresiaCliente:",membresiaCliente)
        console.log("clientes:",clientes)
    };
    
    const limpiar = () => {
        setIdCliente(null);
        setNombre(null);
        setCorreo(null);
        setContra(null);
        setIdentificador(null);
        setNum(null);
        setIdMembresia(null);
        setCVV(null);
        setNumTarjeta(null);
        setEstatus(null);
    }

    //Modales
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modalMemIsOpen, setMemIsOpen] = React.useState(false);
    const [modalActIsOpen, setActIsOpen] = React.useState(false);
    const [modalActMemIsOpen, setActMemIsOpen] = React.useState(false);

    //Modal Registrar Cliente
    function openModal() {  
        setEstatus(true);
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function registrarMembresia() {
        closeModal();
        setMemIsOpen(true);
    }

    function closMemModal() {
        setMemIsOpen(false);
    }

    //Modal Actualizar Cliente 
    function openActModal(id_, nombre_, correo_, contrasenia_, identificadorusuario_, telefono_, membresia_, cvv_, numero_tarjeta_, estatus_, idM_,adquisicion_,tipo_membresia_) {
        setIdCliente(id_);
        setNombre(nombre_);
        setCorreo(correo_);
        setContra(contrasenia_);
        setIdentificador(identificadorusuario_);
        setNum(telefono_);
        setIdMembresia(idM_);
        setCVV(cvv_);
        setNumTarjeta(numero_tarjeta_);
        setEstatus(estatus_);
        setAdquisicion(adquisicion_);
        setTipo_membresia(tipo_membresia_);
        setActIsOpen(true);
    }

    function closeModalAct() {
        setActIsOpen(false);
    }

    function closeActMemModal() {
        setActMemIsOpen(false);
    }

    function actualizarMembresia() {
        closeModalAct();
        setActMemIsOpen(true);
    }

    function regresarModal() {
        closMemModal();
        openModal();
    }

    function regresarModalAct() {
        closeActMemModal();
        openActModal();
    }

    //Envío de formulario
    const validar = (metodo) => {
        event.preventDefault();

        var parametros;
        if(nombre.trim() === ""){
            show_alerta("Escribe el nombre del cliente", "warning");
        }else if(fecha_venc.trim() === "" && metodo=="POST"){
            show_alerta("Escribe la fecha de vencimiento", "warning");
        } else if(tipo_tarjeta.trim() === "" && metodo=="POST"){
            show_alerta("Escribe el tipo de tarjeta", "warning");
        } else if(cvv === null){
            show_alerta("Escribe el CVV", "warning");
        } else if(num_tarjeta.trim() === ""){
            show_alerta("Escribe el número de tarjeta", "warning");
        } else if(ape_p.trim() === "" && metodo=="POST"){
            show_alerta("Escribe el apellido paterno del cliente", "warning");
        } else if(ape_m.trim() === "" && metodo=="POST"){
            show_alerta("Escribe el apellido materno del cliente", "warning");
        } else if(num_telefonico.trim() === ""){
            show_alerta("Escribe el número de teléfono del cliente", "warning");
        } else if(correo.trim() === ""){
            show_alerta("Escribe el correo del cliente", "warning");
        } else if(membresia === null){
            show_alerta("Selecciona un tipo de membresía", "warning");
        } else {
            parametros = {
                nombre: nombre,
                cotrasenia: contra == null ? `PowerPass_${Math.random().toString(36).substring(2, 10)}` : contra,
                correo: correo,
                identificadorusuario: identificador == null ? `PowerClient_${Math.random().toString(36).substring(2, 11)}` : identificador,
                rol: 'Cliente',
                telefono: num_telefonico,
                estatus: estatus,
                cvv: parseInt(cvv),
                numero_tarjeta: num_tarjeta,
                adquisicion: "",
                vencimiento: "",
                membresia: {
                    id: idMembresia == null ? parseInt(membresia, 10) : idMembresia
                }
            }

            console.log(parametros)
            enviarSolicitud(metodo, parametros, urlClientes);
        }
    }

    const activarC = (id_, nombre_, correo_, contrasenia_, identificadorusuario_, telefono_, membresia_, cvv_, numero_tarjeta_, estatus_) => {
        console.log(estatus_);
        var parametros = {
            nombre: nombre_,
            cotrasenia: contrasenia_,
            correo: correo_,
            identificadorusuario: identificadorusuario_,
            rol: 'Cliente',
            telefono: telefono_,
            estatus: estatus_ == true ? false : true,
            cvv: parseInt(cvv_),
            numero_tarjeta: numero_tarjeta_
        }

        console.log(parametros);

        enviarSolicitud("PUT", parametros, urlClientes, id_);
    }

    const enviarSolicitud = async(metodo, parametros, url, id_) => {
        event.preventDefault();
    
        if(metodo != "POST"){
            (id_ == undefined) ? url = url + idCliente : url = url + id_;
        } 
        console.log(parametros);
        await axios({
            method: metodo,
            url: url,
            data: parametros
        }).then(function (respuesta) {
            var tipo = respuesta.data[0];
            var msj = respuesta.data[1];
            if(tipo === "success"){
                show_alerta("Cambios realizados correctamente", "success");         
            } 
            closMemModal();
            closeModal();
            closeModalAct();

            getClientes();
        })
        .catch(function (error) {
            show_alerta("Error en la Solicitud", "error");
            console.log(error);
        });
    }

    //Filtrado
    const [searchTerm, setSearchTerm] = useState('');

    // Filtrar equipos
    const filteredClientes = membresiaCliente.filter(cliente => 
        cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cliente.identificadorUsuario.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Actualizar
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    //Validar e-mail
    const validarEmail = (e) => {
        let campo = e;
            
        let emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        
        if (emailRegex.test(campo.value)) {  
            console.log("SI")
          setEmailStatus(true);
        } else {
            console.log("NO")
          setEmailStatus(false);
        }
    }
    return (
        <>
            <Menu />
 
            <div className='main-content pb-5'>
                <div style={{ width: '99vw' }}></div>

                <div className='d-flex justify-content-evenly'>
                    <Button className="m-1 fs-5 fw-bold" variant="success" onClick={() => { limpiar(); openModal(); }}>
                    <img 
                    src={cross}
                    alt='mas'
                    style={{ width: '2vh', height: '2vh',marginTop:-4 }}                    
                    />&nbsp;&nbsp;Agregar clientes</Button>{' '}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '30%' }}>
                        <img src={lupa} alt="Buscar" style={{ width: '4vh', height: '3vh' }} />
                        <Form.Control type="text" placeholder="Buscar clientes" value={searchTerm} onChange={handleSearchChange} 
                            style={{ backgroundColor: 'rgb(217, 217, 217)', borderRadius: '12px',}}/>
                    </div>
                </div>
            

                <h1 className="d-flex justify-content-center mt-5">Clientes</h1>

                {filteredClientes.map((cliente, i) => {
                    return (
                        <Contenedor 
                            key={cliente.idM + i}
                            title1={'Cliente'}
                            text1={cliente.nombre} 
                            title2={'Tipo de Membresía'}
                            text2={cliente.tipo_membresia} 
                            title3={'Número de membresía'}
                            text3={cliente.identificadorusuario} 
                            title4={'Estado'}
                            acciones={
                                <>
                                    {cliente.estatus ? (
                                        <Button className='me-1' variant="danger" onClick={() => { activarC(cliente.idC, cliente.nombre, cliente.correo, cliente.cotrasenia, cliente.identificadorusuario, cliente.telefono, cliente.membresia, cliente.cvv, cliente.numero_tarjeta, cliente.estatus) }} >Desactivar</Button>
                                    ) : (
                                        <Button className='me-1' variant="success" onClick={() => { activarC(cliente.idC, cliente.nombre, cliente.correo, cliente.cotrasenia, cliente.identificadorusuario, cliente.telefono, cliente.membresia, cliente.cvv, cliente.numero_tarjeta, cliente.estatus) }}>Activar</Button>
                                    )} 
                                    <Button variant="warning" onClick={() => { openActModal(cliente.idC, cliente.nombre, cliente.correo, cliente.cotrasenia, cliente.identificadorusuario, cliente.telefono, cliente.membresia, cliente.cvv, cliente.numero_tarjeta, cliente.estatus,cliente.idM,cliente.adquisicion,cliente.tipo_membresia) }}>Editar</Button>{' '}
                                </>                    
                            } 
                        />
                    );
                })}       
                
            </div>

            <Modal
                show={modalIsOpen}
                onHide={closeModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Registrar cliente
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                            <Row className="d-flex justify-content-center">
                                <Col md={6}>
                                    <Form>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="ms-1">Nombre(s):</Form.Label>
                                            <Form.Control type="text" placeholder="Nombre(s)" 
                                                value={nombre} onChange={(e) => setNombre(e.target.value)} required/>
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label className="ms-1">Apellido materno:</Form.Label>
                                            <Form.Control type="text" placeholder="Apellido materno" 
                                                value={ape_p} onChange={(e) => setApe_p(e.target.value)} required/>
                                        </Form.Group>
                                    </Form>
                                </Col>

                                <Col md={6}>
                                    <Form>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="ms-1">Apellido paterno:</Form.Label>
                                            <Form.Control type="text" placeholder="Apellido paterno" 
                                                value={ape_m} onChange={(e) => setApe_m(e.target.value)} required/>
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label className="ms-1">Número telefónico:</Form.Label>
                                            <Form.Control type="number" placeholder="Número telefónico" 
                                                value={num_telefonico} onChange={(e) => setNum(e.target.value)} maxLength="10" onInput={(e) => e.target.value = e.target.value.slice(0, 10)} required/>
                                        </Form.Group>
                                    </Form>
                                </Col>
                            </Row>
                            <Row className="d-flex justify-content-center">
                                <Col md={12}>
                                    <Form>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="ms-1">Correo electrónico :</Form.Label>
                                            <Form.Control type="email" inputMode="email" placeholder="example@correo.com" required 
                                                value={correo} onChange={(e) => setCorreo(e.target.value)}
                                                onInput={(e) => { validarEmail(e.target); }}/>
                                        </Form.Group>
                                    </Form>
                                </Col>
                            </Row>
                            
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                        <Button className="fw-bold" variant="warning" onClick={() => registrarMembresia()}>Siguiente</Button>{' '}
                </Modal.Footer>
            </Modal>

            <Modal
            show={modalMemIsOpen}
            onHide={closMemModal}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Registrar cliente
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                <Row className="d-flex justify-content-center mt-3">
                    <Col md={12}>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Tipo de membresía:</Form.Label>
                                <Form.Select required onChange={(e) => setMembresia(e.target.value)}>
                                    <option id="selected" value={null}>Selecciona una membresia</option>
                                    {membresias.map((membresia => (
                                        <option key={membresia.id} value={membresia.id}>{membresia.tipo_membresia}</option>
                                    )))}
                                </Form.Select>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center">
                    <Col md={6}>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Número de tarjeta:</Form.Label>
                                <Form.Control required type="number" placeholder="Número de tarjeta" 
                                    value={num_tarjeta} onChange={(e) => setNumTarjeta(e.target.value)} 
                                    onInput={(e) => {e.target.value = e.target.value.slice(0, 16);
                                        if (e.target.value < 0) e.target.value = "";
                                    }}/>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Tipo de tarjeta:</Form.Label>
                                <Form.Control required type="text" placeholder="Tipo de tarjeta" 
                                    value={tipo_tarjeta} onChange={(e) => setTipoTarjeta(e.target.value)} />
                            </Form.Group>
                        </Form>
                    </Col>

                    <Col md={6}>
                        <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>CVV:</Form.Label>
                            <Form.Control required type="number" placeholder="CVV"  value={cvv}
                                onChange={(e) => setCVV(e.target.value)} 
                                onInput={(e) => { e.target.value = e.target.value.slice(0, 3);
                                    if (e.target.value < 0) e.target.value = "";
                                    }}
                            />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Fecha de vencimiento:</Form.Label><br/>
                                <Form.Control required type="date"
                                value={fecha_venc} onChange={(e) => setFechaVenc(e.target.value)} />
                            </Form.Group>
                        </Form>
                    </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button className="fw-bold" variant="outline-secondary" onClick={regresarModal}>Regresar</Button>{' '}
                <Button className="fw-bold" variant="warning"  onClick={() => validar("POST")}>Registrar</Button>{' '}
            </Modal.Footer>
            </Modal>
            
            <Modal
                show={modalActIsOpen}
                onHide={closeModalAct}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Actualizar cliente
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                            <Row className="d-flex justify-content-center">
                                <Col md={6}>
                                    <Form>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="ms-1">Nombre(s):</Form.Label>
                                            <Form.Control type="text" placeholder="Nombre(s)" 
                                                value={nombre} onChange={(e) => setNombre(e.target.value)} required/>
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label className="ms-1">Apellido materno:</Form.Label>
                                            <Form.Control type="text" placeholder="Apellido materno" 
                                                value={ape_p} onChange={(e) => setApe_p(e.target.value)} required/>
                                        </Form.Group>
                                    </Form>
                                </Col>

                                <Col md={6}>
                                    <Form>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="ms-1">Apellido paterno:</Form.Label>
                                            <Form.Control type="text" placeholder="Apellido paterno" 
                                                value={ape_m} onChange={(e) => setApe_m(e.target.value)} required/>
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label className="ms-1">Número telefónico:</Form.Label>
                                            <Form.Control type="number" placeholder="Número telefónico" 
                                                value={num_telefonico} onChange={(e) => setNum(e.target.value)} maxLength="10" onInput={(e) => e.target.value = e.target.value.slice(0, 10)} required/>
                                        </Form.Group>
                                    </Form>
                                </Col>
                            </Row>
                            <Row className="d-flex justify-content-center">
                                <Col md={12}>
                                    <Form>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="ms-1">Correo electrónico :</Form.Label>
                                            <Form.Control type="email" inputMode="email" placeholder="example@correo.com" required 
                                                value={correo} onChange={(e) => setCorreo(e.target.value)}
                                                onInput={(e) => { validarEmail(e.target); }}/>
                                        </Form.Group>
                                    </Form>
                                </Col>
                            </Row>
                            
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                        <Button className="fw-bold" variant="warning" onClick={() => actualizarMembresia()}>Siguiente</Button>{' '}
                </Modal.Footer>
            </Modal>

            <Modal
            show={modalActMemIsOpen}
            onHide={closeActMemModal}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Actualizar cliente
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                <Row className="d-flex justify-content-center mt-3">
                    <Col md={12}>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Tipo de membresía:</Form.Label>
                                <Form.Select required onChange={(e) => setMembresia(e.target.value)}>
                                    <option id="selected" value={tipo_membresia}>Selecciona una membresia</option>
                                    {membresias.map((membresia => (
                                        <option key={membresia.id} value={membresia.id}>{membresia.tipo_membresia}</option>
                                    )))}
                                </Form.Select>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center">
                    <Col md={6}>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Número de tarjeta:</Form.Label>
                                <Form.Control required type="number" placeholder="Número de tarjeta" 
                                    value={num_tarjeta} onChange={(e) => setNumTarjeta(e.target.value)} 
                                    onInput={(e) => {e.target.value = e.target.value.slice(0, 16);
                                        if (e.target.value < 0) e.target.value = "";
                                    }}/>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Tipo de tarjeta:</Form.Label>
                                <Form.Control required type="text" placeholder="Tipo de tarjeta" 
                                    value={tipo_tarjeta} onChange={(e) => setTipoTarjeta(e.target.value)} />
                            </Form.Group>
                        </Form>
                    </Col>

                    <Col md={6}>
                        <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>CVV:</Form.Label>
                            <Form.Control required type="number" placeholder="CVV"  value={cvv}
                                onChange={(e) => setCVV(e.target.value)} 
                                onInput={(e) => { e.target.value = e.target.value.slice(0, 3);
                                    if (e.target.value < 0) e.target.value = "";
                                    }}
                            />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Fecha de vencimiento:</Form.Label><br/>
                                <Form.Control required type="date"
                                value={fecha_venc} onChange={(e) => setFechaVenc(e.target.value)} />
                            </Form.Group>
                        </Form>
                    </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button className="fw-bold" variant="outline-secondary" onClick={regresarModalAct}>Regresar</Button>{' '}
                <Button className="fw-bold" variant="warning"  onClick={() => validar("PUT")}>Actualizar</Button>{' '}
            </Modal.Footer>
            </Modal>

        </>
    )
}

export default Clientes;