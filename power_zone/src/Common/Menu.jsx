import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

//Imágenes
import logo from './img/logo.png'

function Menu() {
  return (
    <>
      <Navbar style={{ backgroundColor: 'rgb(228, 228, 228)' }} fixed="top">
        <Container>
          <Navbar.Brand href="#home">
            <img 
                src={logo}
                alt='logo_PowerZone'
                style={{ minWidth: '30%', maxWidth: '35%', height: 'auto' }}
                draggable="false"
            />
          </Navbar.Brand>
          <Nav className="justify-content-end">
            <Nav.Link className="m-1 me-3 fs-5" href="/PowerZone">Inicio</Nav.Link>
            <Nav.Link className="m-1 me-3 fs-5" href="/PowerZone/Planes">Planes</Nav.Link>
            <Nav.Link className="m-1 me-3 fs-5" href="/PowerZone/Acceso">Acceso</Nav.Link>
            <Button className="m-1 fs-5 fw-bold" variant="warning" href='/PowerZone/DatosPersonales'>¡Inscribete!</Button>{' '}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Menu;