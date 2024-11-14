import Container from "react-bootstrap/esm/Container";
import Menu from "./etiquetas/menu";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2';

import User from '../assets/user.png'
import { Row, Col, Form } from 'react-bootstrap';
import axios from "axios";


function cerrarSesion(){
    Swal.fire({
        title: '¿Cerrar sesión?',
        icon: 'warning',
        confirmButtonText: 'Cerrar Sesión',
        showCancelButton: true,
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if(result.isConfirmed){
          window.location = '/';
        }   
    })
}


function ClientePerfil(){
    const urlClientes = "http://localhost:8080/api/power/cliente/";
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
    const [estatus, setEstatus]= useState(true);
    const [rol, setRol]= useState("");
    const [telefono, setTelefono]= useState("");
    let user = localStorage.getItem("usuario");
    useEffect(() => {
        getCliente();
      }, []);
      
    const getCliente = async () => {
    const respuesta = await axios({
        method: 'GET',
        url: urlClientes
    });
    console.log(respuesta.data.data[0])
    setCliente(respuesta.data.data);
    }
    const setCliente = async (cliente) => {

    for (let i = 0; i < cliente.length; i++) {
        const element = cliente[i];
        console.log("elemento: ",element)
        if(element.idCliente == user){
        setCorreo(element.correo);
        setContra(element.cotrasenia);
        setCVVt(element.cvv);
        setEstatus(element.estatus);
        setMembresia(element.identificadorusuario);
        setNombre(element.nombre);
        setNumTarjeta(element.numero_tarjeta);
        setRol(element.rol);
        setTelefono(element.telefono)
        }
    }
    }
    return(
        
        <>
        <Menu/>
        <Container className="main-content pb-5">
            <h1 className="d-flex justify-content-center">Perfil</h1>
            <div style={{ width: '99vw' }}/>
            <Row className="d-flex justify-content-center mt-4">

                <Col md={3} className="d-flex justify-content-center align-items-center">
                    <div style={{ width: '40%', height: '50%' }}>
                        <img src={User} alt="User" />
                    </div>
                </Col>

                <Col md={4}>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre:</Form.Label>
                            <Form.Control type="text" placeholder="Nombre del cliente" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Número de Teléfono:</Form.Label>
                            <Form.Control type="number" inputMode="numeric" placeholder="7771436571" maxLength="10" onInput={(e) => e.target.value = e.target.value.slice(0, 10)}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Nivel de Membresía:</Form.Label>
                            <Form.Control type="text" placeholder="Nivel de membresia" readOnly/>
                        </Form.Group>
                    </Form>
                </Col>

                <Col md={4}>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Correo Electrónico:</Form.Label>
                            <Form.Control type="email" inputMode="email" placeholder="example@correo.com" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Número de Cliente:</Form.Label>
                            <Form.Control type="number" inputMode="numeric" placeholder="Número de cliente" readOnly />{/*Aca es agregar si hay limite de digitos, idk*/}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Contraseña:</Form.Label>
                            <Form.Control type="password" placeholder="Constraseña" />
                        </Form.Group>
                    </Form>
                </Col>
            </Row>

            <div className="d-flex justify-content-center mt-4">
                <Button variant="warning" className="me-3">Editar información</Button>
                <Button variant="danger" onClick={()=>cerrarSesion()}>Cerrar sesión</Button>
            </div>
        </Container>
        </>
    )
}

export default ClientePerfil;