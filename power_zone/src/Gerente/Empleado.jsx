import React, { useState } from "react";

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
    const [ nombre, setNombre ] = useState("");
    const [ ape_p, setApe_p ] = useState("");
    const [ ape_m, setApe_m ] = useState("");    
    const [ num_telefonico, setNum ] = useState("");
    const [ correo, setCorreo ] = useState("");
    const [ contra, setContra ] = useState("");

    //Modales
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modalActIsOpen, setActIsOpen] = React.useState(false);

    //Modal Registrar Cliente
    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        subtitle.style.color = "#f00";
    }

    function closeModal() {
        setIsOpen(false);
    }

    //Modal Actualizar Cliente
    function openActModal() {
        setActIsOpen(true);
    }

    function afterOpenModalAct() {
        subtitle.style.color = "#f00";
    }

    function closeModalAct() {
        setActIsOpen(false);
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
                    backgroundRepeat: 'no-repeat', backgroundSize: '7vh', textAlign: 'center' }} type="text" placeholder="Buscar empleados" />
                </div>

                <h1 className="d-flex justify-content-center mt-5">Empleados</h1>

                {/* Aquí iría un ciclo para cada cliente de la BD */}
                <Contenedor 
                title1={'Nombre del empleado'}
                text1={'Bryan Alexis Miranda Durán'} 
                title2={'Encargado de área'}
                text2={'Limpieza'} 
                title3={'Antigüedad'}
                text3={'5 años'} 
                title4={'Estado'}
                acciones={
                    <>
                        <Button className='me-1' variant="danger">Desactivar</Button>{' '}
                        <Button className='me-1' variant="success">Activar</Button>{' '}
                        <Button variant="warning" onClick={openActModal}>Editar</Button>{' '}
                    </>                    
                } />
                <Contenedor 
                title1={'Nombre del empleado'}
                text1={'Bryan Alexis Miranda Durán'} 
                title2={'Encargado de área'}
                text2={'Limpieza'} 
                title3={'Antigüedad'}
                text3={'5 años'} 
                title4={'Estado'}
                acciones={
                    <>
                        <Button className='me-1' variant="danger">Desactivar</Button>{' '}
                        <Button className='me-1' variant="success">Activar</Button>{' '}
                        <Button variant="warning" onClick={openActModal}>Editar</Button>{' '}
                    </>                    
                } />
                <Contenedor 
                title1={'Nombre del empleado'}
                text1={'Bryan Alexis Miranda Durán'} 
                title2={'Encargado de área'}
                text2={'Limpieza'} 
                title3={'Antigüedad'}
                text3={'5 años'} 
                title4={'Estado'}
                acciones={
                    <>
                        <Button className='me-1' variant="danger">Desactivar</Button>{' '}
                        <Button className='me-1' variant="success">Activar</Button>{' '}
                        <Button variant="warning" onClick={openActModal}>Editar</Button>{' '}
                    </>                    
                } />
                <Contenedor 
                title1={'Nombre del empleado'}
                text1={'Bryan Alexis Miranda Durán'} 
                title2={'Encargado de área'}
                text2={'Limpieza'} 
                title3={'Antigüedad'}
                text3={'5 años'} 
                title4={'Estado'}
                acciones={
                    <>
                        <Button className='me-1' variant="danger">Desactivar</Button>{' '}
                        <Button className='me-1' variant="success">Activar</Button>{' '}
                        <Button variant="warning" onClick={openActModal}>Editar</Button>{' '}
                    </>                    
                } />
                                
                
            </div>

            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
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
                        <Form.Control required type="text" placeholder="Número telefónico" onChange={(e) => setApe_p(e.target.value)} />
                    </div>
                </div>

                <div className="field-1">
                    <Form.Control required type="text" placeholder="Correo Electrónico" onChange={(e) => setApe_m(e.target.value)} />
                </div>

                <div className="field-1">
                    <Form.Control required type="text" placeholder="Contraseña" onChange={(e) => setApe_m(e.target.value)} />
                </div>

                <div className="acciones">
                    <Button className="fw-bold fs-4 p-2" variant="warning">Registrar</Button>{' '}
                </div>
                
                </form>
            </Modal>

            <Modal
                isOpen={modalActIsOpen}
                onAfterOpen={afterOpenModalAct}
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

                <div className="acciones">
                    <Button className="fw-bold fs-4 p-2" variant="danger">Cancelar</Button>{' '}
                    <Button className="fw-bold fs-4 p-2" variant="warning">Actualizar</Button>{' '}
                </div>
                
                </form>
            </Modal>

        </>
    )
}

export default Empleados