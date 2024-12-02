import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Swal from "sweetalert2";


import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Menu from "./components/Menu";
import Contenedor from "../Common/components/Contenedor"

 
//CSS
import './css/Clientes.css'

//Imágenes
import cross from './img/cross.png'
import lupa from './img/lupa.png'
import { Col, Container, InputGroup, Row } from "react-bootstrap";

function Clientes () {
    const urlClientes = "http://localhost:8080/api/power/cliente/";
    const urlMembresias = "http://localhost:8080/api/power/membresia/";
    const [ clientes, setClientes ] = useState([]);
    const [ membresias, setMembresias ] = useState([]);
    const [ membresiaCliente, setMembresiaCliente ] = useState([]);
    const [ filteredClientes, setFilteredClientes ] = useState([]);

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
    const [ idMembresiaPrev, setIdMembresiaPrev ] = useState("");
    const [ estatus, setEstatus ] = useState(true);
    const [adquisicion, setAdquisicion]= useState("");
    const [tipo_membresia, setTipo_membresia]= useState("");

    const [ emailStatus, setEmailStatus ] = useState(false);

    let user = JSON.parse(localStorage.getItem("Cliente"));

    useEffect(() => {     
        getClientes();
        getMembresias();
    }, [])

    const getClientes = async () => {
        const respuesta = await axios({
            method: 'GET',
            url: urlClientes,
        });
        setClientes(respuesta.data.data);
    }

    const getMembresias = async () => {
        const respuesta = await axios({
            method: 'GET',
            url: urlMembresias,
        });
        setMembresias(respuesta.data.data);
        setClienteMembresias(respuesta.data.data);
    }

    const setClienteMembresias = async (membresiasB) => {
    
        if (!Array.isArray(membresiasB)) {
            membresiasB = [membresiasB];
        }
    
        const clientesConMembresia = [];
    
        for (const membresia of membresiasB) {
            if (membresia.clienteBeans && membresia.clienteBeans.length > 0) {
                for (const cliente of membresia.clienteBeans) {
                    const clienteMembresia = {
                        // Cliente
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
                        tipo_tarjeta: cliente.tipo_tarjeta,
                        // Membresía
                        idM: membresia.id,
                        tipo_membresia: membresia.tipo_membresia,
                        costo: membresia.costo,
                    };
                    clientesConMembresia.push(clienteMembresia);
                }
            }
        }
    
        setMembresiaCliente(clientesConMembresia);
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
        setFechaVenc(null)
        setTipoTarjeta(null);
        setTipo_membresia(null)
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
        validarPrevEmail(correo_);
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
    const validar = (metodo,event) => {
        event.preventDefault();
    
        if (!nombre || nombre.trim() === "") {
            Swal.fire("Campo Nombre inválido", "Escribe el nombre del cliente.", "warning");
            return;
        }
        if (!num_telefonico || num_telefonico.trim() === "" || num_telefonico.length < 10) {
            Swal.fire("Campo Teléfono inválido", "Escribe un número de teléfono válido para el cliente.", "warning");
            return;
        }
        if (!correo || correo.trim() === "" || !emailStatus) {
            Swal.fire("Campo Correo inválido", "Escribe un correo válido del cliente.", "warning");
            return;
        }
        if (!membresia || membresia=="" && metodo=="POST") {
            Swal.fire("Sin membresía seleccionada", "Seleccione un tipo de membresía.", "warning");
            return;
        }
        if (((!num_tarjeta || num_tarjeta.trim() === "") || num_tarjeta.length < 16) && metodo=="POST") {
            Swal.fire("Campo Número de tarjeta inválido", "Escribe un número de tarjeta válido de 16 dígitos.", "warning");
            return;
        }
        if (((!cvv || cvv==="") || cvv.length < 3) && metodo=="POST") {
            Swal.fire("Campo CVV inválido", "Escribe un CVV válido de 3 digitos.", "warning");
            return;
        }
        if ((!tipo_tarjeta || tipo_tarjeta.trim() === "") && metodo=="POST") {
            Swal.fire("Campo Tipo de tarjeta vacío", "Seleccione el tipo de tarjeta.", "warning");
            return;
        }
        if ((!fecha_venc || fecha_venc.trim() === "") && metodo=="POST") {
            Swal.fire("Campo Fecha de vencimiento inválido", "Escribe la fecha de vencimiento.", "warning");
            return;
        }
        const parametros = {
            nombre,
            cotrasenia: contra == null ? `${(Math.random().toString().slice(2, 7))}` : contra,
            correo,
            identificadorusuario: identificador == null ? `PZC_${(Math.random().toString().slice(2, 7))}` : identificador,
            rol: 'Cliente',
            telefono: num_telefonico,
            estatus,
            cvv: cvv,
            numero_tarjeta: num_tarjeta,
            adquisicion: "",
            vencimiento: "",
            membresia: {
                id: idMembresia == null ? parseInt(membresia, 10) : idMembresia
            }
        };
        
        enviarSolicitud(metodo, parametros, urlClientes);
    };
    
    const activarDesactivarC = async (cliente, desactivar) => {
        Swal.fire({
            title: desactivar ? '¿Desactivar Cliente?' : '¿Activar Cliente?',
            text: desactivar
                ? `El Cliente ${cliente.nombre} será desactivado.`
                : `El Cliente ${cliente.nombre} será activado.`,
            icon: 'warning',
            confirmButtonText: desactivar ? 'Desactivar Cliente' : 'Activar Cliente',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
        }).then(async (result) => {
            if (result.isConfirmed) {
                activarC(
                    cliente.idC,
                    cliente.nombre,
                    cliente.correo,
                    cliente.cotrasenia,
                    cliente.identificadorusuario,
                    cliente.telefono,
                    cliente.membresia,
                    cliente.cvv,
                    cliente.numero_tarjeta,
                    cliente.estatus
                );
    
                Swal.fire({
                    title: desactivar ? 'Cliente desactivado' : 'Cliente activado',
                    text: desactivar
                        ? `El Cliente ${cliente.nombre} ha sido desactivado con éxito.`
                        : `El Cliente ${cliente.nombre} ha sido activado con éxito.`,
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                });
            }
        });
    }
    

    const activarC = (id_, nombre_, correo_, contrasenia_, identificadorusuario_, telefono_, membresia_, cvv_, numero_tarjeta_, estatus_) => {
        var parametros = {
            nombre: nombre_,
            cotrasenia: contrasenia_,
            correo: correo_,
            identificadorusuario: identificadorusuario_,
            rol: 'Cliente',
            telefono: telefono_,
            estatus: !estatus_,
            cvv: parseInt(cvv_),
            numero_tarjeta: numero_tarjeta_,
        };
        
        enviarSolicitud("PUT", parametros, urlClientes, id_);
    };
    

    const enviarSolicitud = async(metodo, parametros, url, id_) => {
        if(metodo != "POST"){
            (id_ == undefined) ? url = url + idCliente : url = url + id_;
        } 
        await axios({
            method: metodo,
            url: url,
            data: parametros
        }).then(async (result) =>{
            closMemModal();
            closeModal();
            closeModalAct();
            closeActMemModal();
            
            if(result.data.status == "OK" && metodo=="POST"){
                Swal.fire("Cliente registrado","Cliente registrado correctamente", "success");         
            } 
            else if(result.data.status == "OK" && metodo=="PUT"){
                Swal.fire("Cliente actualizado","Cliente Actualizado correctamente", "success");         
            }             
            await getClientes();
            await setClienteMembresias(getMembresias());
            
            setFilteredClientes(membresiaCliente.filter(cliente => 
                (cliente.nombre && cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (cliente.identificadorUsuario && cliente.identificadorUsuario.toLowerCase().includes(searchTerm.toLowerCase()))
            ));
            
        })
        .catch(function (error) {
            Swal.fire("Error en la Solicitud", "error");
        });
    }

    //Filtrado
    const [searchTerm, setSearchTerm] = useState('');

    // Filtrar membresia
    useEffect(() => {
        setFilteredClientes(
            membresiaCliente.filter(cliente =>
                (cliente.nombre && cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (cliente.identificadorusuario && cliente.identificadorusuario.toLowerCase().includes(searchTerm.toLowerCase()))
            )
        );
    }, [membresiaCliente, searchTerm]);
    

    // Actualizar búsqueda
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    //Validar e-mail
    const validarEmail = (e) => {
        let campo = e;
            
        let emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        
        if (emailRegex.test(campo.value)) {  
          setEmailStatus(true);
        } else {
          setEmailStatus(false);
        }
    }

    //Validar e-mail pero en actualiz de correo
    const validarPrevEmail = (correo) => {
        let emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        
        if(emailRegex.test(correo)) {
          setEmailStatus(true);
        }else {
          setEmailStatus(false);
        }
    }

    const handleInputChange = (e) => {
    let value = e.target.value;
    
    // Elimina cualquier carácter que no sea numérico o "/"
    value = value.replace(/[^0-9]/g, "");
    
    // Inserta automáticamente "/" después de los primeros dos dígitos
    if (value.length > 2) {
        value = value.slice(0, 2) + "/" + value.slice(2);
    }
    
    // Limita la longitud total a 5 caracteres
    value = value.slice(0, 5);
    
    setFechaVenc(value); // Actualiza el estado con el valor formateado
    };
      

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
                    style={{ width: '2vh', height: '2vh',marginTop:-4}} draggable="false"                    
                    />&nbsp;&nbsp;Agregar cliente</Button>{' '}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '30%' }}>
                        <img src={lupa} draggable="false" alt="Buscar" style={{ width: '4vh', height: '3vh' }} />
                        <Form.Control type="text" placeholder="Buscar clientes" value={searchTerm} onChange={handleSearchChange} 
                            style={{ backgroundColor: 'rgb(217, 217, 217)', borderRadius: '12px',}}/>
                    </div>
                </div>
            

                <h1 className="d-flex justify-content-center mt-5">Clientes</h1>

                {filteredClientes.map((cliente, i) => {
                    return (
                        <Contenedor 
                            key={i}
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
                                        <Button className="me-1" variant="danger" onClick={() => activarDesactivarC(cliente, true)}>
                                            Desactivar </Button>
                                    ) : (
                                        <Button className="me-1" variant="success" onClick={() => activarDesactivarC(cliente, false)}>
                                            Activar </Button>
                                    )}
                                    <Button variant="warning" onClick={() => {limpiar(); openActModal(cliente.idC, cliente.nombre, cliente.correo, cliente.cotrasenia, cliente.identificadorusuario, cliente.telefono, cliente.membresia, cliente.cvv, cliente.numero_tarjeta, cliente.estatus,cliente.idM,cliente.adquisicion,cliente.tipo_membresia) }}>Editar</Button>{' '}
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
                                <Col md={8}>
                                    <Form>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="ms-1 fw-bold">Nombre completo:</Form.Label>
                                            <Form.Control type="text" placeholder="Nombre" 
                                                 onChange={(e) => setNombre(e.target.value)} value={nombre} required/>
                                        </Form.Group>
                                    </Form>
                                </Col>

                                <Col md={4}>
                                    <Form>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="ms-1 fw-bold">Número telefónico:</Form.Label>
                                            <Form.Control type="number" placeholder="Número telefónico"  value={num_telefonico}
                                                onChange={(e) => setNum(e.target.value)} maxLength="10"
                                                onInput={(e) => {e.target.value = e.target.value.slice(0, 10);
                                                    if (e.target.value < 0) e.target.value = "";
                                                }}/>
                                        </Form.Group>
                                    </Form>
                                </Col>
                            </Row>
                            <Row className="d-flex justify-content-center">
                                <Col md={12}>
                                    <Form>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="ms-1 fw-bold">Correo electrónico :</Form.Label>
                                            <Form.Control type="email" inputMode="email" placeholder="example@correo.com" required 
                                                value={correo}
                                                onChange={(e) => setCorreo(e.target.value)}
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
                                <Form.Label className="ms-1 fw-bold">Tipo de membresía:</Form.Label>
                                <Form.Select required onChange={(e) => {setMembresia(e.target.value); console.log(membresia)}}>
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
                                <Form.Label className="ms-1 fw-bold">Número de tarjeta:</Form.Label>
                                <Form.Control required type="number" placeholder="Número de tarjeta"
                                    value={num_tarjeta}
                                    onChange={(e) => setNumTarjeta(e.target.value)} 
                                    onInput={(e) => {e.target.value = e.target.value.slice(0, 16);
                                        if (e.target.value < 0) e.target.value = "";
                                    }}/>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label className="ms-1 fw-bold">Tipo de tarjeta:</Form.Label>
                                <Form.Select required onChange={(e) => setTipoTarjeta(e.target.value)}>
                                    <option value="">Selecciona tu banco</option>
                                    <option value="BBVA">BBVA</option>
                                    <option value="Banamex">Banamex</option>
                                    <option value="Banorte">Banorte</option>
                                    <option value="Santander">Santander</option>
                                    <option value="HSBC">HSBC</option>
                                    <option value="Scotiabank">Scotiabank</option>
                                    <option value="Inbursa">Inbursa</option>
                                    <option value="Banco Azteca">Banco Azteca</option>
                                    <option value="BanCoppel">BanCoppel</option>
                                    <option value="Afirme">Afirme</option>
                                    <option value="Banco del Bienestar">Banco del Bienestar</option>
                                </Form.Select>
                            </Form.Group>
                        </Form>
                    </Col>

                    <Col md={6}>
                        <Form>
                        <Form.Group className="mb-3">
                            <Form.Label className="ms-1 fw-bold">CVV:</Form.Label>
                            <Form.Control required type="number" placeholder="CVV"
                                value={cvv}
                                onChange={(e) => setCVV(e.target.value)} 
                                onInput={(e) => { e.target.value = e.target.value.slice(0, 3);
                                    if (e.target.value < 0) e.target.value = "";
                                    }}
                            />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label className="ms-1 fw-bold">Fecha de vencimiento:</Form.Label><br/>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="MM/YY"
                                    maxLength={5}
                                    value={fecha_venc}
                                    onChange={(e) => handleInputChange(e)}
                                />
                            </Form.Group>
                        </Form>
                    </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button className="fw-bold" variant="outline-secondary" onClick={regresarModal}>Regresar</Button>{' '}
                <Button className="fw-bold" variant="warning"  onClick={(e) => validar("POST",e)}>Registrar</Button>{' '}
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
                                <Col md={8}>
                                    <Form>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="ms-1 fw-bold">Nombre completo:</Form.Label>
                                            <Form.Control type="text" placeholder="Nombre" 
                                                value={nombre} onChange={(e) => setNombre(e.target.value)} required/>
                                        </Form.Group>
                                    </Form>
                                </Col>

                                <Col md={4}>
                                    <Form>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="ms-1 fw-bold">Número telefónico:</Form.Label>
                                            <Form.Control type="number" placeholder="Número telefónico" 
                                                value={num_telefonico} onChange={(e) => setNum(e.target.value)} maxLength="10" 
                                                onInput={(e) => {e.target.value = e.target.value.slice(0, 10);
                                                    if (e.target.value < 0) e.target.value = "";
                                                }}/>
                                        </Form.Group>
                                    </Form>
                                </Col>
                            </Row>
                            <Row className="d-flex justify-content-center">
                                <Col md={8}>
                                    <Form>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="ms-1 fw-bold">Correo electrónico:</Form.Label>
                                            <Form.Control type="email" inputMode="email" placeholder="example@correo.com" required 
                                                value={correo} onChange={(e) => setCorreo(e.target.value)}
                                                onInput={(e) => { validarEmail(e.target); }}/>
                                        </Form.Group>
                                    </Form>
                                </Col>
                                <Col md={4}>
                                    <Form>
                                        <Form.Label className="ms-1 fw-bold">Contraseña:</Form.Label><br/>
                                        <Form.Label className="pt-1 ps-1">{contra}</Form.Label>
                                    </Form>
                                </Col>
                            </Row>
                            
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="fw-bold" variant="warning"  onClick={(e) => validar("PUT",e)}>Actualizar</Button>{' '}
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Clientes;