import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

//Páginas
import App from './Common/App.jsx'
import Acceso from './Common/Acceso.jsx';
import Planes from './Common/Planes.jsx';
import Clientes from './Gerente/Clientes.jsx'
import Clases from './Gerente/Clases.jsx'
import Membresias from './Gerente/Membresias.jsx';
import Empleados from './Gerente/Empleado.jsx';
import Equipos from './Gerente/Equipos.jsx';
import Ingresos from './Gerente/Ingresos.jsx';
import Personales from './Common/DatosPersoales.jsx'
import Banco from './Common/DatosBancarios.jsx'



createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path='/PowerZone' element={<App />} />
      <Route path='/PowerZone/Planes' element={<Planes />} />

      {/*Páginas del gerente*/}
      <Route path='/PowerZone/G/Clientes' element={<Clientes />} />
      <Route path='/PowerZone/G/Clases' element={<Clases />} />
      <Route path='/PowerZone/G/Membresias' element={<Membresias />} />
      <Route path='/PowerZone/G/Empleados' element={<Empleados />} />
      <Route path='/PowerZone/G/Equipos' element={<Equipos />} />
      <Route path='/PowerZone/G/Ingresos' element={<Ingresos />} />

      {/*Páginas del cliente*/}
      <Route path='/PowerZone/C/Membresias' element={<ClienteMembresias />} />
      <Route path='/PowerZone/C/Clases' element={<ClienteClases />} />

      {/*Página por defecto*/}
      <Route path="/" element={<Navigate to="/PowerZone" replace />} />
      <Route path='/PowerZone/Acceso' element={<Acceso />} />
      <Route path='/PowerZone/DatosPersonales' element={<Personales />} />
      <Route path='/PowerZone/DatosBancarios' element={<Banco />}/>
    </Routes>
  </Router>
)
