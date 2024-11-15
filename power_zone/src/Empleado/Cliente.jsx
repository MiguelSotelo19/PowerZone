import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";

import { show_alerta } from "../Common/js/funciones";


import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Menu from "../Empleado/etiquetas/Menu";
import Contenedor from "../Empleado/etiquetas/Contenedor";

 
//CSS
import './../Empleado/css/Clientes.css'

//Imágenes
import cross from './../Gerente/img/cross.png'
import lupa from './../Gerente/img/lupa.png'

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

function Cliente () {
    const urlClientes = "http://localhost:8080/api/power/cliente/";
    const urlMembresias = "http://localhost:8080/api/power/membresia/";
    const [ clientes, setClientes ] = useState([]);
    const [ membresias, setMembresias ] = useState([]);

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
        console.log(respuesta.data.data);
        setClientes(respuesta.data.data);
    }

    const getMembresias = async () => {
        const respuesta = await axios({
            method: 'GET',
            url: urlMembresias,
        });
        setMembresias(respuesta.data.data);
    }

    //Modales
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modalMemIsOpen, setMemIsOpen] = React.useState(false);
    const [modalActIsOpen, setActIsOpen] = React.useState(false);

    //Modal Registrar Cliente
    function openModal() {
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
    function openActModal() {
        setActIsOpen(true);
    }

    function closeModalAct() {
        setActIsOpen(false);
    }

    function regresarModal() {
        closMemModal();
        openModal();
    }

    //Envío de formulario
    const validar = (metodo) => {
        event.preventDefault();

        var parametros;
        if(nombre.trim() === ""){
            show_alerta("Escribe el nombre del cliente", "warning");
        }else if(fecha_venc.trim() === ""){
            show_alerta("Escribe la fecha de vencimiento", "warning");
        } else if(tipo_tarjeta.trim() === ""){
            show_alerta("Escribe el tipo de tarjeta", "warning");
        } else if(cvv.trim() === ""){
            show_alerta("Escribe el CVV", "warning");
        } else if(num_tarjeta.trim() === ""){
            show_alerta("Escribe el número de tarjeta", "warning");
        } else if(ape_p.trim() === ""){
            show_alerta("Escribe el apellido paterno del cliente", "warning");
        } else if(ape_m.trim() === ""){
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
                contrasenia: `PowerPass_${Math.random().toString(36).substring(2, 10)}`,
                correo: correo,
                identificadorusuario: `PowerClient_${Math.random().toString(36).substring(2, 11)}`,
                rol: 'cliente',
                telefono: num_telefonico,
                cvv: parseInt(cvv),
                numero_tarjeta: num_tarjeta,
                membresia: {
                    id: parseInt(membresia, 10)
                }
            }

            console.log(parametros)
            enviarSolicitud(metodo, parametros, urlClientes);
        }
    }

    const enviarSolicitud = async(metodo, parametros, url) => {
        event.preventDefault();
    
        if(metodo != "POST"){
            url = url + '';
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
    const filteredClientes = clientes.filter(cliente => 
        cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cliente.identificadorusuario.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Actualizar
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

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
                    />&nbsp;&nbsp;Agregar clientes</Button>{' '}
                    <Form.Control style={{ width: '30%', backgroundColor: 'rgb(217, 217, 217)', backgroundImage: `url(${lupa})`, 
                    backgroundRepeat: 'no-repeat', backgroundSize: '7vh', textAlign: 'center' }} type="text" placeholder="Buscar clientes" value={searchTerm} onChange={handleSearchChange} />
                </div>

                <h1 className="d-flex justify-content-center mt-5">Clientes</h1>

                {filteredClientes.map((cliente, i) => {
                    return (
                        <Contenedor 
                            key={cliente.id + i}
                            title1={'Cliente'}
                            text1={cliente.nombre} 
                            title2={'Tipo de Membresía'}
                            text2={'N/A'} 
                            title3={'Número de membresía'}
                            text3={cliente.identificadorusuario} 
                            title4={'Estado'}
                            acciones={
                                <>
                                    <Button className='me-1' variant="danger">Desactivar</Button>{' '}
                                    <Button className='me-1' variant="success">Activar</Button>{' '}
                                    <Button variant="warning" onClick={openActModal}>Editar</Button>{' '}
                                </>                    
                            } 
                        />
                    );
                })}       
                
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Registrar Cliente"
            >
                <h2 style={{color: "black", fontSize: 35}}>Registrar Cliente</h2>
                <form style={{
                    width: "90%",
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems: "center"}}>

                <div className="info-1">
                    <div className="field">
                        <Form.Control required type="text" placeholder="Nombre(s)" onChange={(e) => setNombre(e.target.value)} />
                    </div>

                    <div className="field">
                        <Form.Control required type="text" placeholder="Apellido Paterno" onChange={(e) => setApe_p(e.target.value)} />
                    </div>
                </div>

                <div className="info-1">
                    <div className="field">
                        <Form.Control required type="text" placeholder="Apellido Materno" onChange={(e) => setApe_m(e.target.value)} />
                    </div>

                    <div className="field">
                        <Form.Control required type="text" placeholder="Número telefónico" onChange={(e) => setNum(e.target.value)} />
                    </div>
                </div>

                <div className="field-1">
                    <Form.Control required type="text" placeholder="Correo Electrónico" onChange={(e) => setCorreo(e.target.value)} />
                </div>

                <div className="acciones">
                    <Button className="fw-bold fs-4 p-2" variant="warning" onClick={() => registrarMembresia()}>Siguiente</Button>{' '}
                </div>
                
                </form>
            </Modal>

            <Modal
                isOpen={modalMemIsOpen}
                onRequestClose={closMemModal}
                style={customStyles}
                contentLabel="Registrar Cliente"
            >
                <h2 style={{color: "black", fontSize: 35}}>Registrar Cliente</h2>
                <form style={{
                    width: "90%",
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems: "center"}}>

                <div className="field-1 mt-4 w-75">
                    <Form.Select required onChange={(e) => setMembresia(e.target.value)}>
                        <option id="selected" value={null}>Selecciona una membresia</option>
                        {membresias.map((membresia => (
                            <option key={membresia.id} value={membresia.id}>{membresia.tipo_membresia}</option>
                        )))}
                    </Form.Select>
                </div>

                <div className="info-1">
                    <div className="field">
                        <Form.Control required type="text" placeholder="Número de tarjeta" onChange={(e) => setNumTarjeta(e.target.value)} />
                    </div>

                    <div className="field">
                        <Form.Control required type="text" placeholder="CVV" onChange={(e) => setCVV(e.target.value)} />
                    </div>
                </div>

                <div className="info-1">
                    <div className="field">
                        <Form.Control required type="text" placeholder="Tipo de Tarjeta" onChange={(e) => setTipoTarjeta(e.target.value)} />
                    </div>

                    <div className="field">
                        <Form.Control required type="text" placeholder="Fecha de vencimiento" onChange={(e) => setFechaVenc(e.target.value)} />
                    </div>
                </div>

                <div className="acciones">
                    <Button className="fw-bold fs-4 p-2" variant="warning" onClick={regresarModal}>Regresar</Button>{' '}
                    <Button className="fw-bold fs-4 p-2 ms-5" variant="warning" onClick={() => validar("POST")}>Registrar</Button>{' '}
                </div>
                
                </form>
            </Modal>

            <Modal
                isOpen={modalActIsOpen}
                onRequestClose={closeModalAct}
                style={customStyles}
                contentLabel="Actualizar Cliente"
            >
                <h2 style={{color: "black", fontSize: 35}}>Actualizar Cliente</h2>
                <form style={{
                    width: "90%",
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems: "center"}}>

                    

                <div className="info-1">
                    <div className="field">
                        <Form.Control required type="text" placeholder="Nombre(s)" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                    </div>

                    <div className="field">
                        <Form.Control required type="text" placeholder="Apellido Paterno" value={ape_p} onChange={(e) => setApe_p(e.target.value)} />
                    </div>
                </div>

                <div className="info-1">
                    <div className="field">
                        <Form.Control required type="text" placeholder="Apellido Materno" value={ape_m} onChange={(e) => setApe_m(e.target.value)} />
                    </div>

                    <div className="field">
                        <Form.Control required type="text" placeholder="Número telefónico" value={num_telefonico} onChange={(e) => setNum(e.target.value)} />
                    </div>
                </div>

                <div className="field-1">
                    <Form.Control required type="text" placeholder="Correo Electrónico" value={correo} onChange={(e) => setCorreo(e.target.value)} />
                </div>

                <div className="field-1">
                    <Form.Control required type="text" placeholder="Contraseña" value={contra} onChange={(e) => setContra(e.target.value)} />
                </div>

                <div className="acciones">
                    <Button className="fw-bold fs-4 p-2" variant="warning">Siguiente</Button>{' '}
                </div>
                
                </form>
            </Modal>

        </>
    )
}

export default Cliente;