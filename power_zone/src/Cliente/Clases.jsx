import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Menu from "./etiquetas/menu";
import { Modal, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import axios from "axios";

import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import esLocale from '@fullcalendar/core/locales/es';

const ClienteClases = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [events, setEvents] = useState([]);

    const urlClases = "http://localhost:8080/api/power/clase/";
    useEffect(() => {
        getClase();
    }, []);

    const getClase = async () => {
        try {
            const respuesta = await axios.get(urlClases);
            const clases = respuesta.data.data;

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
                        capacidad_maxima: clase.capacidad_maxima,
                        estatus: clase.estatus,
                        nombre_profesor: clase.nombre_profesor,
                        nombre_clase: clase.nombre_clase,
                    },
                };
            });

            setEvents(eventos);
        } catch (error) {
            console.error('Error obteniendo las clases:', error);
        }
    };

    const handleEventClick = (arg) => {
        setSelectedEvent(arg.event.extendedProps); // Guarda los detalles del evento seleccionado
        setShowModal(true); // Muestra el modal
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedEvent(null);
    };

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
                        eventClick={handleEventClick} // Evento que se activa al hacer clic en un evento
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

                    {/* Modal para mostrar información del evento */}
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
                                </>
                            ) : (
                                <p>Selecciona una clase en el calendario.</p>
                            )}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={closeModal}>
                                Cerrar
                            </Button>
                            <Button variant="primary" onClick={() => alert('Agendar clase')}>
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
