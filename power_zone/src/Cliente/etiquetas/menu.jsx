import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

//Imágenes
import logo from '../../Common/img/logo.png'
import user from '../../Common/img/user.png'
import { Dropdown } from 'react-bootstrap';
import Swal from 'sweetalert2';
function cerrarSesion(){
  Swal.fire({
      title: '¿Cerrar sesión?',
      icon: 'warning',
      confirmButtonText: 'Cerrar Sesión',
      showCancelButton: true,
      cancelButtonText: 'Cancelar'
  }).then((result) => {
      if(result.isConfirmed){
        window.location = '/';
        localStorage.clear();
      }   
  })
}

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
                draggable="false"
            />
          </Navbar.Brand>
          <Nav className="w-50 justify-content-between align-items-center">
            <Nav.Link className="m-1 me-2 fs-5 fw-bold" href="/PowerZone/C/Clases">Clases</Nav.Link>
            <Nav.Link className="m-1 me-2 fs-5 fw-bold" href="/PowerZone/C/Membresias">Membresías</Nav.Link>
            <Navbar.Brand href="/PowerZone/C/Perfil">
            <Dropdown align="end" className="e-caret-hide">
                <Dropdown.Toggle
                  variant="link"
                  id="dropdown-basic"
                  className="p-0"
                  style={{ border: 'none', boxShadow: 'none' }}
                >
                  <img
                    src={user}
                    alt="user_PowerZone"
                    style={{ width: '7vh', height: '7vh' }}
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="/PowerZone/C/Perfil">Ver Perfil</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={()=>cerrarSesion()}>Cerrar Sesión</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
          </Navbar.Brand>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Menu;