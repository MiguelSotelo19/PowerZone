import Button from 'react-bootstrap/Button';


function Contenedor({ nombre, membresia, num_membresia, openActModal }) {

    return (
        <>
        <div className='d-flex justify-content-center mt-4' style={{ border: '1px solid rgb(217, 217, 217)', width: 'fit-content', margin: '2px auto', borderRadius: '10px' }}>
            <div className='row' style={{ textAlign: 'center', margin: '15px' }}>
                <div className='fw-bold mb-2'>Cliente</div>
                <div>{nombre}</div>
            </div>
            <div className='row' style={{ textAlign: 'center', margin: '15px' }}>
                <div className='fw-bold mb-2'>Tipo de Membresía</div>
                <div>{membresia}</div>
            </div>
            <div className='row' style={{ textAlign: 'center', margin: '15px' }}>
                <div className='fw-bold mb-2'>Número de Membresía</div>
                <div>{num_membresia}</div>
            </div>
            <div className='row' style={{ textAlign: 'center', margin: '15px' }}>
                <div className='fw-bold mb-2'>Estado</div>
                <div>
                <Button className='me-1' variant="danger">Desactivar</Button>{' '}
                <Button className='me-1' variant="success">Activar</Button>{' '}
                <Button variant="warning" onClick={openActModal}>Editar</Button>{' '}
                </div>
            </div>
        </div>
        </>
    )
}

export default Contenedor