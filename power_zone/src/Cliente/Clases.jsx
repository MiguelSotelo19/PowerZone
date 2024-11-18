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
            console.log(clases);

            const eventos = clases.map(clase => {
                const [horaInicio, horaFin] = clase.hora_inicio.split(' - ');
                const [inicioHora, inicioMinuto] = horaInicio.split(':');
                const [finHora, finMinuto] = horaFin.split(':');

                const startTime = `${inicioHora}:${inicioMinuto}:00`;
                const endTime = `${finHora}:${finMinuto}:00`;

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
                        planificacion: clase.planificacionBeans                        
                    },
                };
            });

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
        console.log("Fecha seleccionada:", fechaSeleccionada);
    
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
            clasePlanificacion = clasePlanificacion.find(claseP => claseP.fk_id_clase === idClase);
            
            console.log(clasePlanificacion);
        } else {
            console.log("HOLA");

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
        }
    }

    const enviarSolicitud = async (metodo, parametros, urlPlanificacion) => {
        event.preventDefault();

        console.log(parametros);
        
        await axios({
            method: metodo,
            url: urlPlanificacion,
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

                    {/* Modal para mostrar información de la clase */}
                    <Modal show={showModal} onHide={closeModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Detalles de la clase</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {selectedEvent ? (
                                <>
                                    <h5>Clase: {selectedEvent.nombre_clase}</h5>
                                    <h5>Instructor: {selectedEvent.nombre_profesor}</h5>
                                    <p>Cupo máximo: {selectedEvent.capacidad_maxima}</p>
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
                            <Button variant="primary" onClick={() => agendarClase(selectedEvent.id, selectedEvent.fecha.toLocaleDateString(), selectedEvent.fecha.toLocaleTimeString()) }>
                                Agendar clase
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </Container>
        </>
    );
};

export default ClienteClases;
