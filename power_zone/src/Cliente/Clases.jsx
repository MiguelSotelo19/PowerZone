import Container from "react-bootstrap/esm/Container";
import Menu from "./etiquetas/menu";
import Contenedor from "../Gerente/etiquetas/Contenedor";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import Planes from "../Common/Planes";
import axios from "axios";

function ModalClase({ show, onHide, datosclase }) {
    console.log("nivel membresía:", datosclase.tipo_clase);
    return (
        <Modal
          show={show}
          onHide={onHide}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Inscribirse a clase
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Clase: {datosclase.nombre_clase}</h5>
            <h5>Instructor que imparte: {datosclase.nombre_profesor}</h5>
            <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
            <p>Horas de la clase: {datosclase.hora_inicio}</p>
            <p>Cupo: {datosclase.capacidad_maxima}</p>
            </div>
          </Modal.Body>
          <Modal.Footer>
          <Button 
              variant="success" 
              onClick={() => Swal.fire({
                  title: 'Inscrito a clase',
                  text:'Te has inscrito a la clase exitosamente',
                  icon: 'success',
                  confirmButtonText: 'Aceptar'
              }).then({
                //cerrar modal
              })

              
                }
            >
              Inscribirse a clase
            </Button>
            <Button  onClick={onHide}>Cancelar</Button>
          </Modal.Footer>
        </Modal>
    );
}

function ClienteClases() {
    const [modalShow, setModalShow] = React.useState(false);
    const [claseSelec, setClaseSelec] = React.useState(null);
    const [ clases, setClases ] = useState([]);

    const urlClases = "http://localhost:8080/api/power/clase/";
    useEffect(() => {
        getClase();
      }, []);
      
    const getClase = async () => {
    const respuesta = await axios({
        method: 'GET',
        url: urlClases
    });
    setClases(respuesta.data.data);
    console.log("clases: ",clases)
    }


    const datos_clases = [
        { nombre_inst: 'Bryan Alexis Miranda Durán', tipo_clase: 'Kick Boxing', limite_per: 20 },
        { nombre_inst: 'Bryan Alexis Miranda Durán', tipo_clase: 'Zumba', limite_per: 10 },
        { nombre_inst: 'Bryan Alexis Miranda Durán', tipo_clase: 'Otro', limite_per: 40 },
        { nombre_inst: 'Bryan Alexis Miranda Durán', tipo_clase: 'Zumba', limite_per: 20 },
        { nombre_inst: 'Bryan Alexis Miranda Durán', tipo_clase: 'Kick Boxing', limite_per: 10 }
    ];

    const handleShowModal = (clase) => {
        setClaseSelec(clase);
        setModalShow(true);
    };

    return (
        <>
            <Menu />
            <Container className="main-content d-flex flex-column align-items-center justify-content-center ">
            <div style={{ width: '99vw' }}>
                <h1 className="d-flex justify-content-center">Clases disponibles</h1>
                
                {clases.map((clase, index) => (
                    <Contenedor 
                        key={index}
                        title1={'Nombre de la clase'}
                        text1={clase.nombre_clase} 
                        title2={'Cupo máximo'}
                        text2={clase.capacidad_maxima} 
                        title3={'Horas de la clase'}
                        text3={clase.hora_inicio} 
                        title4={'Estado'}
                        acciones={
                            <>
                                <Button variant="success" onClick={() => handleShowModal(clase)}>
                                    Inscribirse a clase
                                </Button>{' '}
                            </>                    
                        }
                    />
                ))}
                
                {claseSelec && (
                    <ModalClase
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        datosclase={claseSelec}
                    />
                )}
            </div>
                
            </Container>
        </>
    );
}

export default ClienteClases;