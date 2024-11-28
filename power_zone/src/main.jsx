import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

import { ProtectedRoutes } from './protectedRoutes.jsx';

//Páginas
import App from './Common/App.jsx';
import Acceso from './Common/Acceso.jsx';
import Planes from './Common/Planes.jsx';
import Clientes from './Gerente/Clientes.jsx'
import Clases from './Gerente/Clases.jsx'
import Membresias from './Gerente/Membresias.jsx';
import Empleados from './Gerente/Empleado.jsx';
import Equipos from './Gerente/Equipos.jsx';
import Ingresos from './Gerente/Ingresos.jsx';
import Personales from './Common/DatosPersoales.jsx';
import Banco from './Common/DatosBancarios.jsx';
import Cliente from './Empleado/Cliente.jsx';
import Clase from './Empleado/Clases.jsx';
import Membresia from './Empleado/Membresias.jsx'
import ClienteMembresias from './Cliente/Membresia.jsx';
import ClienteClases from './Cliente/Clases.jsx';
import ClientePerfil from './Cliente/Perfil.jsx';
import EmpleadoPerfil from './Empleado/Perfil.jsx';
import Perfil from './Gerente/Perfil.jsx';


createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path='/PowerZone' element={<App />} />
      <Route path='/PowerZone/Planes' element={<Planes />} />

      {/*Páginas del gerente*/}
      <Route path='/PowerZone/G/Clientes' element={<ProtectedRoutes allowedRoles={['Gerente']}> <Clientes /> </ProtectedRoutes>} />
      <Route path='/PowerZone/G/Clases' element={<ProtectedRoutes allowedRoles={['Gerente']}> <Clases /> </ProtectedRoutes>} />
      <Route path='/PowerZone/G/Membresias' element={<ProtectedRoutes allowedRoles={['Gerente']}> <Membresias /> </ProtectedRoutes>} />
      <Route path='/PowerZone/G/Empleados' element={<ProtectedRoutes allowedRoles={['Gerente']}> <Empleados /> </ProtectedRoutes>} />
      <Route path='/PowerZone/G/Equipos' element={<ProtectedRoutes allowedRoles={['Gerente']}> <Equipos /> </ProtectedRoutes>} />
      <Route path='/PowerZone/G/Ingresos' element={<ProtectedRoutes allowedRoles={['Gerente']}> <Ingresos /> </ProtectedRoutes>} />
      <Route path='/PowerZone/G/Perfil' element={<ProtectedRoutes allowedRoles={['Gerente']}> <Perfil /> </ProtectedRoutes>} />

      {/*Páginas del empleado*/}
      <Route path='/PowerZone/E/Cliente' element={<ProtectedRoutes allowedRoles={['Empleado']}> <Cliente /> </ProtectedRoutes>} />
      <Route path='/PowerZone/E/Clases' element={<ProtectedRoutes allowedRoles={['Empleado']}> <Clase /> </ProtectedRoutes>} />
      <Route path= '/PowerZone/E/Membresias' element={<ProtectedRoutes allowedRoles={['Empleado']}> <Membresia /> </ProtectedRoutes>} />
      <Route path='/PowerZone/E/Perfil' element={<ProtectedRoutes allowedRoles={['Empleado']}> <EmpleadoPerfil /> </ProtectedRoutes>}/>

      {/*Páginas del cliente*/}
      <Route path='/PowerZone/C/Membresias' element={<ProtectedRoutes allowedRoles={['Cliente']}> <ClienteMembresias /> </ProtectedRoutes>} />
      <Route path='/PowerZone/C/Clases' element={<ProtectedRoutes allowedRoles={['Cliente']}> <ClienteClases /> </ProtectedRoutes>} />
      <Route path='/PowerZone/C/Perfil' element={<ProtectedRoutes allowedRoles={['Cliente']}> <ClientePerfil /> </ProtectedRoutes>} />

      {/*Página por defecto*/}
      <Route path="/" element={<Navigate to="/PowerZone" replace />} />
      <Route path='/PowerZone/Acceso' element={<Acceso />} />
      <Route path='/PowerZone/DatosPersonales' element={<Personales />} />
      <Route path='/PowerZone/DatosBancarios' element={<Banco />}/>
    </Routes>
  </Router>
)
