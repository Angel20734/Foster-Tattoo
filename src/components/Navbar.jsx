import { Link } from "react-router-dom";
import { useState } from "react";
import "../estilos.css";
import logo from "../assets/logo.jpg";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="nav-center-master">

      <div className="nav-center-wrapper">

        <ul className="nav-center-menu">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/tatuajes">Tatuajes</Link></li>

          {/* LOGO CENTRADO ENTRE LOS LINKS */}
          <li className="logo-li">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </li>

          <li><Link to="/citas">Agenda tu cita</Link></li>
          <li><Link to="/admin">Admin</Link></li>
        </ul>

        <div className="nav-toggle" onClick={() => setOpen(!open)}>☰</div>

      </div>

      {open && (
        <div className="nav-mobile">
          <Link to="/" onClick={() => setOpen(false)}>Inicio</Link>
          <Link to="/tatuajes" onClick={() => setOpen(false)}>Tatuajes</Link>
          <Link to="/citas" onClick={() => setOpen(false)}>Agenda tu cita</Link>
          <Link to="/admin" onClick={() => setOpen(false)}>Admin</Link>
        </div>
      )}
    </nav>
  );
}
