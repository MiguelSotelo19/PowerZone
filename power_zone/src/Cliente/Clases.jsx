import Container from "react-bootstrap/esm/Container";
import Menu from "./etiquetas/menu";
import Contenedor from "../Gerente/etiquetas/Contenedor";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from "react";
import Swal from 'sweetalert2';
import Planes from "../Common/Planes";

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
            <h5>Clase: {datosclase.tipo_clase}</h5>
            <h5>Instructor que imparte: {datosclase.nombre_inst}</h5>
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
              consectetur ac, vestibulum at eros.
            </p>
          </Modal.Body>
          <Modal.Footer>
          <Button 
              variant="success" 
              onClick={() => Swal.fire({
                  title: 'Inscrito a clase',
                  text:'Te has inscrito a la clase exitosamente',
                  icon: 'success',
                  confirmButtonText: 'Aceptar'
              })}
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
                
                {datos_clases.map((clase, index) => (
                    <Contenedor 
                        key={index}
                        title1={'Nombre del cliente'}
                        text1={clase.nombre_inst} 
                        title2={'Tipo de Membresía'}
                        text2={clase.tipo_clase} 
                        title3={'Renovación'}
                        text3={clase.limite_per} 
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