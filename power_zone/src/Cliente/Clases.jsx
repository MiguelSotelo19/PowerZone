import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Menu from "./components/menu";
import { Modal, Button } from 'react-bootstrap';
import { show_alerta } from "../Common/js/funciones";
import axios from "axios";

import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import esLocale from '@fullcalendar/core/locales/es';

import './css/calendario.css';

const ClienteClases = () => {
    const urlClases = "http://localhost:8080/api/power/clase/";
    const urlMembresias = "http://localhost:8080/api/power/membresia/";
    const urlPlanificacion = "http://localhost:8080/api/power/planificacion/";

    const [ showModal, setShowModal ] = useState(false);
    const [ selectedEvent, setSelectedEvent ] = useState(null);
    const [ events, setEvents ] = useState([]);
    const amarillo = "#ffcd6c";
    const azul = "#64b7d4";
    const gris = "#e0e1ce";

    let user = JSON.parse(localStorage.getItem("usuario"));
    
    useEffect(() => {
        getMembresiaUser();
        getClase();

        const customSymbolButton = document.querySelector('.fc-customSymbol-button');
        if (customSymbolButton) {
            customSymbolButton.innerHTML = `
                <div style="display: flex; gap: 10px; align-items: center;">
                    <div style="display: flex; align-items: center;">
                        <div style="width: 15px; height: 15px; background-color: ${amarillo}; margin-right: 5px; border: 1px solid #000;"></div>
                        <span>Inscrito</span>
                    </div>
                    <div style="display: flex; align-items: center;">
                        <div style="width: 15px; height: 15px; background-color: ${azul}; margin-right: 5px; border: 1px solid #000;"></div>
                        <span>Disponible</span>
                    </div>
                    <div style="display: flex; align-items: center;">
                        <div style="width: 15px; height: 15px; background-color: ${gris}; margin-right: 5px; border: 1px solid #000;"></div>
                        <span>No disponible</span>
                    </div>
                </div>
            `;
            customSymbolButton.style.display = 'flex';
            customSymbolButton.style.justifyContent = 'flex-end';
            customSymbolButton.style.alignItems = 'center';
        }
    }, []);

    const getMembresiaUser = async () => {
        const respuesta = (await axios({
            method: 'GET',
            url: urlMembresias 
        })).data.data;

        let mem = respuesta.find(mem => 
            mem.clienteBeans.some(m => m.id == user.id)
        )

        return mem.tipo_membresia;
    }

    function convertirFechaPersonalizada(fechaStr) {
        const regex = /(\d{2})\/(\d{2})\/(\d{4}) (\d{1,2}):(\d{2}):(\d{2}) (a\.m\.|p\.m\.)/i;
        const match = fechaStr.match(regex);
    
        if (!match) return null;
    
        let [_, dia, mes, anio, horas, minutos, segundos, ampm] = match;
    
        horas = parseInt(horas);
        if (ampm.toLowerCase() === "p.m." && horas !== 12) horas += 12;
        if (ampm.toLowerCase() === "a.m." && horas === 12) horas = 0;
    
        const isoString = `${anio}-${mes}-${dia}T${horas.toString().padStart(2, "0")}:${minutos}:${segundos}`;
        return new Date(isoString);
    }
    

    const getClase = async () => {
        try {
            const membresia = await getMembresiaUser();
            const respuesta = await axios.get(urlClases);
            const clases = respuesta.data.data;
    
            const today = new Date();
            const startOfWeek = new Date(today);
            const daysOfWeek = Array.from({ length: 7 - today.getDay() }, (_, i) => {
                const date = new Date(startOfWeek);
                date.setDate(today.getDate() + i);
                return date;
            });
    
            const eventos = [];

            for (let day of daysOfWeek) {
                const fechaActual = day.toLocaleDateString('en-CA');
                
                const dayEventos = await Promise.all(clases.map(async clase => {
                    const [horaInicio, horaFin] = clase.hora_inicio.split(' - ');
                    const [inicioHora, inicioMinuto] = horaInicio.split(':');
                    const [finHora, finMinuto] = horaFin.split(':');

                    const startTime = `${inicioHora}:${inicioMinuto}:00`;
                    const endTime = `${finHora}:${finMinuto}:00`;

                    var claseVP = await getClaseP();
                    var agenda = "Disponible";
                    var color = azul;

                    switch(membresia){
                        case "Estándar":
                            agenda = "Mejorar";
                            color = gris;
                        break;

                        case "Medium":
                            let clasesSauna = claseVP.filter(clas =>
                                clase.nombre_clase.toLowerCase().includes("sauna")
                            );

                            if(clasesSauna.length > 0){
                                agenda = "Mejorar";
                                color = gris;
                            } 

                            let claseL = claseVP.filter(clas =>
                                clas.clase.id === clase.id &&
                                new Date(convertirFechaPersonalizada(clas.dia)).setHours(0, 0, 0, 0) === new Date(day).setHours(0, 0, 0, 0)
                            );

                            claseVP = claseVP.filter(clas =>
                                clas.clase.id === clase.id &&
                                clas.cliente.id === user.id &&
                                new Date(convertirFechaPersonalizada(clas.dia)).setHours(0, 0, 0, 0) === new Date(day).setHours(0, 0, 0, 0)
                            );                
        
                            if (claseVP.length !== 0) {
                                agenda = "Agendado";
                                color = amarillo;
                            }
        
                            if (new Date(`${fechaActual}T${startTime}`).setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0)) {
                                if (new Date(`${fechaActual}T${startTime}`) < new Date()) {
                                    agenda = "No disponible";
                                    color = gris;
                                }
                            }

                            if(clase.capacidad_maxima == claseL.length){
                                agenda = "Cupo alcanzado";
                                color = gris;
                            }
                        break;

                        case "Plus":
                            let claseR = claseVP.filter(clas =>
                                clas.clase.id === clase.id &&
                                new Date(convertirFechaPersonalizada(clas.dia)).setHours(0, 0, 0, 0) === new Date(day).setHours(0, 0, 0, 0)
                            );

                            claseVP = claseVP.filter(clas =>
                                clas.clase.id === clase.id &&
                                clas.cliente.id === user.id &&
                                new Date(convertirFechaPersonalizada(clas.dia)).setHours(0, 0, 0, 0) === new Date(day).setHours(0, 0, 0, 0)
                            );
        
                            if (claseVP.length !== 0) {
                                agenda = "Agendado";
                                color = amarillo;
                            }
        
                            if (new Date(`${fechaActual}T${startTime}`).setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0)) {
                                if (new Date(`${fechaActual}T${startTime}`) < new Date()) {
                                    agenda = "No disponible";
                                    color = gris;
                                }
                            }

                            if(clase.capacidad_maxima == claseR.length){
                                agenda = "Cupo alcanzado";
                                color = gris;
                            }
                        break;
                    }

                    return {
                        title: `${clase.nombre_clase} - ${clase.nombre_profesor}`,
                        start: `${fechaActual}T${startTime}`,
                        end: `${fechaActual}T${endTime}`,
                        backgroundColor: color,
                        borderColor: color,
                        textColor: "black",
                        extendedProps: {
                            id: clase.id,
                            capacidad_maxima: clase.capacidad_maxima,
                            estatus: clase.estatus,
                            nombre_profesor: clase.nombre_profesor,
                            nombre_clase: clase.nombre_clase,
                            horas: clase.hora_inicio,
                            planificacion: clase.planificacionBeans,
                            agendado: agenda,
                        },
                    };
                }));

                eventos.push(...dayEventos);
            }

            setEvents(eventos);
        } catch (error) {
            console.error('Error obteniendo las clases');
        }
    };
    
    

    const getClaseP = async () => {
        const respuesta = await axios({
            method: 'GET',
            url: urlPlanificacion
        });

        return respuesta.data.data;
    }

    const handleEventClick = (arg) => {
        const fechaSeleccionada = arg.event.start;
    
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

        if(clasePlanificacion.length > 0){
            clasePlanificacion = clasePlanificacion.filter(claseP => claseP.clase.id === idClase && claseP.dia === (fecha + " " + hora));

            if(clasePlanificacion.find(claseP => claseP.cliente.id == user.id) != undefined) {
                closeModal();
                show_alerta("Ya te encuentras inscrito a esta clase", "warning");                
            } else {
                if(clasePlanificacion.length === 0) {
                    enviarInscripcion(fecha + " " + hora, idClase); 
                } else {
                    var claseFind = events.find(claseE => claseE.extendedProps.id === clasePlanificacion[0].clase.id);
                    if(clasePlanificacion.length < claseFind.extendedProps.capacidad_maxima){
                        enviarInscripcion(fecha + " " + hora, idClase);
                    } else {
                        show_alerta("Cupo máximo alcanzado", "warning");
                    }
                }
            }            
        } else {
            enviarInscripcion(fecha + " " + hora, idClase);
        }
    }

    const enviarInscripcion = (fecha_, idClase_) => {
        var parametros = {
            dia: fecha_,
            clase: {
                id: idClase_
            },
            cliente: {
                id: user.id
            },
        }

        enviarSolicitud("POST", parametros, urlPlanificacion);
        closeModal();
        show_alerta("Te has inscrito correctamente", "success"); 
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
                        initialView="timeGridDay"
                        events={events}
                        eventClick={handleEventClick}
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'customSymbol'
                        }}
                        customButtons={{
                            customSymbol: {
                                text: '',
                            },
                        }}
                        slotMinTime="07:00:00"
                        slotMaxTime="19:00:00"
                        height="auto"
                        allDaySlot={false}
                        contentHeight="auto"
                        expandRows={true}
                        validRange={{
                            start: new Date().toLocaleDateString('en-CA'), 
                            end: (() => {
                                const today = new Date();
                                const endOfWeek = new Date(today.setDate(today.getDate() + (7 - today.getDay()))); 
                                return endOfWeek.toISOString().split('T')[0];
                            })(),
                        }}
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
                                        {selectedEvent.agendado == "Agendado" ? (
                                            <Button variant="danger" onClick={() => cancelarInscripcion(selectedEvent.id, selectedEvent.fecha.toLocaleDateString()+" "+selectedEvent.fecha.toLocaleTimeString())} >Cancelar Inscripción</Button>
                                        ) : (<></>)}
                                    </div>
                                    <h5>Instructor: {selectedEvent.nombre_profesor}</h5>
                                    <p>Cupo máximo: {selectedEvent.capacidad_maxima}</p>
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
                            {selectedEvent ? (
                                (() => {
                                    switch (selectedEvent.agendado) {
                                        case "Agendado":
                                            return <div>Ya te encuentras inscrito</div>;
                                        case "No disponible":
                                            return <div>No disponible</div>;
                                        case "Disponible":
                                            return (
                                                <Button
                                                    variant="primary"
                                                    onClick={() =>
                                                        agendarClase(
                                                            selectedEvent.id,
                                                            selectedEvent.fecha.toLocaleDateString(),
                                                            selectedEvent.fecha.toLocaleTimeString()
                                                        )
                                                    }
                                                >
                                                    Agendar clase
                                                </Button>
                                            );
                                        case "Mejorar":
                                            return <div>Mejora tu membresía para tener acceso</div>;
                                        case "Cupo alcanzado":
                                            return <div>Cupo máximo alcanzado</div>
                                        default:
                                            return <></>;
                                    }
                                })()
                            ) : (
                                <></>
                            )}
                        </Modal.Footer>

                    </Modal>
                </div>
            </Container>
        </>
    );
};

export default ClienteClases;
