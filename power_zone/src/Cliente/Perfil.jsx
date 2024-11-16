import Container from "react-bootstrap/esm/Container";
import Menu from "./etiquetas/menu";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import User from '../assets/user.png'
import { Row, Col, Form } from 'react-bootstrap';
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


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
    const urlMembresias = "http://localhost:8080/api/power/membresia/";
    const [showPassword, setShowPassword] = useState(false); 
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
    //let user = localStorage.getItem("usuario");

    useEffect(() => {
        getCliente();
        getMembresia();
      }, []);
      
    const getCliente = async () => {
    const respuesta = await axios({
        method: 'GET',
        url: urlClientes
    });
    console.log("cliente:",respuesta.data.data[0])
    setCliente(respuesta.data.data[0]); //Este [0] se cambiará cuando haya inicio de sesion que ya jale

    }

    const getMembresia = async () => {
        const respuesta = await axios({
        method: 'GET',
        url: urlMembresias 
    });
     setMembresias(respuesta.data.data[0]); 
    }
    
    const setCliente = async (cliente) => {

    //for (let i = 0; i < cliente.length; i++) {
        const element = cliente; //[i];
        //console.log("Cliente setCliente:",element)
        //if(element.idCliente == user){
        setCorreo(element.correo);
        setIdCliente(element.id);
        setContra(element.cotrasenia);
        setCVV(element.cvv);
        setEstatus(element.estatus);
        setMembresia(element.identificadorusuario);
        setIdentUsuario(element.identificadorusuario);
        setNombre(element.nombre);
        setNumTarjeta(element.numero_tarjeta);
        setRol(element.rol);
        setNum(element.telefono)
        // Verifica el valor después de asignarlo
        //console.log("Identificador usuario:", identUsuario);
        //}
        }
    //}

    const setMembresias = async (membresia) => {

        //for (let i = 0; i < membresia.length; i++) {
            const element = membresia//[i];
            //console.log(element)
            //const cliente = element.clienteBeans.find(cliente => cliente.identificadorusuario === identUsuario);
            //console.log("cliente con membresia:",cliente)
            //if(cliente){
            setCliente(element.clienteBeans[0]);
            setPrecio(element.costo);
            setTipoMembresia(element.tipo_membresia);
            setIdMembresia(element.id)
            //}
            //console.log("membresia ",i," :",element)
        //}
    }

    const validar = async () => {
        event.preventDefault();
        let parametros;

        if(correo.trim() == '' || correo == undefined) {
            Swal.fire("Correo vacío","El campo de correo se encuentra vacío","warning")
        } else if(nombre.trim() == '' || nombre == undefined){
            Swal.fire("Nombre vacío","El campo de nombre se encuentra vacío","warning")
        }else if(num_telefonico.trim() == '' || num_telefonico == undefined){
            Swal.fire("Número de teléfono vacío","El campo del número telefónico se encuentra vacío","warning")
        }else if(contra.trim() == '' || contra == undefined){
            Swal.fire("Contraseña vacía","El campo de contraseña se encuentra vacío","warning")
        } else {
            parametros = {
            id: idCliente,
            correo: correo,
            nombre: nombre,
            cotrasenia: contra,
            telefono: num_telefonico,
            identificadorusuario: identUsuario,
            rol: rol,
            estatus:estatus,
            cvv: cvv,
            numero_tarjeta:num_tarjeta
          }
          console.log(parametros)
        }
    
        actualizar(parametros);
    }
    
    const actualizar = async (parametros) => {
        event.preventDefault();

        await axios({
            method: 'PUT',
            url: urlClientes+ parametros.id,
            data: parametros
        }).then(function (res) {
            //console.log(res);
            if(res.data.data == 'OK'){
            //console.log(res.data.data); 
            Swal.fire("Datos Actualizados","Los datos se han actualizado correctamente","success")
            }
        }).catch(function (error) {
            //console.log(error);
        })
    }

    const contrasenaVisible = () => {
        setShowPassword((prev) => !prev); 
      };
    
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
                            <Form.Control type="text" placeholder="Nombre del cliente" value={nombre} onChange={(e) => setNombre(e.target.value)}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Número de Teléfono:</Form.Label>
                            <Form.Control type="number" placeholder="7771436571" value={num_telefonico}
                             onChange={(e) => setTelefono(e.target.value)}
                            />
                            <Form.Control
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Nivel de Membresía:</Form.Label><br/>
                            <Form.Label className="mt-2">{tipoMembresia}</Form.Label>{/**/}
                        </Form.Group>
                    </Form>
                </Col>

                <Col md={4}>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Correo Electrónico:</Form.Label>
                            <Form.Control type="email" inputMode="email" placeholder="example@correo.com" value={correo} onChange={(e) => setCorreo(e.target.value)}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Número de Cliente:</Form.Label><br/>
                            <Form.Label className="mt-2">{identUsuario}</Form.Label>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Contraseña:</Form.Label>
                            <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                <Form.Control type={showPassword ? "text" : "password"} placeholder="Constraseña"
                                value={contra} onChange={(e) => setContra(e.target.value)} />
                                <FontAwesomeIcon
                                icon={showPassword ? faEyeSlash : faEye}
                                className="password-toggle-icon p-2"
                                onClick={contrasenaVisible}
                                />
                            </div>
                            
                        </Form.Group>
                    </Form>
                </Col>
            </Row>

            <div className="d-flex justify-content-center mt-4">
                <Button variant="warning" className="me-3" type="submit" onClick={() => validar()}>Editar información</Button>
                <Button variant="danger" onClick={()=>cerrarSesion()}>Cerrar sesión</Button>
            </div>
        </Container>
        </>
    )
}

export default ClientePerfil;