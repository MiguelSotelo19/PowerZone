import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

//Páginas
import App from './Common/App.jsx'
import Acceso from './Common/Acceso.jsx';
import Planes from './Common/Planes.jsx';
import Clientes from './Gerente/Clientes.jsx'
import Personales from './Common/DatosPersoales.jsx'
import Banco from './Common/DatosBancarios.jsx'



createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path='/PowerZone' element={<App />} />
      <Route path='/PowerZone/Planes' element={<Planes />} />
      <Route path='/PowerZone/Acceso' element={<Acceso />} />
      <Route path='/PowerZone/G/Clientes' element={<Clientes />} />
      <Route path='/PowerZone/DatosPersonales' element={<Personales />} />
      <Route path='/PowerZone/DatosBancarios' element={<Banco />}/>
    </Routes>
  </Router>
)
