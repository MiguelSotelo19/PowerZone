import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Menu from "./components/Menu"
import Contenedor from "../Common/components/Contenedor"
import Swal from "sweetalert2";

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

function Membresias() {
    const urlClientes = "http://localhost:8080/api/power/cliente/";
    const urlUpdate = "http://localhost:8080/api/power/cliente/updatem/";
    const urlMembresias = "http://localhost:8080/api/power/membresia/";

    const [ clientes, setClientes ] = useState([]);
    const [ membresiaCliente, setMembresiaCliente ] = useState([]);
    const [ membresias, setMembresias ] = useState([]);
    //const [searchTerm, setSearchTerm] = useState('');
    const [ filteredClientes, setFilteredClientes ] = useState([]);

    const [ membresia, setMembresia ] = useState([]);
    const [ num_tarjeta, setNumTarjeta ] = useState("");
    const [ cvv, setCVV ] = useState(0);
    const [ tipo_tarjeta, setTipoTarjeta ] = useState("");
    const [ fecha_venc, setFechaVenc ] = useState("");
    const [ identificador, setIdentificador] = useState("");

    let user = JSON.parse(localStorage.getItem("Cliente"));

    useEffect(() => {     
        getClientes();
        getMembresias();
    }, [])

    const getClientes = async () => {
        const respuesta = await axios({
            method: 'GET',
            url: urlClientes,
        });
        setClientes(respuesta.data.data);
    }

    const getMembresias = async () => {
        const respuesta = await axios({
            method: 'GET',
            url: urlMembresias,
        });
        setMembresias(respuesta.data.data);
        setClienteMembresias(respuesta.data.data);
    }

    const setClienteMembresias = async (membresiasB) => {
    
        if (!Array.isArray(membresiasB)) {
            membresiasB = [membresiasB];
        }
    
        const clientesConMembresia = [];
    
        for (const membresia of membresiasB) {
            if (membresia.clienteBeans && membresia.clienteBeans.length > 0) {
                for (const cliente of membresia.clienteBeans) {
                    const clienteMembresia = {
                        // Cliente
                        idC: cliente.id,
                        nombre: cliente.nombre,
                        correo: cliente.correo,
                        telefono: cliente.telefono,
                        numero_tarjeta: cliente.numero_tarjeta,
                        vencimiento: cliente.vencimiento,
                        cvv: cliente.cvv,
                        identificadorusuario: cliente.identificadorusuario,
                        rol: cliente.rol,
                        adquisicion: cliente.adquisicion,
                        cotrasenia: cliente.cotrasenia,
                        estatus: cliente.estatus,
                        tipo_tarjeta: cliente.tipo_tarjeta,
                        // Membresía
                        idM: membresia.id,
                        tipo_membresia: membresia.tipo_membresia,
                        costo: membresia.costo,
                    };
                    clientesConMembresia.push(clienteMembresia);
                }
            }
        }
    
        setMembresiaCliente(clientesConMembresia);
    };

    //Modales
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modalActIsOpen, setActIsOpen] = React.useState(false);

    //Modal Registrar Cliente
    function openModal(cliente1) {  
        setIdentificador(cliente1.identificadorusuario);
        setIsOpen(true);
      }

    function closeModal() {
        setIsOpen(false);
    }

    //Filtrado
    const [searchTerm, setSearchTerm] = useState('');

    // Filtrar membresia
    useEffect(() => {
        setFilteredClientes(
            membresiaCliente.filter(cliente =>
                (cliente.nombre && cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (cliente.identificadorusuario && cliente.identificadorusuario.toLowerCase().includes(searchTerm.toLowerCase()))
            )
        );
    }, [membresiaCliente, searchTerm]);

    const activarDesactivarC = async (cliente, desactivar) => {
        Swal.fire({
            title: desactivar ? '¿Desactivar Cliente?' : '¿Activar Cliente?',
            text: desactivar
                ? `El Cliente ${cliente.nombre} será desactivado.`
                : `El Cliente ${cliente.nombre} será activado.`,
            icon: 'warning',
            confirmButtonText: desactivar ? 'Desactivar Cliente' : 'Activar Cliente',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
        }).then(async (result) => {
            if (result.isConfirmed) {
                activarC(
                    cliente.idC,
                    cliente.nombre,
                    cliente.correo,
                    cliente.cotrasenia,
                    cliente.identificadorusuario,
                    cliente.telefono,
                    cliente.membresia,
                    cliente.cvv,
                    cliente.numero_tarjeta,
                    cliente.estatus
                );
    
                Swal.fire({
                    title: desactivar ? 'Cliente desactivado' : 'Cliente activado',
                    text: desactivar
                        ? `El Cliente ${cliente.nombre} ha sido desactivado con éxito.`
                        : `El Cliente ${cliente.nombre} ha sido activado con éxito.`,
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                });
            }
        });
    }

    const activarC = (id_, nombre_, correo_, contrasenia_, identificadorusuario_, telefono_, membresia_, cvv_, numero_tarjeta_, estatus_) => {
        var parametros = {
            nombre: nombre_,
            cotrasenia: contrasenia_,
            correo: correo_,
            identificadorusuario: identificadorusuario_,
            rol: 'Cliente',
            telefono: telefono_,
            estatus: !estatus_,
            cvv: parseInt(cvv_),
            numero_tarjeta: numero_tarjeta_,
        };
        
        enviarSolicitud("PUT", parametros, urlClientes, id_);
    };    

    // Actualizar búsqueda
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const validar = (metodo, event) => {
        event.preventDefault();

        if (!membresia) {
            Swal.fire("Campo Membresía vacío", "Selecciona un tipo de membresía", "warning");
            return;
        }
        if (!num_tarjeta || num_tarjeta.trim() === "" || num_tarjeta.length < 16) {
            Swal.fire("Campo Número de tarjeta inválido", "Escribe un número de tarjeta válido de 16 dígitos", "warning");
            return;
        }
        if ((!cvv || cvv==="") || cvv.length < 3) {
            Swal.fire("Campo CVV inválido", "Escribe un CVV válido de 3 digitos", "warning");
            return;
        }
        if (!tipo_tarjeta || tipo_tarjeta.trim() === "") {
            Swal.fire("Campo Tipo de tarjeta vacío", "Seleccione el tipo de tarjeta", "warning");
            return;
        }
        if (!fecha_venc || fecha_venc.trim() === "") {
            Swal.fire("Campo Fecha de vencimiento inválido", "Escribe la fecha de vencimiento", "warning");
            return;
        }

        const parametros = {
            identificadorusuario: identificador
        };
    
        enviarSolicitud(metodo, parametros, urlUpdate, membresia);
    };

    const enviarSolicitud = async(metodo, parametros, url, id_) => {
        if(metodo != "POST"){
            (id_ == undefined) ? url = url + idCliente : url = url + id_;
        } 
        await axios({
            method: metodo,
            url: url,
            data: parametros
        }).then(async (result) =>{
            closeModal();

            if(result.data.status == "OK" && metodo=="PUT"){
                Swal.fire("Cliente actualizado","Membresía actualizada correctamente", "success");         
            }             
            await getClientes();
            await setClienteMembresias(getMembresias());
            
            setFilteredClientes(membresiaCliente.filter(cliente => 
                (cliente.nombre && cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (cliente.identificadorUsuario && cliente.identificadorUsuario.toLowerCase().includes(searchTerm.toLowerCase()))
            ));
            
        })
        .catch(function (error) {
            Swal.fire("Error en la Solicitud", "error");
        });
    }

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

                <h1 className="d-flex justify-content-center mt-5">Membresías</h1>

                {filteredClientes.map((cliente, i) => {
                    return (
                        <Contenedor 
                            key={i}
                            title1={'Nombre del cliente'}
                            text1={cliente.nombre} 
                            title2={'Tipo de Membresía'}
                            text2={cliente.tipo_membresia} 
                            title3={'Renovación'}
                            text3={cliente.adquisicion+" - "+cliente.vencimiento} 
                            title4={'Estado'}
                            acciones={
                                <>
                                    {cliente.estatus ? (
                                        <Button className="me-1" variant="danger" onClick={() => activarDesactivarC(cliente, true)}>
                                            Desactivar </Button>
                                    ) : (
                                        <Button className="me-1" variant="success" onClick={() => activarDesactivarC(cliente, false)}>
                                            Activar </Button>
                                    )}
                                    <Button className='me-1' onClick={() => openModal(cliente)} variant="primary">Cambiar membresía</Button>
                                </>                  
                            } 
                        />
                    );
                })} 

            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Mejorar membresía"
            >
                <h2 style={{color: "black", fontSize: 35}}>Mejorar membresía</h2>
                <form style={{
                    width: "90%",
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems: "center"}}>

                    
                <div className="field-1">
                    <Form.Select required onChange={(e) => setMembresia(e.target.value)}>
                            <option id="selected">Selecciona una membresia</option>
                            {membresias.map((membresia => (
                                <option key={membresia.id} value={membresia.id}>{membresia.tipo_membresia}</option>
                            )))}
                        </Form.Select>                    
                </div>

                <div className="info-1">
                    <div className="field">
                        <Form.Control required type="text" placeholder="Número de cuenta" onChange={(e) => setNumTarjeta(e.target.value)} />
                    </div>

                    <div className="field">
                        <Form.Control required type="text" placeholder="CVV" onChange={(e) => setCVV(e.target.value)} />
                    </div>
                </div>

                <div className="info-1">
                    <div className="field">
                        <Form.Control required type="text" placeholder="Tipo de tarjeta" onChange={(e) => setTipoTarjeta(e.target.value)} />
                    </div>

                    <div className="field">
                        <Form.Control required type="text" placeholder="Fecha de vencimiento" onChange={(e) => setFechaVenc(e.target.value)} />
                    </div>
                </div>

                <div className="acciones">
                    <Button className="fw-bold fs-4 p-2" variant="danger">Cancelar</Button>{' '}
                    <Button className="fw-bold fs-4 p-2" variant="warning" onClick={(e) => validar("PUT", e)} >Cambiar membresía</Button>{' '}
                </div>
                
                </form>
            </Modal>
        </>
    )
}

export default Membresias