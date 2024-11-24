import Container from "react-bootstrap/esm/Container";
import Menu from "./etiquetas/Menu";
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
          localStorage.clear();
        }   
    })
}


function Perfil(){
    const urlGerente = "http://localhost:8080/api/power/gerente/";
    const [ showPassword, setShowPassword] = useState(false); 
    const [ emailStatus, setEmailStatus ] = useState(false);
    //Gerente
    const [ correo, setCorreo ] = useState("");
    const [ contra, setContra ] = useState("");
    const [ estatus, setEstatus]= useState(true);
    const [ idGerente, setIdGerente ] = useState("");
    const [ identUsuario, setIdentUsuario] = useState("")
    const [ nombre, setNombre ] = useState("");
    const [ rol, setRol]= useState("");
    const [ telefono, setTelefono]= useState("");

    let usuarioIniciado = JSON.parse(localStorage.getItem("usuario"));

    useEffect(() => {
        getGerente();
      }, []);
      
    const getGerente = async () => {
        const respuesta = await axios({
        method: 'GET',
        url: urlGerente 
    });    
    console.log("login:",usuarioIniciado)
    setGerente(respuesta.data.data); 
    }

    const setGerente = async (usuario) => {
        console.log(usuario)
        for (let i = 0; i < usuario.length; i++) {  
            const element = usuario[i];
            if(element.id == usuarioIniciado.id){
                setCorreo(element.correo);
                setEstatus(element.estatus);
                setIdGerente(element.id);
                setIdentUsuario(element.identificadorusuario);
                setNombre(element.nombre);       
                setContra(element.cotrasenia);
                setRol(element.rol);
                setTelefono(element.telefono)
                validarPrevEmail(element.correo);
                break;
            }
        }
    }
    const alertActualizar=()=>{
        Swal.fire({
            title: 'Actualizar datos',
            icon: 'warning',
            text:'Verifique su información antes de actualizarla.',
            confirmButtonText: 'Actualizar',
            showCancelButton: true,
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if(result.isConfirmed){
                validar()
            }   
        })
    }

    const validar = async () => {
        event.preventDefault();
        let parametros;

        if(correo.trim() == '' || correo == undefined || emailStatus==false) {
            Swal.fire("Correo vacío","El campo de correo se encuentra vacío o está incorrecto","warning")
        } else if(nombre.trim() == '' || nombre == undefined){
            Swal.fire("Nombre vacío","El campo de nombre se encuentra vacío","warning")
        }else if(telefono.trim() == '' || telefono == undefined){
            Swal.fire("Número de teléfono vacío","El campo del número telefónico se encuentra vacío","warning")
        }else if(contra.trim() == '' || contra == undefined){
            Swal.fire("Contraseña vacía","El campo de contraseña se encuentra vacío","warning")
        } else {
            parametros = {
                correo: correo,
                cotrasenia: contra,
                estatus: estatus,
                id: idGerente,
                identificadorusuario: identUsuario,
                nombre: nombre,
                rol: rol,
                telefono: telefono,
          }
            console.log(parametros)
            actualizar(parametros);
        }
    }
    
    const actualizar = async (parametros) => {
        event.preventDefault();

        await axios({
            method: 'PUT',
            url: urlGerente+ parametros.id,
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

    const validarPrevEmail = (correo) => {
        let emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        
        if(emailRegex.test(correo)) {
            console.log("Si previo")
          setEmailStatus(true);
        }else {
            console.log("No previo")
          setEmailStatus(false);
        }
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
                        <img src={User} alt="User" draggable="false" />
                    </div>
                </Col>

                <Col md={4}>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre:</Form.Label>
                            <Form.Control type="text" placeholder="Nombre del empleado" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Número de Teléfono:</Form.Label>
                            <Form.Control type="number" placeholder="1112223333" value={telefono}
                             onChange={(e) => setTelefono(e.target.value)}
                             maxLength="10" onInput={(e) => e.target.value = e.target.value.slice(0, 10)} required 
                            />
                        </Form.Group>

                    </Form>
                </Col>

                <Col md={4}>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Correo Electrónico:</Form.Label>
                            <Form.Control type="email" inputMode="email" placeholder="example@correo.com" value={correo} 
                            onChange={(e) => setCorreo(e.target.value)} required 
                            onInput={(e) => { validarEmail(e.target); }}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Identificador de usuario:</Form.Label><br/>
                            <Form.Label className="mt-2">{identUsuario}</Form.Label>
                        </Form.Group>
                    </Form>
                </Col>

            </Row>
            <Row className="d-flex justify-content-center mt-2 ms-5 ps-5">
                <Col md={4}>
                    <Form.Group className="mb-3">
                            <Form.Label>Contraseña:</Form.Label>
                            <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                <Form.Control type={showPassword ? "text" : "password"} placeholder="Constraseña"
                                value={contra} onChange={(e) => setContra(e.target.value)} required />
                                <FontAwesomeIcon
                                icon={showPassword ? faEyeSlash : faEye}
                                className="password-toggle-icon p-2"
                                onClick={contrasenaVisible}
                                />
                            </div>
                            
                    </Form.Group>
                </Col>
            </Row>

            <div className="d-flex justify-content-center mt-4">
                <Button variant="warning" className="me-3" type="submit" onClick={() => alertActualizar()}>Editar información</Button>
            </div>
        </Container>
        </>
    )
}

export default Perfil;