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

function Equipos() {
    const [ nombre, setNombre ] = useState("");
    const [ marca, setMarca ] = useState("");
    const [ tipo_maquina, setTipo_maquina ] = useState("");    
    const [ cantidad, setCantidad ] = useState("");
    const [ estado, setEstado ] = useState("");
    const [ area, setArea ] = useState("");

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
                    />&nbsp;&nbsp;Agregar equipos</Button>{' '}
                    <Form.Control style={{ width: '30%', backgroundColor: 'rgb(217, 217, 217)', backgroundImage: `url(${lupa})`, 
                    backgroundRepeat: 'no-repeat', backgroundSize: '7vh', textAlign: 'center' }} type="text" placeholder="Buscar equipos" />
                </div>

                <h1 className="d-flex justify-content-center mt-5">Equipos de Gimnasio</h1>

                {/* Aquí iría un ciclo para cada cliente de la BD */}
                <Contenedor 
                title1={'Aparato'}
                text1={'Caminadora'} 
                title2={'Marca'}
                text2={'Acme'} 
                title3={'Cantidad'}
                text3={'6 aparatos'} 
                title4={'Estado'}
                acciones={
                    <>
                        <Button className='me-1' variant="danger">Desactivar</Button>{' '}
                        <Button className='me-1' variant="success">Activar</Button>{' '}
                        <Button variant="warning" onClick={openActModal}>Editar</Button>{' '}
                    </>                    
                } />
                <Contenedor 
                title1={'Aparato'}
                text1={'Caminadora'} 
                title2={'Marca'}
                text2={'Acme'} 
                title3={'Cantidad'}
                text3={'6 aparatos'} 
                title4={'Estado'}
                acciones={
                    <>
                        <Button className='me-1' variant="danger">Desactivar</Button>{' '}
                        <Button className='me-1' variant="success">Activar</Button>{' '}
                        <Button variant="warning" onClick={openActModal}>Editar</Button>{' '}
                    </>                    
                } />
                <Contenedor 
                title1={'Aparato'}
                text1={'Caminadora'} 
                title2={'Marca'}
                text2={'Acme'} 
                title3={'Cantidad'}
                text3={'6 aparatos'} 
                title4={'Estado'}
                acciones={
                    <>
                        <Button className='me-1' variant="danger">Desactivar</Button>{' '}
                        <Button className='me-1' variant="success">Activar</Button>{' '}
                        <Button variant="warning" onClick={openActModal}>Editar</Button>{' '}
                    </>                    
                } />
                <Contenedor 
                title1={'Aparato'}
                text1={'Caminadora'} 
                title2={'Marca'}
                text2={'Acme'} 
                title3={'Cantidad'}
                text3={'6 aparatos'} 
                title4={'Estado'}
                acciones={
                    <>
                        <Button className='me-1' variant="danger">Desactivar</Button>{' '}
                        <Button className='me-1' variant="success">Activar</Button>{' '}
                        <Button variant="warning" onClick={openActModal}>Editar</Button>{' '}
                    </>                    
                } />
                <Contenedor 
                title1={'Aparato'}
                text1={'Caminadora'} 
                title2={'Marca'}
                text2={'Acme'} 
                title3={'Cantidad'}
                text3={'6 aparatos'} 
                title4={'Estado'}
                acciones={
                    <>
                        <Button className='me-1' variant="danger">Desactivar</Button>{' '}
                        <Button className='me-1' variant="success">Activar</Button>{' '}
                        <Button variant="warning" onClick={openActModal}>Editar</Button>{' '}
                    </>                    
                } />
                <Contenedor 
                title1={'Aparato'}
                text1={'Caminadora'} 
                title2={'Marca'}
                text2={'Acme'} 
                title3={'Cantidad'}
                text3={'6 aparatos'} 
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
                contentLabel="Registrar Equipo"
            >
                <h2 style={{color: "black", fontSize: 35}}>Registrar Equipo</h2>
                <form style={{
                    width: "90%",
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems: "center"}}>

                    

                <div className="info-1">
                    <div className="field">
                        <Form.Control required type="text" placeholder="Nombre" onChange={(e) => setNombre(e.target.value)} />
                    </div>

                    <div className="field">
                        <Form.Control required type="text" placeholder="Marca" onChange={(e) => setMarca(e.target.value)} />
                    </div>
                </div>

                <div className="info-1">
                    <div className="field">
                        <Form.Control required type="text" placeholder="Tipo de maquina" onChange={(e) => setTipo_maquina(e.target.value)} />
                    </div>

                    <div className="field">
                        <Form.Control required type="text" placeholder="Cantidad" onChange={(e) => setCantidad(e.target.value)} />
                    </div>
                </div>

                <div className="info-1">
                    <div className="field">
                        <Form.Control required type="text" placeholder="Estado" onChange={(e) => setEstado(e.target.value)} />
                    </div>

                    <div className="field">
                        <Form.Control required type="text" placeholder="Área" onChange={(e) => setArea(e.target.value)} />
                    </div>
                </div>

                <div className="acciones">
                    <Button className="fw-bold fs-4 p-2" variant="danger">Cancelar</Button>{' '}
                    <Button className="fw-bold fs-4 p-2" variant="warning">Registrar</Button>{' '}
                </div>
                
                </form>
            </Modal>

            <Modal
                isOpen={modalActIsOpen}
                onAfterOpen={afterOpenModalAct}
                onRequestClose={closeModalAct}
                style={customStyles}
                contentLabel="Actualizar Equipo"
            >
                <h2 style={{color: "black", fontSize: 35}}>Actualizar Equipo</h2>
                <form style={{
                    width: "90%",
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems: "center"}}>

                    

                <div className="info-1">
                    <div className="field">
                        <Form.Control required type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                    </div>

                    <div className="field">
                        <Form.Control required type="text" placeholder="Marca" value={marca} onChange={(e) => setMarca(e.target.value)} />
                    </div>
                </div>

                <div className="info-1">
                    <div className="field">
                        <Form.Control required type="text" placeholder="Tipo de maquina" value={tipo_maquina} onChange={(e) => setTipo_maquina(e.target.value)} />
                    </div>

                    <div className="field">
                        <Form.Control required type="text" placeholder="Cantidad" value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
                    </div>
                </div>

                <div className="info-1">
                    <div className="field">
                        <Form.Control required type="text" placeholder="Estado" value={estado} onChange={(e) => setEstado(e.target.value)} />
                    </div>

                    <div className="field">
                        <Form.Control required type="text" placeholder="Área" value={area} onChange={(e) => setArea(e.target.value)} />
                    </div>
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

export default Equipos