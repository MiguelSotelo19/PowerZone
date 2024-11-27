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

function ModalMejorar({ show, onHide, datosCliente,datosMembresia }) {
    return (
        <Modal
          show={show}
          onHide={onHide}
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
            <h5>Nivel actual de membresía: {datosMembresia.tipo_membresia}</h5>
            <Container>
              <Row className="d-flex justify-content-center mt-3">
                <Col md={12}>
                      <Form>
                          <Form.Group className="mb-3">
                              <Form.Label>Número de cuenta:</Form.Label>
                              <Form.Control type="number" placeholder="Número de cuenta (16 digitos)" 
                              onInput={(e) => e.target.value = e.target.value.slice(0, 16)} required  />
                              
                          </Form.Group>
                      </Form>
                  </Col>
              </Row>
              <Row className="d-flex justify-content-center">
                  <Col md={6}>
                      <Form>
                          <Form.Group className="mb-3">
                              <Form.Label>Tipo de membresía:</Form.Label>
                              <Form.Select type="text" placeholder="Nombre del cliente">
                                <option value="Plus">Plus</option>
                                <option value="Medium">Medium</option>
                                <option value="Estandar">Estándar</option>
                              </Form.Select>
                              
                          </Form.Group>

                          <Form.Group className="mb-3">
                              <Form.Label>Tipo de tarjeta:</Form.Label>
                              <Form.Control type="number" placeholder="1112223333"
                              />
                          </Form.Group>
                      </Form>
                  </Col>

                  <Col md={6}>
                      <Form>
                          <Form.Group className="mb-3">
                              <Form.Label>CVV:</Form.Label>
                              <Form.Control type="number" inputMode="number" placeholder="123"/>
                          </Form.Group>

                          <Form.Group className="mb-3">
                              <Form.Label>Fecha de vencimiento:</Form.Label><br/>
                              <Form.Control type="date"></Form.Control>
                          </Form.Group>
                      </Form>
                  </Col>
                </Row>

            </Container>
            {/*tengo planeado poner el <Planes/> aqui, pero sale con los botones de adquirir y asi y pues no xd*/}
          </Modal.Body>
          <Modal.Footer>
          <Button 
              variant="primary" 
              onClick={() => Swal.fire({
                  title: 'Nivel de membresía modificado',
                  icon: 'success',
                  confirmButtonText: 'Aceptar'
              })}
            >
              Cambiar membresía
            </Button>
            <Button onClick={onHide}>Cancelar</Button>
          </Modal.Footer>
        </Modal>
    );
}

function ClienteMembresias(){
    const urlClientes = "http://localhost:8080/api/power/cliente/";
    const urlMembresias = "http://localhost:8080/api/power/membresia/";
    const [modalShow, setModalShow] = React.useState(false);
    let usuarioIniciado = JSON.parse(localStorage.getItem("usuario"));
    //cliente
    const [ idCliente, setIdCliente ] = useState("");
    const [ nombre, setNombre ] = useState("");
    const [ num_telefonico, setNum ] = useState("");
    const [ correo, setCorreo ] = useState("");
    const [ membresia, setMembresia ] = useState([]);
    const [ contra, setContra ] = useState("");
    const [ num_tarjeta, setNumTarjeta ] = useState("");
    const [ cvv, setCVV ] = useState(0);
    const [estatus, setEstatus]= useState(true);
    const [rol, setRol]= useState("");
    const [telefono, setTelefono]= useState("");
    const [identUsuario, setIdentUsuario] = useState("")
    //Membresia
    const [cliente, setClientes]= useState([]);
    const [precio, setPrecio]=useState("");
    const [tipoMembresia, setTipoMembresia]= useState("");
    const [idMembresia, setIdMembresia]=useState("");
    
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
    }
    
    const setCliente = async (usuario) => {
        for (let i = 0; i < usuario.length; i++) {  
            const element = usuario[i];
            if(element.id == usuarioIniciado.id){
                setCorreo(element.correo);
                setIdCliente(element.id);
                setContra(element.cotrasenia);
                setCVV(element.cvv);
                setEstatus(element.estatus);
                setIdentUsuario(element.identificadorusuario);
                setNombre(element.nombre);
                setNumTarjeta(element.numero_tarjeta);
                setRol(element.rol);
                setNum(element.telefono)
                break;
            }
        }
    }

    const setMembresias = async (membresia) => {

        for (let i = 0; i < membresia.length; i++) {
            const element = membresia[i];
            const cliente = element.clienteBeans.find(cliente => cliente.id === usuarioIniciado.id);
            if(cliente){
            setMembresia(element)
            setClientes(element.clienteBeans); 
            setPrecio(element.costo);
            setTipoMembresia(element.tipo_membresia);
            setIdMembresia(element.id)
            break;
            }
        }
    } 
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
                text3="2024/01/01"
                title4={'Estado'}
                acciones={
                    <>
                        <Button className='me-1' variant="success">Activo</Button>{' '}
                        <Button variant="info" onClick={() => setModalShow(true)}>Cambiar membresía</Button>{' '}
                        
                    </>                    
                } />
                
                <ModalMejorar
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                            datosCliente={cliente} datosMembresia={membresia}
                />
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
        </>
    )
}

export default ClienteMembresias;