import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Menu from './components/Menu';
import Footer from './components/Footer';

//CSS
import './css/Planes.css'

//Imágenes
import check from './img/check.png'
import equis from './img/equis.png'

function Planes() {

    return (
        <>
            <Menu />
            <div className='main-content'>

            <div style={{ width: '99vw' }}></div>

                <h1 className="d-flex justify-content-center">¡Elige el mejor <span style={{ color: 'rgb(255, 182, 18)' }}>&nbsp;plan&nbsp;</span> adecuado para ti!</h1>

                <div className='mt-5 d-flex justify-content-center'>
                    <Table className='table-separated-columns' style={{ width: '80%' }}>
                        <thead>
                            <tr>
                                <th></th>
                                <th className='plus_th fs-3'>Plus</th>
                                <th className='planesth fs-3'>Medium</th>
                                <th className='planesth fs-3'>Estándar</th>
                            </tr>                            
                        </thead>
                        <tbody>
                            <tr style={{ border: 0 }}>
                                <td className='fs-4'>Acceso General al gimnasio</td> 
                                <td className='plus' style={{ textAlign: 'center' }}> <img src={check} draggable="false" alt='check' className='iconimage' /> </td>    
                                <td className='planes' style={{ textAlign: 'center' }}> <img src={check} draggable="false" alt='check' className='iconimage' /> </td>   
                                <td className='planes' style={{ textAlign: 'center' }}> <img src={check} draggable="false" alt='check' className='iconimage' /> </td>                          
                            </tr>
                            <tr style={{ border: 0 }}>
                                <td className='fs-4'>Acceso al área de máquinas</td>
                                <td className='plus' style={{ textAlign: 'center' }}> <img src={check} draggable="false" alt='check' className='iconimage' /> </td>   
                                <td className='planes' style={{ textAlign: 'center' }}> <img src={check} draggable="false" alt='check' className='iconimage' /> </td>   
                                <td className='planes' style={{ textAlign: 'center' }}> <img src={check} draggable="false" alt='check' className='iconimage' /> </td>   
                            </tr>
                            <tr style={{ border: 0 }}>
                                <td className='fs-4'>Acceso a clases especiales</td>
                                <td className='plus' style={{ textAlign: 'center' }}> <img src={check} draggable="false" alt='check' className='iconimage' /> </td>   
                                <td className='planes' style={{ textAlign: 'center' }}> <img src={check} draggable="false" alt='check' className='iconimage' /> </td>   
                                <td className='planes' style={{ textAlign: 'center' }}> <img src={equis} draggable="false" alt='equis' className='iconimage2' /> </td>
                            </tr>
                            <tr style={{ border: 0 }}>
                                <td className='fs-4'>Reserva tu asistencia a clases</td>
                                <td className='plus' style={{ textAlign: 'center' }}> <img src={check} draggable="false" alt='check' className='iconimage' /> </td>   
                                <td className='planes' style={{ textAlign: 'center' }}> <img src={check} draggable="false" alt='check' className='iconimage' /> </td> 
                                <td className='planes' style={{ textAlign: 'center' }}> <img src={equis} draggable="false" alt='equis' className='iconimage2' /> </td>  
                            </tr>
                            <tr style={{ border: 0 }}>
                                <td className='fs-4'>Acceso exclusivo al sauna</td>
                                <td className='plus' style={{ textAlign: 'center' }}> <img src={check} draggable="false" alt='check' className='iconimage' /> </td>   
                                <td className='planes' style={{ textAlign: 'center' }}> <img src={equis} draggable="false" alt='equis' className='iconimage2' /> </td>
                                <td className='planes' style={{ textAlign: 'center' }}> <img src={equis} draggable="false" alt='equis' className='iconimage2' /> </td>   
                            </tr>
                            <tr>
                                <td style={{ border: 0 }}></td>
                                <td className='plus centerText ' style={{ border:0, borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px'}}>
                                    <div className='fw-bold fs-4 mb-1'>Desde</div>
                                    <div className='fw-bold fs-4 mb-2'>$1,500.00</div>
                                    <Button className="fs-5 fw-bold mb-1" variant="light" href='/PowerZone/DatosPersonales'>Adquirir</Button>{' '}
                                </td>
                                <td className='centerText planes2'>
                                    <div className='fw-bold fs-4 mb-1'>Desde</div>
                                    <div className='fw-bold fs-4 mb-2'>$1,000.00</div>
                                    <Button className="fs-5 fw-bold mb-1" variant="warning" href='/PowerZone/DatosPersonales'>Adquirir</Button>{' '}
                                </td>
                                <td className='planes2 centerText'>
                                    <div className='fw-bold fs-4 mb-1'>Desde</div>
                                    <div className='fw-bold fs-4 mb-2'>$800.00</div>
                                    <Button className="fs-5 fw-bold mb-1" variant="warning" href='/PowerZone/DatosPersonales'>Adquirir</Button>{' '}
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>  
            </div>
            
            <Footer />
        </>
    )
}

export default Planes