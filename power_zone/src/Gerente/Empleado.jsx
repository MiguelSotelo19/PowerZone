import React, { useEffect, useState } from "react";
import axios from 'axios';
import { show_alerta } from "../Common/js/funciones";
import Modal from 'react-bootstrap/Modal';
import Swal from "sweetalert2";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Menu from "./components/Menu"
import Contenedor from "../Common/components/Contenedor"

import './css/Clientes.css'

import cross from './img/cross.png'
import lupa from './img/lupa.png'
import { Col, Container, Row } from "react-bootstrap";

function Empleados() {
    const urlEmpleados = "http://localhost:8080/api/power/empleado/";
    const [ empleados, setEmpleados ] = useState([]);
    const [ emailStatus, setEmailStatus ] = useState(false);

    const [ idEmp, setIdEmp] = useState(0);
    const [ nombre, setNombre ] = useState("");
    const [ num_telefonico, setNum ] = useState("");
    const [ correo, setCorreo ] = useState("");
    const [ contra, setContra ] = useState("");

    useEffect(() => {     
        getEmpleados();
    }, [])

    const getEmpleados = async () => {
        const respuesta = await axios({
            method: 'GET',
            url: urlEmpleados,
        });
        setEmpleados(respuesta.data.data);
    }

    const validar = (metodo) => {
        event.preventDefault();

        var parametros;
        if(!nombre || nombre.trim() === ""){
            show_alerta("Escribe el nombre del empleado", "warning");
        } else if((!num_telefonico || num_telefonico.trim() === "" )|| num_telefonico.length < 10){
            show_alerta("Escribe el número de teléfono del empleado", "warning");
        } else if((!correo ||correo.trim() === "") || emailStatus==false){
            show_alerta("Escribe el correo del empleado en el formato requerido", "warning");
        } else {
            parametros = {
                nombre: nombre,
                contrasenia: `PowerPassEmp_${Math.random().toString(36).substring(2, 10)}`,
                correo: correo,
                identificadorusuario: `PowerEmp_${Math.random().toString(36).substring(2, 11)}`,
                rol: 'Empleado',
                telefono: num_telefonico,
            }

            enviarSolicitud(metodo, parametros, urlEmpleados);
        }
    }

    const enviarSolicitud = async(metodo, parametros, url, id_) => {
        event.preventDefault();
    
        if(metodo != "POST"){
            (id_ == undefined) ? url = url + idEmp : url = url + id_;
        } 
        await axios({
            method: metodo,
            url: url,
            data: parametros
        }).then(function (result) {
            if(result.data.status == "OK" && metodo=="POST"){
                Swal.fire("Empleado registrado","Empleado registrado correctamente", "success");         
            } 
            else if(result.data.status == "OK" && metodo=="PUT"){
                Swal.fire("Empleado actualizado","Empleado Actualizado correctamente", "success");         
            } 
            closeModal();
            closeModalAct();

            getEmpleados();
        })
        .catch(function (error) {
            show_alerta("Error en la Solicitud", "error");
        });
    }

    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modalActIsOpen, setActIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function openActModal(empleado_id, nombre_, telefono_, correo_, contrasenia_) {
        setIdEmp(empleado_id);
        setNombre(nombre_);
        setNum(telefono_);
        setCorreo(correo_);
        setContra(contrasenia_);

        setActIsOpen(true);
    }

    function closeModalAct() {
        setActIsOpen(false);
    }

    const limpiar = () => {
        setIdEmp(null);
        setNombre(null);
        setCorreo(null);
        setContra(null);
        setNum(null);
    }

    const [searchTerm, setSearchTerm] = useState('');

    const filteredEmpleados = empleados.filter(empleado => 
        empleado.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        empleado.correo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        empleado.telefono.toString().includes(searchTerm) 
    );

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const activarC = (id_, nombre_, telefono_, correo_, cotrasenia_, estatus_) => {
        Swal.fire({
            title: estatus_ ? '¿Desactivar empleado?' : '¿Activar empleado?',
            text: estatus_
                ? `El empleado ${nombre_} será desactivado.`
                : `El empleado ${nombre_} será activado.`,
            icon: 'warning',
            confirmButtonText: estatus_ ? 'Desactivar empleado' : 'Activar empleado',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
        }).then(async (result) => {
            if (result.isConfirmed){
                var parametros = {
                    nombre: nombre_,
                    contrasenia: cotrasenia_,
                    correo: correo_,
                    rol: 'Empleado',
                    telefono: telefono_,
                    estatus: estatus_ == true ? false : true,
                }
        
                enviarSolicitud("PUT", parametros, urlEmpleados, id_);
            }
        });
    }
    const validarEmail = (e) => {
        let campo = e;
            
        let emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        
        if (emailRegex.test(campo.value)) {  
          setEmailStatus(true);
        } else {
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
                    style={{ width: '2vh', height: '2vh',marginTop:-4}} draggable="false"                    
                    />&nbsp;&nbsp;Agregar empleado</Button>{' '}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '30%' }}>
                        <img src={lupa} draggable="false" alt="Buscar" style={{ width: '4vh', height: '3vh' }} />
                        <Form.Control type="text" placeholder="Buscar empleado" value={searchTerm} onChange={handleSearchChange} 
                            style={{ backgroundColor: 'rgb(217, 217, 217)', borderRadius: '12px',}}/>
                    </div>
                </div>

                <h1 className="d-flex justify-content-center mt-5">Empleados</h1>

                {filteredEmpleados.map((empleado, i) => (
                    <Contenedor 
                    key={i}
                    title1={'Nombre del empleado'}
                    text1={empleado.nombre} 
                    title2={'Correo'}
                    text2={empleado.correo} 
                    title3={'Teléfono'}
                    text3={empleado.telefono} 
                    title4={'Estado'}
                    acciones={
                        <>
                            {empleado.estatus ? (
                                        <Button className='me-1' variant="danger" onClick={() => { activarC(empleado.id, empleado.nombre, empleado.telefono, empleado.correo, empleado.cotrasenia, empleado.estatus) }} >Desactivar</Button>
                                    ) : (
                                        <Button className='me-1' variant="success" onClick={() => { activarC(empleado.id, empleado.nombre, empleado.telefono, empleado.correo, empleado.cotrasenia, empleado.estatus) }}>Activar</Button>
                                    )} 
                            <Button variant="warning" onClick={() => openActModal(empleado.id, empleado.nombre, empleado.telefono, empleado.correo, empleado.cotrasenia)}>Editar</Button>{' '}
                        </>                    
                    } />
                ))}
                                
                
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
                        Registrar empleado
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                            <Row className="d-flex justify-content-center">
                                <Col md={8}>
                                    <Form>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="ms-1">Nombre completo:</Form.Label>
                                            <Form.Control type="text" placeholder="Nombre" 
                                                 onChange={(e) => setNombre(e.target.value)} required/>
                                        </Form.Group>
                                    </Form>
                                </Col>

                                <Col md={4}>
                                    <Form>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="ms-1">Número telefónico:</Form.Label>
                                            <Form.Control type="number" placeholder="Número telefónico" 
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
                                            <Form.Label className="ms-1">Correo electrónico :</Form.Label>
                                            <Form.Control type="email" inputMode="email" placeholder="example@correo.com" required 
                                                onChange={(e) => setCorreo(e.target.value)}
                                                onInput={(e) => { validarEmail(e.target); }}/>
                                        </Form.Group>
                                    </Form>
                                </Col>
                            </Row>
                            
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                        <Button className="fw-bold" variant="warning" onClick={(e) => validar("POST",e)}>Registrar</Button>{' '}
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
                                            <Form.Label className="ms-1">Nombre completo:</Form.Label>
                                            <Form.Control type="text" placeholder="Nombre" 
                                                value={nombre} onChange={(e) => setNombre(e.target.value)} required/>
                                        </Form.Group>
                                    </Form>
                                </Col>

                                <Col md={6}>
                                    <Form>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="ms-1">Número telefónico:</Form.Label>
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
                                <Col md={6}>
                                    <Form>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="ms-1">Correo electrónico :</Form.Label>
                                            <Form.Control type="email" inputMode="email" placeholder="example@correo.com" required 
                                                value={correo} onChange={(e) => setCorreo(e.target.value)}
                                                onInput={(e) => { validarEmail(e.target); }}/>
                                        </Form.Group>
                                    </Form>
                                </Col>
                                <Col md={6}>
                                    <Form>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="ms-1">Correo electrónico :</Form.Label>
                                            <Form.Control required type="text" placeholder="Contraseña" value={contra} onChange={(e) => setContra(e.target.value)} />
                                        </Form.Group>
                                    </Form>
                                </Col>
                            </Row>
                            
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="fw-bold fs-4 p-2" variant="danger">Cancelar</Button>{' '}
                    <Button className="fw-bold fs-4 p-2" variant="warning" onClick={() => validar("PUT")}>Actualizar</Button>{' '}
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Empleados