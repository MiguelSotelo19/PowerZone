import Container from "react-bootstrap/esm/Container";
import Menu from "./etiquetas/menu";
import Contenedor from "../Gerente/etiquetas/Contenedor";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import Planes from "../Common/Planes";
import axios from "axios";

function ModalMejorar({ show, onHide, datoscliente }) {
    //console.log("nivel membresía:", datoscliente.nivel_membresia);
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
              Mejorar membresía
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Nivel actual de membresía: {datoscliente.nivel_membresia}</h5>
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
              consectetur ac, vestibulum at eros.
            </p>
            {/*tengo planeado poner el <Planes/> aqui, pero sale con los botones de adquirir y asi y pues no xd*/}
          </Modal.Body>
          <Modal.Footer>
          <Button 
              variant="primary" 
              onClick={() => Swal.fire({
                  title: 'Nivel de membresía modificado',
                  icon: 'success',
                  confirmButtonText: 'Aceptar'
              })}
            >
              Cambiar membresía
            </Button>
            <Button onClick={onHide}>Cancelar</Button>
          </Modal.Footer>
        </Modal>
    );
}

function ClienteMembresias(){
    
    const urlMembresias = "http://localhost:8080/api/power/membresia/";
    const [ membresias, setMembresias ] = useState([]);
    const [modalShow, setModalShow] = React.useState(false);
    const datos_cliente = {
        nombre: 'Bryan Alexis Miranda Durán', 
        nivel_membresia: 'Plus',
        renovacion: "Fecha jaja salu2"
    };

    useEffect(() => {
      getCliente();
    }, []);
    
    const getCliente = async () => {
      const respuesta = await axios({
          method: 'GET',
          url: urlMembresias
      });
      console.log(respuesta.data.data[0])
      //setUser(respuesta.data.data);
    }
  
    return(
        
        <>
        <Menu/>
        <Container 
                className="main-content pb-5"
            >
                
            <h1 className="d-flex justify-content-center">Membresía</h1>
            <div style={{ width: '99vw' }}>
                <Contenedor 
        
                title1={'Nombre del cliente'}
                text1={datos_cliente.nombre} 
                title2={'Tipo de Membresía'}
                text2={datos_cliente.nivel_membresia} 
                title3={'Renovación'}
                text3={datos_cliente.renovacion} 
                title4={'Estado'}
                acciones={
                    <>
                        <Button className='me-1' variant="success">Activo</Button>{' '}
                        <Button variant="info" onClick={() => setModalShow(true)}>Cambiar membresía</Button>{' '}
                        
                    </>                    
                } />
                
                <ModalMejorar
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                            datoscliente={datos_cliente}
                />
            </div>
        
        </Container>
        </>
    )
}

export default ClienteMembresias;