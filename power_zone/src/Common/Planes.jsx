import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import gimnasio from './img/gimnasio.png'

import Menu from './Menu';
import Footer from './Footer';

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
                    <Table style={{ width: '80%' }}>
                        <thead>
                            <th></th>
                            <th className='plus_th fs-3'>Plus</th>
                            <th className='fs-3'>Medium</th>
                            <th className='fs-3'>Estándar</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td className='fs-4'>Acceso General al gimnasio</td> 
                                <td className='plus' style={{ textAlign: 'center' }}> <img src={check} alt='check' className='iconimage' /> </td>    
                                <td style={{ textAlign: 'center' }}> <img src={check} alt='check' className='iconimage' /> </td>   
                                <td style={{ textAlign: 'center' }}> <img src={check} alt='check' className='iconimage' /> </td>                          
                            </tr>
                            <tr>
                                <td className='fs-4'>Acceso al área de máquinas</td>
                                <td className='plus' style={{ textAlign: 'center' }}> <img src={check} alt='check' className='iconimage' /> </td>   
                                <td style={{ textAlign: 'center' }}> <img src={check} alt='check' className='iconimage' /> </td>   
                                <td style={{ textAlign: 'center' }}> <img src={check} alt='check' className='iconimage' /> </td>   
                            </tr>
                            <tr>
                                <td className='fs-4'>Acceso a clases especiales</td>
                                <td className='plus' style={{ textAlign: 'center' }}> <img src={check} alt='check' className='iconimage' /> </td>   
                                <td style={{ textAlign: 'center' }}> <img src={check} alt='check' className='iconimage' /> </td>   
                                <td style={{ textAlign: 'center' }}> <img src={equis} alt='equis' className='iconimage2' /> </td>
                            </tr>
                            <tr>
                                <td className='fs-4'>Reserva tu asistencia a clases</td>
                                <td className='plus' style={{ textAlign: 'center' }}> <img src={check} alt='check' className='iconimage' /> </td>   
                                <td style={{ textAlign: 'center' }}> <img src={check} alt='check' className='iconimage' /> </td> 
                                <td style={{ textAlign: 'center' }}> <img src={equis} alt='equis' className='iconimage2' /> </td>  
                            </tr>
                            <tr>
                                <td className='fs-4'>Acceso exclusivo al sauna</td>
                                <td className='plus' style={{ textAlign: 'center' }}> <img src={check} alt='check' className='iconimage' /> </td>   
                                <td style={{ textAlign: 'center' }}> <img src={equis} alt='equis' className='iconimage2' /> </td>
                                <td style={{ textAlign: 'center' }}> <img src={equis} alt='equis' className='iconimage2' /> </td>   
                            </tr>
                            <tr>
                                <td></td>
                                <td className='plus centerText'>
                                    <div className='fw-bold fs-4'>Desde</div>
                                    <div className='fw-bold fs-4'>$1,500.00</div>
                                    <Button className="fs-5 fw-bold" variant="light">Adquirir</Button>{' '}
                                </td>
                                <td className='centerText'>
                                    <div className='fw-bold fs-4'>Desde</div>
                                    <div className='fw-bold fs-4'>$1,000.00</div>
                                    <Button className="fs-5 fw-bold" variant="warning">Adquirir</Button>{' '}
                                </td>
                                <td className='centerText'>
                                    <div className='fw-bold fs-4'>Desde</div>
                                    <div className='fw-bold fs-4'>$800.00</div>
                                    <Button className="fs-5 fw-bold" variant="warning">Adquirir</Button>{' '}
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