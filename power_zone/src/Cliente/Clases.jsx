import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Menu from "./etiquetas/menu";
import { Modal, Button } from 'react-bootstrap';
import { show_alerta } from "../Common/js/funciones";
import axios from "axios";

import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import esLocale from '@fullcalendar/core/locales/es';

const ClienteClases = () => {
    const urlClases = "http://localhost:8080/api/power/clase/";
    const urlPlanificacion = "http://localhost:8080/api/power/planificacion/";

    const [showModal, setShowModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [events, setEvents] = useState([]);

    let user = JSON.parse(localStorage.getItem("usuario"));
    console.log(user);
    
    useEffect(() => {
        getClase();
    }, []);

    const getClase = async () => {
        try {
            const respuesta = await axios.get(urlClases);
            const clases = respuesta.data.data;

            const eventos = await Promise.all(clases.map(async clase => {
                const [horaInicio, horaFin] = clase.hora_inicio.split(' - ');
                const [inicioHora, inicioMinuto] = horaInicio.split(':');
                const [finHora, finMinuto] = horaFin.split(':');

                const startTime = `${inicioHora}:${inicioMinuto}:00`;
                const endTime = `${finHora}:${finMinuto}:00`;

                var claseVP = await getClaseP();
                var agenda = false;
                claseVP = claseVP.filter(clas => clas.clase.id == clase.id && clas.cliente.id == user.id);
                
                if(claseVP.length !== 0){
                    agenda = true;
                }

                return {
                    title: `${clase.nombre_clase} - ${clase.nombre_profesor}`,
                    rrule: {
                        freq: 'daily',  
                        dtstart: new Date().toISOString().split('T')[0],
                        until: '2024-12-31',
                    },
                    duration: `${finHora - inicioHora}:00`,
                    startTime,
                    endTime,
                    extendedProps: {
                        id: clase.id,
                        capacidad_maxima: clase.capacidad_maxima,
                        estatus: clase.estatus,
                        nombre_profesor: clase.nombre_profesor,
                        nombre_clase: clase.nombre_clase,
                        horas: clase.hora_inicio,
                        planificacion: clase.planificacionBeans,
                        agendado: agenda                   
                    },
                };
            }));

            setEvents(eventos);
        } catch (error) {
            console.error('Error obteniendo las clases:', error);
        }
    };

    const getClaseP = async () => {
        const respuesta = await axios({
            method: 'GET',
            url: urlPlanificacion
        });

        console.log(respuesta.data.data);
        return respuesta.data.data;
    }

    const handleEventClick = (arg) => {
        const fechaSeleccionada = arg.event.start;
        console.log("Evento seleccionado:", arg.event.extendedProps); 
    
        setSelectedEvent({
            ...arg.event.extendedProps,
            fecha: fechaSeleccionada,
        });
        setShowModal(true); 
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedEvent(null);
    };

    const agendarClase = async (idClase, fecha, hora) => {
        var clasePlanificacion = await getClaseP();
        var parametros;

        if(clasePlanificacion.length > 0){
            clasePlanificacion = clasePlanificacion.filter(claseP => claseP.clase.id === idClase && claseP.dia === (fecha + " " + hora));

            console.log("CANTIDAD ENCONTRADA: "+clasePlanificacion.length);
            
            if(clasePlanificacion.find(claseP => claseP.cliente.id == user.id) != undefined) {
                closeModal();
                show_alerta("Ya te encuentras inscrito a esta clase", "warning");                
            } else {
                if(clasePlanificacion.length === 0) {
                    parametros = {
                        dia: fecha + " " + hora,
                        clase: {
                            id: idClase
                        },
                        cliente: {
                            id: user.id
                        },
                    }

                    enviarSolicitud("POST", parametros, urlPlanificacion);
                    closeModal();
                    show_alerta("Te has inscrito correctamente", "success"); 
                }
            }            
        } else {
            parametros = {
                dia: fecha + " " + hora,
                clase: {
                    id: idClase
                },
                cliente: {
                    id: user.id
                },
            }
            enviarSolicitud("POST", parametros, urlPlanificacion);
            closeModal();
            show_alerta("Te has inscrito correctamente", "success"); 
        }
    }

    const cancelarInscripcion = async (idClase_, fecha_) => {
        var clasePlanificacion = await getClaseP();

        if(clasePlanificacion.length > 0){
            clasePlanificacion = clasePlanificacion.find(claseP => claseP.clase.id === idClase_ && claseP.dia === fecha_);
            
            enviarSolicitud("DELETE", null, urlPlanificacion, clasePlanificacion.id);
        }
    }

    const enviarSolicitud = async (metodo, parametros, url_, id_) => {
        event.preventDefault();

        if(metodo != "POST" && id_) {
            url_ = url_ + id_;
        }
        
        await axios({
            method: metodo,
            url: url_,
            data: parametros
        }).then(function (respuesta) {
            var tipo = respuesta.data[0];
            var msj = respuesta.data[1];
            if(tipo === "success"){
                show_alerta("Cambios realizados correctamente", "success");         
            }
        })
        .catch(function (error) {
            show_alerta("Error en la Solicitud", "error");
            console.log(error);
        });
        closeModal();
        getClase();
    }

    return (
        <>
            <Menu />
            <Container className="main-content d-flex flex-column align-items-center justify-content-center">
                <div style={{ width: '99vw' }}>
                    <h1 className="d-flex justify-content-center">Clases disponibles</h1>

                    <FullCalendar
                        plugins={[timeGridPlugin]}
                        locale={esLocale}
                        initialView="timeGridWeek"
                        events={events}
                        eventClick={handleEventClick}
                        headerToolbar={{
                            left: '',
                            center: 'title',
                            right: ''
                        }}
                        slotMinTime="07:00:00"
                        slotMaxTime="19:00:00"
                        height="auto"
                        allDaySlot={false}
                        contentHeight="auto"
                        expandRows={true}
                    />

                    <div className="mb-5"></div>

                    <Modal show={showModal} onHide={closeModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Detalles de la clase</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {selectedEvent ? (
                                <>
                                    <div className="d-flex justify-content-evenly">
                                        <h5>Clase: {selectedEvent.nombre_clase}</h5>
                                        {selectedEvent.agendado ? (
                                            <Button variant="danger" onClick={() => cancelarInscripcion(selectedEvent.id, selectedEvent.fecha.toLocaleDateString()+" "+selectedEvent.fecha.toLocaleTimeString())} >Cancelar Inscripción</Button>
                                        ) : (<></>)}
                                    </div>
                                    <h5>Instructor: {selectedEvent.nombre_profesor}</h5>
                                    <p>Cupo máximo: {selectedEvent.capacidad_maxima}</p>
                                    <p>ID: {selectedEvent.id}</p>
                                    <p>Estado: {selectedEvent.estatus}</p>
                                    <p>Fecha seleccionada: {selectedEvent.fecha.toLocaleDateString()}</p>
                                    <p>Hora de inicio: {selectedEvent.fecha.toLocaleTimeString()}</p>
                                </>
                            ) : (
                                <p>Selecciona una clase en el calendario.</p>
                            )}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={closeModal}>
                                Cerrar
                            </Button>
                            {
                                selectedEvent && selectedEvent.agendado ? 
                                (<div>Ya te encuentras inscrito</div>) 
                                : (<Button variant="primary" onClick={() => agendarClase(selectedEvent.id, selectedEvent.fecha.toLocaleDateString(), selectedEvent.fecha.toLocaleTimeString()) }>
                                Agendar clase
                            </Button>)
                            }
                        </Modal.Footer>
                    </Modal>
                </div>
            </Container>
        </>
    );
};

export default ClienteClases;
