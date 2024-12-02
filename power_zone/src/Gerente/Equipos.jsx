import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from 'axios';
import { show_alerta } from "../Common/js/funciones";

import Modal from "react-bootstrap/Modal";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Menu from "./components/Menu"
import Contenedor from "../Common/components/Contenedor"

import './css/Clientes.css'

import cross from './img/cross.png'
import lupa from './img/lupa.png'


function Equipos() {
    const urlEquipos = "http://localhost:8080/api/power/equipos/";
    const [ equipos, setEquipos ] = useState([]);

    const [ id_equipo, setId_equipo ] = useState("");
    const [ nombre, setNombre ] = useState("");
    const [ marca, setMarca ] = useState("");
    const [ cantidad, setCantidad ] = useState("");
    const [ estado, setEstado ] = useState("");

    useEffect(() => {     
        getEquipos();
    }, [])

    const getEquipos = async () => {
        const respuesta = await axios({
            method: 'GET',
            url: urlEquipos,
        });
        setEquipos(respuesta.data.data);
    }

    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modalActIsOpen, setActIsOpen] = React.useState(false);

    function openModal() { 
        setId_equipo(undefined);
        setIsOpen(true);
    }

    function afterOpenModal() {
        subtitle.style.color = "#f00";
    }

    function closeModal() {
        setIsOpen(false);
    }

    function openActModal(id, modelo_, marca_, cantidad_, estado_) {
        setId_equipo(id);
        setNombre(modelo_);
        setMarca(marca_);
        setCantidad(cantidad_);
        setEstado(estado_);

        setActIsOpen(true);
    }

    function afterOpenModalAct() {
        subtitle.style.color = "#f00";
    }

    function closeModalAct() {
        setActIsOpen(false);
    }

    const validar = (metodo) => {
        event.preventDefault();

        var parametros;
        if(nombre.trim() === ""){
            show_alerta("Escribe el modelo del equipo", "warning");
        }else if(marca.trim() === ""){
            show_alerta("Escribe la marca", "warning");
        } else if(cantidad < 0){
            show_alerta("Escribe la cantidad", "warning");
        } else if(estado.trim() === ""){
            show_alerta("Escribe el estado del equipo", "warning");
        } else {
            parametros = {
                modelo: nombre,
                marca: marca,
                estado: estado,
                cantidad: cantidad,
                estatus: true
            }

            enviarSolicitud(metodo, parametros, urlEquipos);
        }
    }

    const enviarSolicitud = async(metodo, parametros, url, id_) => {
        event.preventDefault();
    
        if(metodo != "POST"){
            (id_ == undefined) ? url = url + id_equipo : url = url + id_;
        } 
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
            closeModal();
            closeModalAct();

            getEquipos();
        })
        .catch(function (error) {
            show_alerta("Error en la Solicitud", "error");
        });
    }

    const [searchTerm, setSearchTerm] = useState('');

    const filteredEquipos = equipos.filter(equipo => 
        equipo.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        equipo.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
        equipo.cantidad.toString().includes(searchTerm) ||
        equipo.estado.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const activarE = (id_, modelo_, marca_, cantidad_, estado_, estatus_) => {
        Swal.fire({
            title: estatus_ ? '¿Desactivar equipo?' : '¿Activar equipo?',
            text: estatus_
                ? `El equipo ${modelo_} será desactivado.`
                : `El equipo ${modelo_} será activado.`,
            icon: 'warning',
            confirmButtonText: estatus_ ? 'Desactivar equipo' : 'Activar equipo',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
        }).then(async (result) => {
            if (result.isConfirmed){
                var parametros = {
                    modelo: modelo_,
                    marca: marca_,
                    estado: estado_,
                    cantidad: cantidad_,
                    estatus: estatus_ == true ? false : true,
                }
        
                enviarSolicitud("PUT", parametros, urlEquipos, id_);
            }
        });        
    }

    return (
        <>
            <Menu />

            <div className='main-content pb-5'>
                <div style={{ width: '99vw' }}></div>

                <div className='d-flex justify-content-evenly'>
                    <Button className="m-1 fs-5 fw-bold" variant="success" onClick={openModal}>
                    <img src={cross} alt='mas' style={{ width: '2vh', height: '2vh' }} draggable="false"/>&nbsp;&nbsp;Agregar equipos</Button>{' '}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '30%' }}>
                        <img src={lupa} draggable="false" alt="Buscar" style={{ width: '4vh', height: '3vh' }} />
                        <Form.Control type="text" placeholder="Buscar clientes" value={searchTerm} onChange={handleSearchChange} 
                            style={{ backgroundColor: 'rgb(217, 217, 217)', borderRadius: '12px',}}/>
                    </div>
                </div>

                <h1 className="d-flex justify-content-center mt-5">Equipos de Gimnasio</h1>

                {filteredEquipos.map((equipo, i) => (
                <Contenedor 
                    key={equipo.id_equipo + i}
                    title1={'Modelo'}
                    text1={equipo.modelo} 
                    title2={'Marca'}
                    text2={equipo.marca} 
                    title3={'Cantidad'}
                    text3={equipo.cantidad} 
                    title4={'Estado'}
                    acciones={
                        <>
                            {equipo.estatus ? (
                                <Button className='me-1' variant="danger" onClick={() => activarE(equipo.id_equipo, equipo.modelo, equipo.marca, equipo.cantidad, equipo.estado, equipo.estatus)}>Desactivar</Button>
                            ) : (
                                <Button className='me-1' variant="success" onClick={() => activarE(equipo.id_equipo, equipo.modelo, equipo.marca, equipo.cantidad, equipo.estado, equipo.estatus)}>Activar</Button>
                            )}
                            <Button variant="warning" onClick={() => openActModal(equipo.id_equipo, equipo.modelo, equipo.marca, equipo.cantidad, equipo.estado)}>Editar</Button>{' '}
                        </>                    
                    }
                />
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
                        Registrar equipo
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row className="d-flex justify-content-center">
                            <Col md={8}>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="ms-1">Nombre de la maquina:</Form.Label>
                                        <Form.Control type="text" placeholder="Nombre" 
                                                onChange={(e) => setNombre(e.target.value)} required/>
                                    </Form.Group>
                                </Form>
                            </Col>

                            <Col md={4}>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="ms-1">Marca:</Form.Label>
                                        <Form.Control type="text" placeholder="Marca" 
                                            onChange={(e) => setMarca(e.target.value)}/>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                        <Row className="d-flex justify-content-center">
                            <Col md={8}>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="ms-1">Estado:</Form.Label>
                                        <Form.Control type="text" placeholder="Estado" 
                                                onChange={(e) => setEstado(e.target.value)} required/>
                                    </Form.Group>
                                </Form>
                            </Col>

                            <Col md={4}>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="ms-1">Cantidad:</Form.Label>
                                        <Form.Control type="text" placeholder="Cantidad" 
                                            onChange={(e) => setCantidad(e.target.value)}/>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Container>                        
                </Modal.Body>   
                <Modal.Footer>
                    <Button className="fw-bold fs-4 p-2" variant="danger" onClick={() => {closeModal()}}>Cancelar</Button>{' '}
                    <Button className="fw-bold fs-4 p-2" variant="warning" onClick={() => validar("POST")}>Registrar</Button>{' '}
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
                        Actualizar equipo
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row className="d-flex justify-content-center">
                            <Col md={8}>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="ms-1">Nombre de la maquina:</Form.Label>
                                        <Form.Control type="text" placeholder="Nombre" value={nombre} 
                                                onChange={(e) => setNombre(e.target.value)} required/>
                                    </Form.Group>
                                </Form>
                            </Col>

                            <Col md={4}>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="ms-1">Marca:</Form.Label>
                                        <Form.Control type="text" placeholder="Marca" value={marca}
                                            onChange={(e) => setMarca(e.target.value)}/>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                        <Row className="d-flex justify-content-center">
                            <Col md={8}>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="ms-1">Estado:</Form.Label>
                                        <Form.Control type="text" placeholder="Estado" value={estado}
                                                onChange={(e) => setEstado(e.target.value)} required/>
                                    </Form.Group>
                                </Form>
                            </Col>

                            <Col md={4}>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="ms-1">Cantidad:</Form.Label>
                                        <Form.Control type="text" placeholder="Cantidad"  value={cantidad}
                                            onChange={(e) => setCantidad(e.target.value)}/>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Container>                        
                </Modal.Body>   
                <Modal.Footer>
                    <Button className="fw-bold fs-4 p-2" variant="danger" onClick={() => closeModalAct()}>Cancelar</Button>{' '}
                    <Button className="fw-bold fs-4 p-2" variant="warning" onClick={() => validar("PUT")}>Actualizar</Button>{' '}
                </Modal.Footer>             
            </Modal>

        </>
    )
}

export default Equipos