import Menu from "./Menu"
import Footer from "./Footer";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

//Imágenes
import gimnasio from './img/gimnasio.png'
import zumba from './img/zumba.png'
import kickboxing from './img/kickboxing.png'
import reloj from './img/reloj.png'
import sauna from './img/sauna.png'
import area_equipos from './img/area_equipos.png'

//CSS
import './css/App.css'


function App() {

    return (
        <>
            <Menu />
            <div>

            <div className="main-content d-flex justify-content-center">
                <Card className="bg-dark text-white shadow-lg" style={{ minWidth: '70%', maxWidth: '80%' }}>
                    <Card.Img src={gimnasio} alt="Card image" />
                    <Card.ImgOverlay className="d-flex flex-column justify-content-evenly">
                        <Card.Title style={{ fontSize: 'clamp(4rem, 8vw, 4rem)', marginTop: '20px' }}>
                            Donde la fuerza <br /> se convierte <br /> en hábito
                        </Card.Title>
                        <Button className="fs-3" 
                                style={{ alignSelf: 'flex-start', marginBottom: '20px', backgroundColor: 'rgb(51, 79, 106)' }}>
                            Conoce nuestros planes
                        </Button>{' '}
                    </Card.ImgOverlay>
                </Card>
            </div>
            
            <div className="mt-5">
                <h1 className="d-flex justify-content-center">NUESTRAS CLASES ESPECIALES</h1>

                <div className="d-flex justify-content-evenly mt-5">
                    <Card style={{ width: '30rem' }}>
                    <Card.Img variant="top" src={zumba} />
                    <div className="d-flex justify-content-center fs-2" style={{ backgroundColor: 'rgb(255, 182, 18)' }}>Zumba</div>
                    <Card.Body style={{ border: '2px solid rgb(255, 182, 18)' }}>
                        <div>
                            <div className="d-flex justify-content-center">
                            <img 
                                src={reloj}
                                alt='reloj'
                                style={{ width: '5vh', height: 'auto' }}
                                draggable="false"
                            />
                            <p className="ms-4 fs-5 fw-bold">Duración: </p>
                            <p className="ms-4 fs-5">60 min</p>
                            </div>
                            <hr style={{ height: '3px', backgroundColor: 'black', border: 'none' }} />
                        </div>
                        <Card.Text className="fs-5">
                        Quema calorías y tonifica tu cuerpo al ritmo de la música en una clase divertida y llena de energía. 
                        ¡No se requiere experiencia, solo disfruta y muévete!
                        </Card.Text>
                    </Card.Body>
                    </Card>

                    <Card style={{ width: '30rem' }}>
                    <Card.Img variant="top" src={kickboxing} />
                    <div className="d-flex justify-content-center fs-2" style={{ backgroundColor: 'rgb(255, 182, 18)' }}>Kick Boxing</div>
                    <Card.Body style={{ border: '2px solid rgb(255, 182, 18)' }}>
                        <div>
                            <div className="d-flex justify-content-center">
                            <img 
                                src={reloj}
                                alt='reloj'
                                style={{ width: '5vh', height: 'auto' }}
                                draggable="false"
                            />
                            <p className="ms-4 fs-5 fw-bold">Duración: </p>
                            <p className="ms-4 fs-5">60 min</p>
                            </div>
                            <hr style={{ height: '3px', backgroundColor: 'black', border: 'none' }} />
                        </div>
                        <Card.Text className="fs-5">
                        Mejora tu condición física con una clase intensa de golpes y patadas. Tonifica, quema calorías y 
                        desata tu energía. ¡Ideal para todos los niveles!
                        </Card.Text>
                    </Card.Body>
                    </Card>
                </div>
            </div>

            <div className="mt-5 mb-5">
                <h1 className="d-flex justify-content-center mb-5">¿CONOCES NUESTRAS ÁREAS?</h1>

                <div className="d-flex justify-content-center">
                    <div className="d-flex shadow-lg" style={{ width: '80%', alignItems: 'center' }}>
                        <div style={{ maxWidth: '70vh', minWidth: '50vh' }}>
                            <img 
                                src={sauna}
                                alt="sauna"
                                style={{ width: '100%', height: 'auto' }} 
                                draggable="false"
                            />
                        </div>
                        <div className="text-center p-4">
                            <p className="fs-1 fw-bold">Sauna</p>
                            <p className="fs-1 fw-bold">¡Relájate y renueva tu energía!</p>
                            <p className="fs-3">
                                Disfruta de un momento de relajación total, eliminando toxinas y reduciendo el estrés. 
                                Perfecto para recuperar tu cuerpo después del entrenamiento.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-center" style={{ marginTop: '5%' }}>
                    <div className="d-flex shadow-lg" style={{ width: '80%', alignItems: 'center' }}>
                        <div style={{ maxWidth: '70vh', minWidth: '50vh' }}>
                            <img 
                                src={area_equipos}
                                alt='area_equipos'
                                style={{ width: '100%', height: 'auto' }}
                                draggable="false"
                            />
                        </div>
                        <div style={{ textAlign: 'center', padding: '20px' }}>
                            <p className="fs-1 fw-bold">Área de máquinas</p>
                            <p className="fs-1 fw-bold">Fuerza y resultados a tu alcance</p>
                            <p className="fs-3">Accede a equipos de última generación para entrenar cada grupo muscular. Ideal para mejorar 
                                tu fuerza, resistencia y alcanzar tus metas de fitness</p>
                        </div>
                    </div>
                </div>               
            </div>

            </div>

            <Footer />
        </>
    )
}

export default App