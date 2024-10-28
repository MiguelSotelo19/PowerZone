import React, { useState } from "react";
import Modal from "react-modal";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Menu from "./etiquetas/Menu"
import Contenedor from "./etiquetas/Contenedor"

//CSS
import './css/Clientes.css'

//Imágenes
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

function Membresias() {
    const[ num_cuenta, setNum_cuenta ] = useState('')
    const[ tipoMembresia, setTipoMembresia ] = useState('')
    const[ CVV, setCVV ] = useState('')
    const[ tipoTarjeta, setTipoTarjeta ] = useState('')
    const[ FechaVencimiento, setFechaVencimiento ] = useState('')


    //Modal mejorar membresía
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openActModal() {
        setActIsOpen(true);
    }

    //Modal mejorar membresía
    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        subtitle.style.color = "#f00";
    }

    function closeModal() {
        setIsOpen(false);
    }

    return(
        <>
            <Menu />

            <div className='main-content pb-5'>
                <div style={{ width: '99vw' }}></div>

                <div className='d-flex justify-content-end w-75'>
                    <Form.Control style={{ width: '40%', backgroundColor: 'rgb(217, 217, 217)', backgroundImage: `url(${lupa})`, 
                    backgroundRepeat: 'no-repeat', backgroundSize: '5vh', textAlign: 'center' }} type="text" placeholder="Buscar membresías" />
                </div>

                <h1 className="d-flex justify-content-center mt-5">Membresías</h1>

                <Contenedor 
                title1={'Nombre del cliente'}
                text1={'Bryan Alexis Miranda Durán'} 
                title2={'Tipo de membresía'}
                text2={'Básica'} 
                title3={'Renovación'}
                text3={'20/08/2025'} 
                title4={'Acciones'}
                acciones={
                    <>
                        <Button variant="danger">Desactivar</Button>{' '}
                        <Button className='me-1' variant="success">Activar</Button>{' '}
                        <Button className='me-1' onClick={openModal} variant="primary">Mejorar membresía</Button>{' '}
                    </>                    
                } />

            </div>

            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Mejorar membresía"
            >
                <h2 style={{color: "black", fontSize: 35}}>Mejorar membresía</h2>
                <form style={{
                    width: "90%",
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems: "center"}}>

                    
                <div className="field-1">
                    <Form.Control required type="text" placeholder="Número de cuenta" onChange={(e) => setNum_cuenta(e.target.value)} />
                </div>

                <div className="info-1">
                    <div className="field">
                        <Form.Control required type="text" placeholder="Tipo de membresía" onChange={(e) => setTipoMembresia(e.target.value)} />
                    </div>

                    <div className="field">
                        <Form.Control required type="text" placeholder="CVV" onChange={(e) => setCVV(e.target.value)} />
                    </div>
                </div>

                <div className="info-1">
                    <div className="field">
                        <Form.Control required type="text" placeholder="Tipo de tarjeta" onChange={(e) => setTipoTarjeta(e.target.value)} />
                    </div>

                    <div className="field">
                        <Form.Control required type="text" placeholder="Fecha de vencimiento" onChange={(e) => setFechaVencimiento(e.target.value)} />
                    </div>
                </div>

                <div className="acciones">
                    <Button className="fw-bold fs-4 p-2" variant="danger">Cancelar</Button>{' '}
                    <Button className="fw-bold fs-4 p-2" variant="warning">Añadir</Button>{' '}
                </div>
                
                </form>
            </Modal>
        </>
    )
}

export default Membresias