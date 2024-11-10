import React, { useEffect, useState } from "react";
import axios from 'axios';


import Modal from "react-modal";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Menu from "../Empleado/etiquetas/Menu";
import Contenedor from "../Empleado/etiquetas/Contenedor";

//CSS

import './../Empleado/css/Clientes.css'

//Imágenes
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

function Clases() {
    const urlClases = "http://localhost:8080/api/power/clase/";
    const [ clases, setClases ] = useState([]);

    const[ instructor, setInstructor ] = useState('')
    const[ limite, setLimite ] = useState('')
    const[ tipo, setTipo ] = useState('')

    //Traer datos de equipo
    useEffect(() => {     
        getClases();
    }, [])

    const getClases = async () => {
        const respuesta = await axios({
            method: 'GET',
            url: urlClases,
        });
        console.log(respuesta.data.data);
        setClases(respuesta.data.data);
    }

    //Modal editar
    const [modalActIsOpen, setActIsOpen] = React.useState(false);
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openActModal() {
        setActIsOpen(true);
    }

    function afterOpenModalAct() {
        subtitle.style.color = "#f00";
    }

    function closeModalAct() {
        setActIsOpen(false);
    }

    //Modal añadir cliente
    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        subtitle.style.color = "#f00";
    }

    function closeModal() {
        setIsOpen(false);
    }

    //Filtrado
    const [searchTerm, setSearchTerm] = useState('');

    // Filtrar equipos
    const filteredClases = clases.filter(clase => 
        clase.nombre_clase.toLowerCase().includes(searchTerm.toLowerCase()) ||
        clase.hora_inicio.toLowerCase().includes(searchTerm.toLowerCase()) ||
        clase.nombre_profesor.toString().includes(searchTerm.toLowerCase()) ||
        clase.capacidad_maxima.toString().includes(searchTerm)
    );

    // Actualizar
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return(
        <>
            <Menu />

            <div className='main-content pb-5'>
                <div style={{ width: '99vw' }}></div>

                <div className='d-flex justify-content-end w-75'>
                    <Form.Control style={{ width: '40%', backgroundColor: 'rgb(217, 217, 217)', backgroundImage: `url(${lupa})`, 
                    backgroundRepeat: 'no-repeat', backgroundSize: '5vh', textAlign: 'center' }} type="text" placeholder="Buscar clases" value={searchTerm} onChange={handleSearchChange} />
                </div>

                <h1 className="d-flex justify-content-center mt-5">Clases</h1>

                {[...new Map(filteredClases.map(clase => [clase.nombre_clase, clase])).values()].map((clase, i) => (
                    <Contenedor 
                        key={clase.id + i}
                        title1={'Instructor'}
                        text1={clase.nombre_profesor} 
                        title2={'Tipo de Clase'}
                        text2={clase.nombre_clase} 
                        title3={'Limite de personas'}
                        text3={clase.capacidad_maxima} 
                        title4={'Acciones'}
                        acciones={
                            <>
                                <Button variant="warning" onClick={openActModal}>Editar</Button>{' '}
                                <Button className='me-1' onClick={openModal} variant="success">Activar</Button>{' '}
                            </>                    
                        } 
                    />
                ))}    

            </div>

            <Modal
                isOpen={modalActIsOpen}
                onAfterOpen={afterOpenModalAct}
                onRequestClose={closeModalAct}
                style={customStyles}
                contentLabel="Editar clase"
            >
                <h2 style={{color: "black", fontSize: 35}}>Editar clase</h2>
                <form style={{
                    width: "90%",
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems: "center"}}>

                    
                <div className="field-1">
                    <Form.Control required type="text" placeholder="Instructor" value={instructor} onChange={(e) => setInstructor(e.target.value)} />
                </div>

                <div className="info-1">
                    <div className="field">
                        <Form.Control required type="text" placeholder="Límite de personas" value={limite} onChange={(e) => setLimite(e.target.value)} />
                    </div>

                    <div className="field">
                        <Form.Control required type="text" placeholder="Tipo" value={tipo} onChange={(e) => setTipo(e.target.value)} />
                    </div>
                </div>

                <div className="acciones">
                    <Button className="fw-bold fs-4 p-2" variant="warning">Actualizar</Button>{' '}
                </div>
                
                </form>
            </Modal>

            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Añadir cliente"
            >
                <h2 style={{color: "black", fontSize: 35}}>Añadir cliente</h2>
                <form style={{
                    width: "90%",
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems: "center"}}>

                    
                <div className="field-1">
                    <Form.Control required type="text" placeholder="Número de membresía" onChange={(e) => setNumMembresia(e.target.value)} />
                </div>

                <div className="info-1">
                    <div className="field">
                        <Form.Control required type="text" placeholder="0:00 am -0:00 pm" onChange={(e) => setHorario(e.target.value)} />
                    </div>

                    <div className="field">
                        <Form.Control required type="text" placeholder="Zumba" onChange={(e) => setClase(e.target.value)} />
                    </div>
                </div>

                <div className="acciones">
                    <Button className="fw-bold fs-4 p-2" variant="warning">Añadir</Button>{' '}
                </div>
                
                </form>
            </Modal>
        </>
    )
}

export default Clases