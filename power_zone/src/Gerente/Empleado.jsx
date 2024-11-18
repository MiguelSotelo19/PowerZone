import React, { useEffect, useState } from "react";
import axios from 'axios';
import { show_alerta } from "../Common/js/funciones";

import Modal from "react-modal";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Menu from "./etiquetas/Menu"
import Contenedor from "./etiquetas/Contenedor"

//CSS
import './css/Clientes.css'

//Imágenes
import cross from './img/cross.png'
import lupa from './img/lupa.png'

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

Modal.setAppElement("#root");

function Empleados() {
    const urlEmpleados = "http://localhost:8080/api/power/empleado/";
    const [ empleados, setEmpleados ] = useState([]);

    const [ idEmp, setIdEmp] = useState(0);
    const [ nombre, setNombre ] = useState("");
    const [ num_telefonico, setNum ] = useState("");
    const [ correo, setCorreo ] = useState("");
    const [ contra, setContra ] = useState("");

    //Traer datos de empleado
    useEffect(() => {     
        getEmpleados();
    }, [])

    const getEmpleados = async () => {
        const respuesta = await axios({
            method: 'GET',
            url: urlEmpleados,
        });
        console.log(respuesta.data.data);
        setEmpleados(respuesta.data.data);
    }

    //Envío de formulario
    const validar = (metodo) => {
        event.preventDefault();

        var parametros;
        if(nombre.trim() === ""){
            show_alerta("Escribe el nombre del empleado", "warning");
        } else if(num_telefonico.trim() === ""){
            show_alerta("Escribe el número de teléfono del empleado", "warning");
        } else if(correo.trim() === ""){
            show_alerta("Escribe el correo del empleado", "warning");
        } else {
            parametros = {
                nombre: nombre,
                contrasenia: `PowerPassEmp_${Math.random().toString(36).substring(2, 10)}`,
                correo: correo,
                identificadorusuario: `PowerEmp_${Math.random().toString(36).substring(2, 11)}`,
                rol: 'Empleado',
                telefono: num_telefonico,
            }

            console.log(parametros)
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
        }).then(function (respuesta) {
            var tipo = respuesta.data[0];
            var msj = respuesta.data[1];
            if(tipo === "success"){
                show_alerta("Cambios realizados correctamente", "success");         
            } 
            closeModal();
            closeModalAct();

            getEmpleados();
        })
        .catch(function (error) {
            show_alerta("Error en la Solicitud", "error");
            console.log(error);
        });
    }

    //Modales
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modalActIsOpen, setActIsOpen] = React.useState(false);

    //Modal Registrar empleado
    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    //Modal Actualizar empleado
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

    //Filtrado
    const [searchTerm, setSearchTerm] = useState('');

    // Filtrar empleados
    const filteredEmpleados = empleados.filter(empleado => 
        empleado.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        empleado.correo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        empleado.telefono.toString().includes(searchTerm) 
    );

    // Actualizar
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const activarC = (id_, nombre_, telefono_, correo_, cotrasenia_, estatus_) => {
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

    return (
        <>
            <Menu />

            <div className='main-content pb-5'>
                <div style={{ width: '99vw' }}></div>

                <div className='d-flex justify-content-evenly'>
                    <Button className="m-1 fs-5 fw-bold" variant="success" onClick={openModal}>
                    <img 
                    src={cross}
                    alt='mas'
                    style={{ width: '2vh', height: '2vh' }}                    
                    />&nbsp;&nbsp;Agregar empleados</Button>{' '}
                    <Form.Control style={{ width: '30%', backgroundColor: 'rgb(217, 217, 217)', backgroundImage: `url(${lupa})`, 
                    backgroundRepeat: 'no-repeat', backgroundSize: '7vh', textAlign: 'center' }} type="text" placeholder="Buscar empleados" value={searchTerm} onChange={handleSearchChange} />
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
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Registrar Empleado"
            >
                <h2 style={{color: "black", fontSize: 35}}>Registrar Empleado</h2>
                <form style={{
                    width: "90%",
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems: "center"}}>

                    

                <div className="field-1">
                    <Form.Control required type="text" placeholder="Nombre Completo" onChange={(e) => setNombre(e.target.value)} />
                </div>

                <div className="info-1">
                    <div className="field">      
                        <Form.Control required type="text" placeholder="Número telefónico" onChange={(e) => setNum(e.target.value)} />
                    </div>

                    <div className="field">
                        <Form.Control required type="text" placeholder="Correo Electrónico" onChange={(e) => setCorreo(e.target.value)} />
                    </div>
                </div>                

                <div className="acciones">
                    <Button className="fw-bold fs-4 p-2" variant="warning" onClick={() => validar("POST")}>Registrar</Button>{' '}
                </div>
                
                </form>
            </Modal>

            <Modal
                isOpen={modalActIsOpen}
                onRequestClose={closeModalAct}
                style={customStyles}
                contentLabel="Actualizar Empleado"
            >
                <h2 style={{color: "black", fontSize: 35}}>Actualizar empleado</h2>
                <form style={{
                    width: "90%",
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems: "center"}}>

                    

                <div className="field-1">
                    <Form.Control required type="text" placeholder="Nombre Completo" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </div>

                <div className="info-1">
                    <div className="field">      
                        <Form.Control required type="text" placeholder="Número telefónico" value={num_telefonico} onChange={(e) => setNum(e.target.value)} />
                    </div>

                    <div className="field">
                        <Form.Control required type="text" placeholder="Correo Electrónico" value={correo} onChange={(e) => setCorreo(e.target.value)} />
                    </div>
                </div>      

                <div className="field-1">
                    <Form.Control required type="text" placeholder="Contraseña" value={contra} onChange={(e) => setContra(e.target.value)} />
                </div>

                <div className="acciones">
                    <Button className="fw-bold fs-4 p-2" variant="danger">Cancelar</Button>{' '}
                    <Button className="fw-bold fs-4 p-2" variant="warning" onClick={() => validar("PUT")}>Actualizar</Button>{' '}
                </div>
                
                </form>
            </Modal>

        </>
    )
}

export default Empleados