import './estilos.css';
import Tatuajes from "./pages/Tatuajes.jsx";


console.log("Index CSS cargado:", import.meta.glob('./index.css'));


import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"

import App from './App.jsx'
import Appointments from './Appointments.jsx'
import Designs from './Designs.jsx'

import Landing from "./pages/Landing.jsx"
import Gallery from "./pages/Gallery.jsx"
import RegisterPage from "./pages/Register.jsx"
import CitaFusionada from "./pages/AgendaCitaFusionada.jsx";




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>

        {/* PÚBLICO */}
        <Route path="/" element={<Landing />} />
        <Route path="/galeria" element={<Gallery />} />
        <Route path="/registrar" element={<RegisterPage />} />
        <Route path="/citas" element={<CitaFusionada />} />
        <Route path="/tatuajes" element={<Tatuajes />} />


        {/* ADMIN */}
        <Route path="/admin" element={<App />} />
        <Route path="/admin/citas" element={<Appointments />} />
        <Route path="/admin/diseños" element={<Designs />} />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
