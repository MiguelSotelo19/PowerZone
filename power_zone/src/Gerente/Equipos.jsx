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

function Equipos() {
    const urlEquipos = "http://localhost:8080/api/power/equipos/";
    const [ equipos, setEquipos ] = useState([]);

    const [ id_equipo, setId_equipo ] = useState("");
    const [ nombre, setNombre ] = useState("");
    const [ marca, setMarca ] = useState("");
    const [ tipo_maquina, setTipo_maquina ] = useState("");    
    const [ cantidad, setCantidad ] = useState("");
    const [ estado, setEstado ] = useState("");
    const [ area, setArea ] = useState("");

    //Traer datos de equipo
    useEffect(() => {     
        getEquipos();
    }, [])

    const getEquipos = async () => {
        const respuesta = await axios({
            method: 'GET',
            url: urlEquipos,
        });
        console.log(respuesta.data.data);
        setEquipos(respuesta.data.data);
    }

    //Modales
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modalActIsOpen, setActIsOpen] = React.useState(false);

    //Modal Registrar Cliente
    function openModal() {
        setId_equipo(undefined);
        setIsOpen(true);
    }

    function afterOpenModal() {
        subtitle.style.color = "#f00";
    }

    function closeModal() {
        setIsOpen(false);
    }

    //Modal Actualizar Cliente
    function openActModal(id, modelo_, marca_, cantidad_, estado_) {
        setId_equipo(id);
        setNombre(modelo_);
        setMarca(marca_);
        setCantidad(cantidad_);
        setEstado(estado_);

        setActIsOpen(true);
    }

    function afterOpenModalAct() {
        subtitle.style.color = "#f00";
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
        }else if(marca.trim() === ""){
            show_alerta("Escribe la marca", "warning");
        } /*else if(tipo_maquina.trim() === ""){
            show_alerta("Escribe el tipo de maquina", "warning");
        } */else if(cantidad < 0){
            show_alerta("Escribe la cantidad", "warning");
        } else if(estado.trim() === ""){
            show_alerta("Escribe el estado del equipo", "warning");
        } /*else if(area.trim() === ""){
            show_alerta("Escribe el área del equipo", "warning");
        }*/ else {
            parametros = {
                modelo: nombre,
                marca: marca,
                estado: estado,
                cantidad: cantidad,
                estatus: true
            }

            console.log(parametros)
            enviarSolicitud(metodo, parametros, urlEquipos);
        }
    }

    const enviarSolicitud = async(metodo, parametros, url, id_) => {
        event.preventDefault();
    
        if(metodo != "POST"){
            (id_ == undefined) ? url = url + id_equipo : url = url + id_;
        } 
        console.log(parametros);
        console.log(url);
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

            getEquipos();
        })
        .catch(function (error) {
            show_alerta("Error en la Solicitud", "error");
            console.log(error);
        });
    }

    //Filtrado
    const [searchTerm, setSearchTerm] = useState('');

    // Filtrar equipos
    const filteredEquipos = equipos.filter(equipo => 
        equipo.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        equipo.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
        equipo.cantidad.toString().includes(searchTerm) ||
        equipo.estado.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Actualizar
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const activarE = (id_, modelo_, marca_, cantidad_, estado_, estatus_) => {
        var parametros = {
            modelo: modelo_,
            marca: marca_,
            estado: estado_,
            cantidad: cantidad_,
            estatus: estatus_ == true ? false : true,
        }

        enviarSolicitud("PUT", parametros, urlEquipos, id_);
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
                    draggable="false"                    
                    />&nbsp;&nbsp;Agregar equipos</Button>{' '}
                    <Form.Control style={{ width: '30%', backgroundColor: 'rgb(217, 217, 217)', backgroundImage: `url(${lupa})`, 
                    backgroundRepeat: 'no-repeat', backgroundSize: '7vh', textAlign: 'center' }} type="text" placeholder="Buscar equipos" value={searchTerm} onChange={handleSearchChange} />
                </div>

                <h1 className="d-flex justify-content-center mt-5">Equipos de Gimnasio</h1>

                {filteredEquipos.map((equipo, i) => (
                <Contenedor 
                    key={equipo.id_equipo + i}
                    title1={'Modelo'}
                    text1={equipo.modelo} 
                    title2={'Marca'}
                    text2={equipo.marca} 
                    title3={'Cantidad'}
                    text3={equipo.cantidad} 
                    title4={'Estado'}
                    acciones={
                        <>
                            {equipo.estatus ? (
                                <Button className='me-1' variant="danger" onClick={() => activarE(equipo.id_equipo, equipo.modelo, equipo.marca, equipo.cantidad, equipo.estado, equipo.estatus)}>Desactivar</Button>
                            ) : (
                                <Button className='me-1' variant="success" onClick={() => activarE(equipo.id_equipo, equipo.modelo, equipo.marca, equipo.cantidad, equipo.estado, equipo.estatus)}>Activar</Button>
                            )}
                            <Button variant="warning" onClick={() => openActModal(equipo.id_equipo, equipo.modelo, equipo.marca, equipo.cantidad, equipo.estado)}>Editar</Button>{' '}
                        </>                    
                    }
                />
            ))}               
                                
                
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
                    <Button className="fw-bold fs-4 p-2 ms-5" variant="warning" onClick={() => validar("POST")}>Registrar</Button>{' '}
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
                        <Form.Control required type="text" placeholder="Estado" value={estado} onChange={(e) => setEstado(e.target.value)} />
                    </div>

                    <div className="field">
                        <Form.Control required type="text" placeholder="Cantidad" value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
                    </div>
                </div>

                {/*
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
                */}

                <div className="acciones">
                    <Button className="fw-bold fs-4 p-2" variant="danger">Cancelar</Button>{' '}
                    <Button className="fw-bold fs-4 p-2" variant="warning" onClick={() => validar("PUT")}>Actualizar</Button>{' '}
                </div>
                
                </form>
            </Modal>

        </>
    )
}

export default Equipos