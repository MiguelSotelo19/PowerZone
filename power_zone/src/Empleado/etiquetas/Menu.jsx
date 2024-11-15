import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

// Imágenes
import logo from '../../Common/img/logo.png';
import user from '../../Common/img/user.png';

function Menu() {
  return (
    <>
      <Navbar style={{ backgroundColor: 'rgb(255, 182, 18)' }} fixed="top">
        <Container>
          <Navbar.Brand href="#home">
            <img 
                src={logo}
                alt='logo_PowerZone'
                style={{ width: '17vh', height: '7vh' }}
            />
          </Navbar.Brand>
          <Nav className="justify-content-end">
            <Nav.Link className="m-1 me-2 fs-5 fw-bold" href="/PowerZone/E/Cliente">Cliente</Nav.Link>
            <Nav.Link className="m-1 me-2 fs-5 fw-bold" href="/PowerZone/E/Clases">Clases</Nav.Link>
            <Nav.Link className="m-1 me-2 fs-5 fw-bold" href="/PowerZone/E/Membresias">Membresías</Nav.Link>
    
            <Navbar.Brand href="/PowerZone//Perfil">
                <img 
                    src={user}
                    alt='user_PowerZone'
                    style={{ width: '7vh', height: '7vh' }}
                />
            </Navbar.Brand>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Menu;
