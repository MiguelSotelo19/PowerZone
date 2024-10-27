import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

//Páginas
import App from './Common/App.jsx'
import Planes from './Common/Planes.jsx';
import Clientes from './Gerente/Clientes.jsx'

createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path='/PowerZone' element={<App />} />
      <Route path='/PowerZone/Planes' element={<Planes />} />
      <Route path='/PowerZone/G/Clientes' element={<Clientes />} />
    </Routes>
  </Router>
)
