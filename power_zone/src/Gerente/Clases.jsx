import React, { useEffect, useState } from "react";
import axios from 'axios';
import { show_alerta } from "../Common/js/funciones";

import Modal from "react-modal";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Menu from "./components/Menu"
import Contenedor from "../Common/components/Contenedor"

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

function Clases() {
    const urlClases = "http://localhost:8080/api/power/clase/";
    const [ clases, setClases ] = useState([]);

    const [ idClase, setIdClase ] = useState(0);
    const [ hora_inicio, setHora_inicio] = useState(0);
    const[ instructor, setInstructor ] = useState('')
    const[ limite, setLimite ] = useState('')
    const[ nombre, setNombre ] = useState('')

    //Traer datos de equipo
    useEffect(() => {     
        getClases();
    }, [])

    const getClases = async () => {
        const respuesta = await axios({
            method: 'GET',
            url: urlClases,
        });
        setClases(respuesta.data.data);
    }

    //Modal editar
    const [modalActIsOpen, setActIsOpen] = React.useState(false);

    function openActModal(id_, nombre_, instructor_, capacidad_, horas) {
        setIdClase(id_);
        setNombre(nombre_);
        setInstructor(instructor_);
        setLimite(capacidad_);
        setHora_inicio(horas);
        setActIsOpen(true);
    }

    function closeModalAct() {
        setActIsOpen(false);
    }

    //Envío de formulario
    const validar = (metodo) => {
        event.preventDefault();

        var parametros;
        if(nombre.trim() === ""){
            show_alerta("Escribe el modelo del equipo", "warning");
        }else if(instructor.trim() === ""){
            show_alerta("Escribe el instructor", "warning");
        } else if(limite === 0 || limite === null){
            show_alerta("Escribe la capacidad máxima", "warning");
        } else {
            parametros = {
                hora_inicio: hora_inicio,
                nombre_clase: nombre,
                nombre_profesor: instructor,
                capacidad_maxima: limite
            }

            enviarSolicitud(metodo, parametros, urlClases);
        }
    }

    const enviarSolicitud = async(metodo, parametros, url) => {
        event.preventDefault();
    
        url = url + idClase;

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
            closeModalAct();

            getClases();
        })
        .catch(function (error) {
            show_alerta("Error en la Solicitud", "error");
        });
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
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '30%' }}>
                        <img src={lupa} draggable="false" alt="Buscar" style={{ width: '4vh', height: '3vh' }} />
                        <Form.Control type="text" placeholder="Buscar clientes" value={searchTerm} onChange={handleSearchChange} 
                            style={{ backgroundColor: 'rgb(217, 217, 217)', borderRadius: '12px',}}/>
                    </div>
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
                                <Button variant="warning" onClick={() => openActModal(clase.id, clase.nombre_clase, clase.nombre_profesor, clase.capacidad_maxima, clase.hora_inicio)}>Editar</Button>{' '}
                                <Button className='me-1' variant="success">Activar</Button>{' '}
                            </>                    
                        } 
                    />
                ))}    

            </div>

            <Modal
                isOpen={modalActIsOpen}
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
                    <Form.Control required type="text" placeholder="Nombre de clase" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </div>

                <div className="info-1">
                    <div className="field">
                        <Form.Control required type="text" placeholder="Límite de personas" value={limite} onChange={(e) => setLimite(e.target.value)} />
                    </div>

                    <div className="field">
                        <Form.Control required type="text" placeholder="Instructor" value={instructor} onChange={(e) => setInstructor(e.target.value)} />
                    </div>
                </div>

                <div className="acciones">
                    <Button className="fw-bold fs-4 p-2" variant="warning" onClick={() => validar("PUT")}>Actualizar</Button>{' '}
                </div>
                
                </form>
            </Modal>

        </>
    )
}

export default Clases