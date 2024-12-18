import Container from "react-bootstrap/esm/Container";
import Menu from "./components/menu";
import Contenedor from "../Common/components/Contenedor";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2';

import axios from "axios";
import { Col, Form, Row, Table } from "react-bootstrap";

import check from '../Common/img/check.png'
import equis from '../Common/img/equis.png'
import logo from '../assets/logo.png'
import { useNavigate } from "react-router-dom";


function ClienteMembresias(){
    const navigate = useNavigate();
    const urlClientes = "http://localhost:8080/api/power/cliente/";
    const urlUpdate = "http://localhost:8080/api/power/cliente/updatem/";
    const urlMembresias = "http://localhost:8080/api/power/membresia/";
    const [modalShow, setModalShow] = React.useState(false);
    let usuarioIniciado = JSON.parse(localStorage.getItem("usuario"));
    
    const [ idCliente, setIdCliente ] = useState("");
    const [ nombre, setNombre ] = useState("");
    const [ num_telefonico, setNum ] = useState("");
    const [ correo, setCorreo ] = useState("");
    const [ membresia, setMembresia ] = useState([]);
    const [ membresias, setMembresias ] = useState([]);
    const [ contra, setContra ] = useState("");
    const [ num_tarjeta, setNumTarjeta ] = useState("");
    const [ cvv, setCVV ] = useState(0);
    const [ cvvPrev, setCVVPrev ] = useState(0);
    const [estatus, setEstatus]= useState(true);
    const [rol, setRol]= useState("");
    const [telefono, setTelefono]= useState("");
    const [identUsuario, setIdentUsuario] = useState("");
    const [vencimiento, setVencimiento]= useState("");

    const [cliente, setClientes]= useState([]);
    const [precio, setPrecio]=useState("");
    const [tipoMembresia, setTipoMembresia]= useState("");
    const [idMembresiaPrev, setIdMembresiaPrev]= useState("");
    const [idMembresia, setIdMembresia]=useState("");
    const [tipoTarjeta, setTipoTarjeta]= useState("");
    const [fecha_venc, setFecha_venc]= useState("");

    function closeModal() {
        setModalShow(false);
    }

    useEffect(() => {
      getCliente();
      getMembresia();
    }, []);
    
    const getCliente = async () => {
        const respuesta = await axios({
        method: 'GET',
        url: urlClientes 
    });
    setCliente(respuesta.data.data); 
    }

    const getMembresia = async () => {
        const respuesta = await axios({
        method: 'GET',
        url: urlMembresias 
        });

        setMembresias(respuesta.data.data);
        setMembresiasUser(respuesta.data.data); 
    }
    
    const setCliente = async (usuario) => {
        for (let i = 0; i < usuario.length; i++) {  
            const element = usuario[i];
            if(element.id == usuarioIniciado.id){
                setCorreo(element.correo);
                setIdCliente(element.id);
                setContra(element.cotrasenia);
                setEstatus(element.estatus);
                setIdentUsuario(element.identificadorusuario);
                setNombre(element.nombre);
                setNumTarjeta(element.numero_tarjeta);
                setCVVPrev(element.cvv);
                setRol(element.rol);
                setNum(element.telefono)
                setVencimiento(element.vencimiento)
                break;
            }
        }
    }

    const setMembresiasUser = async (membresia) => {

        for (let i = 0; i < membresia.length; i++) {
            const element = membresia[i];
            const cliente = element.clienteBeans.find(cliente => cliente.id === usuarioIniciado.id);
            if(cliente){
            setMembresia(element)
            setClientes(element.clienteBeans); 
            setPrecio(element.costo);
            setTipoMembresia(element.tipo_membresia);
            setIdMembresiaPrev(element.id);
            setIdMembresia(element.id);
            break;
            }
        }
    } 

    const limpiar=()=>{
        setCVV("")
        setFecha_venc("")
        setTipoTarjeta("")
    }
    
    const validar = (event) => {
        event.preventDefault();

        if (typeof membresia === "object") {
            Swal.fire("Sin modificaciones", "El tipo de membresía que intentas cambiar es el mismo que ya posees", "warning");
            return;
        }
        if (membresia==idMembresiaPrev) {
            Swal.fire("Sin modificaciones", "El tipo de membresía que intentas cambiar es el mismo que ya posees", "warning");
            return;
        }
        if ((!cvv || cvv==="") || cvv.length < 3) {
            Swal.fire("Campo CVV inválido", "Escribe un CVV válido de 3 digitos", "warning");
            return;
        }
        if (!tipoTarjeta || tipoTarjeta.trim() === "") {
            Swal.fire("Campo Tipo de tarjeta vacío", "Seleccione el tipo de tarjeta", "warning");
            return;
        }
        if (!fecha_venc || fecha_venc.trim() === "") {
            Swal.fire("Campo Fecha de vencimiento inválido", "Escribe la fecha de vencimiento", "warning");
            return;
        }
        const parametros = {
            identificadorusuario: identUsuario
        };
        enviarSolicitud('PUT',parametros, urlUpdate,membresia);
    };

    const enviarSolicitud = async(metodo,parametros, url,id_) => {
        url = url + id_;
        await axios({
            method: metodo,
            url: url,
            data: parametros
        }).then(async (result) =>{
            closeModal();
            if(result.data.data == "OK"){
                Swal.fire("¡Membresía modificada!","El membresía ha sido actualizada", "success");         
            }
            getMembresia();
            setIdMembresiaPrev(tipoMembresia);
            setCVVPrev(cvv);
            limpiar();
        })
        .catch(function (error) {
            Swal.fire("Error","Error en la Solicitud", "error");
        });
    }

    const enviarSolicitudCancelarMem = async(parametros) => {
        await axios({
            method: 'PUT',
            url: urlClientes+idCliente,
            data: parametros
        }).then(async (result) =>{
            if(result.data.data == "OK"){
                Swal.fire({
                    title: "Membresía cancelada",
                    text: "Esperamos que vuelvas pronto. Tu sesión será finalizada.",
                    iconHtml: `<img src="${logo}" style="width: 250px; height: auto;">`,
                    customClass: {
                        icon: 'no-border-icon'
                    },
                    didRender: () => {
                        const iconElement = document.querySelector('.no-border-icon');
                        if (iconElement) {
                            iconElement.style.border = 'none';
                            iconElement.style.boxShadow = 'none';
                            iconElement.style.padding = '0';
                        }
                    }
                }).then(()=>{
                    navigate("/");
                    localStorage.clear();
                })   
            }
            
        })
        .catch(function (error) {
            Swal.fire("Error en la Solicitud", "error");
        });
    }

    const activarDesactivarC = async () => {
        Swal.fire({
            title:'¿Desactivar membresía?',
            text:'Una vez cancelada la membresía no podrás acceder al sistema.',
            icon: 'warning',
            confirmButtonText:'Desactivar membresía',
            showCancelButton: true,
            cancelButtonText: 'Atrás',
        }).then(async (result) => {
            if (result.isConfirmed) {
                activarC(
                    idCliente,
                    nombre,
                    correo,
                    contra,
                    identUsuario,
                    num_telefonico,
                    cvvPrev,
                    num_tarjeta,
                );
            }
        });
    }
    const activarC = (id_, nombre_, correo_, contrasenia_, identificadorusuario_, telefono_, cvv_, numero_tarjeta_) => {
        var parametros = {
            nombre: nombre_,
            cotrasenia: contrasenia_,
            correo: correo_,
            identificadorusuario: identificadorusuario_,
            rol: 'Cliente',
            telefono: telefono_,
            estatus: false,
            cvv: parseInt(cvv_),
            numero_tarjeta: numero_tarjeta_,
        };
        
        enviarSolicitudCancelarMem(parametros);
    };   

    return(
        
        <>
        <Menu/>
        <div className="main-content pb-5">
                
            <h1 className="d-flex justify-content-center">Membresía</h1>
            <div style={{ width: '99vw' }}>
                <Contenedor 
        
                title1={'Nombre del cliente'}
                text1={nombre} 
                title2={'Tipo de Membresía'}
                text2={tipoMembresia} 
                title3={'Renovación'}
                text3={vencimiento}
                title4={'Estado'}
                acciones={
                    <>
                        <Button variant="danger" onClick={() => activarDesactivarC()}>Desactivar membresía</Button>{' '}
                        <Button variant="outline-warning" style={{width:'92%'}} className="fw-bold" onClick={() => setModalShow(true)}>Cambiar membresía </Button>{' '}
                        
                    </>                    
                } />
                
                <div className='mt-4 d-flex justify-content-center'>
                    <Table className='table-separated-columns' style={{ width: '80%' }}>
                        <thead>
                            <th></th>
                            <th className='plus_th fs-3'>Plus</th>
                            <th className='planesth fs-3'>Medium</th>
                            <th className='planesth fs-3'>Estándar</th>
                        </thead>
                        <tbody>
                            <tr style={{ border: 0 }}>
                                <td className='fs-4'>Acceso General al gimnasio</td> 
                                <td className='plus' style={{ textAlign: 'center' }}> <img src={check} draggable="false" alt='check' className='iconimage' /> </td>    
                                <td className='planes' style={{ textAlign: 'center' }}> <img src={check} draggable="false" alt='check' className='iconimage' /> </td>   
                                <td className='planes' style={{ textAlign: 'center' }}> <img src={check} draggable="false" alt='check' className='iconimage' /> </td>                          
                            </tr>
                            <tr style={{ border: 0 }}>
                                <td className='fs-4'>Acceso al área de máquinas</td>
                                <td className='plus' style={{ textAlign: 'center' }}> <img src={check} draggable="false" alt='check' className='iconimage' /> </td>   
                                <td className='planes' style={{ textAlign: 'center' }}> <img src={check} draggable="false" alt='check' className='iconimage' /> </td>   
                                <td className='planes' style={{ textAlign: 'center' }}> <img src={check} draggable="false" alt='check' className='iconimage' /> </td>   
                            </tr>
                            <tr style={{ border: 0 }}>
                                <td className='fs-4'>Acceso a clases especiales</td>
                                <td className='plus' style={{ textAlign: 'center' }}> <img src={check} draggable="false" alt='check' className='iconimage' /> </td>   
                                <td className='planes' style={{ textAlign: 'center' }}> <img src={check} draggable="false" alt='check' className='iconimage' /> </td>   
                                <td className='planes' style={{ textAlign: 'center' }}> <img src={equis} draggable="false" alt='equis' className='iconimage2' /> </td>
                            </tr>
                            <tr style={{ border: 0 }}>
                                <td className='fs-4'>Reserva tu asistencia a clases</td>
                                <td className='plus' style={{ textAlign: 'center' }}> <img src={check} draggable="false" alt='check' className='iconimage' /> </td>   
                                <td className='planes' style={{ textAlign: 'center' }}> <img src={check} draggable="false" alt='check' className='iconimage' /> </td> 
                                <td className='planes' style={{ textAlign: 'center' }}> <img src={equis} draggable="false" alt='equis' className='iconimage2' /> </td>  
                            </tr>
                            <tr style={{ border: 0 }}>
                                <td className='fs-4'>Acceso exclusivo al sauna</td>
                                <td className='plus' style={{ textAlign: 'center' }}> <img src={check} draggable="false" alt='check' className='iconimage' /> </td>   
                                <td className='planes' style={{ textAlign: 'center' }}> <img src={equis} draggable="false" alt='equis' className='iconimage2' /> </td>
                                <td className='planes' style={{ textAlign: 'center' }}> <img src={equis} draggable="false" alt='equis' className='iconimage2' /> </td>   
                            </tr>
                            <tr>
                                <td style={{ border: 0 }}></td>
                                <td className='plus centerText ' style={{ border:0, borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px'}}>
                                    <div className='fw-bold fs-4 mb-1'>Desde</div>
                                    <div className='fw-bold fs-4 mb-2'>$1,500.00</div>
                                </td>
                                <td className='centerText planes2'>
                                    <div className='fw-bold fs-4 mb-1'>Desde</div>
                                    <div className='fw-bold fs-4 mb-2'>$1,000.00</div>
                                </td>
                                <td className='planes2 centerText'>
                                    <div className='fw-bold fs-4 mb-1'>Desde</div>
                                    <div className='fw-bold fs-4 mb-2'>$800.00</div>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>  
            </div>
        
        </div>

            <Modal
              show={modalShow}
              onHide={closeModal}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Cambiar nivel de membresía
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h5 className="ms-2 ps-1">Nivel actual de membresía: {tipoMembresia}</h5>
                <Container>
                  <Row className="d-flex justify-content-center mt-3">
                    <Col md={12}>
                          <Form>
                              <Form.Group className="mb-3">
                                  <Form.Label className="fw-bold" >Número de cuenta:</Form.Label><br/>
                                  <Form.Label>{num_tarjeta}</Form.Label>
                                  
                              </Form.Group>
                          </Form>
                      </Col>
                  </Row>
                  <Row className="d-flex justify-content-center">
                      <Col md={6}>
                          <Form>
                              <Form.Group className="mb-3">
                                  <Form.Label className="fw-bold">Tipo de membresía:</Form.Label>
                                  <Form.Select required onChange={(e) => setMembresia(e.target.value)} defaultValue={idMembresia}>
                                    {membresias.map((membresia => (
                                        <option key={membresia.id} value={membresia.id}>{membresia.tipo_membresia}</option>
                                    )))}
                                </Form.Select>
                                  
                              </Form.Group>
    
                              <Form.Group className="mb-3">
                                  <Form.Label className="fw-bold">Tipo de tarjeta:</Form.Label>
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
                                  <Form.Label className="fw-bold">CVV:</Form.Label>
                                  <Form.Control type="number" inputMode="number" placeholder="CVV"
                                  onChange={(e) => setCVV(e.target.value)} required
                                  onInput={(e) => { e.target.value = e.target.value.slice(0, 3);
                                    if (e.target.value < 0) e.target.value = "";
                                    }}/>
                              </Form.Group>
    
                              <Form.Group className="mb-3">
                                  <Form.Label className="fw-bold">Fecha de vencimiento:</Form.Label><br/>
                                  <Form.Control type="date" onChange={(e) => setFecha_venc(e.target.value)} required/>
                              </Form.Group>
                          </Form>
                      </Col>
                    </Row>
    
                </Container>
              </Modal.Body>
              <Modal.Footer>
              <Button onClick={closeModal} variant="outline-secondary">Cancelar</Button>
              <Button variant="success" onClick={(e) => validar(e)}>
                  Cambiar membresía
                </Button>
                
              </Modal.Footer>
            </Modal>

        </>
    )
}

export default ClienteMembresias;