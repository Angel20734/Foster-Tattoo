import { useState } from "react";
import { supabase } from "../supabase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../estilos.css";
import WhatsAppFloat from "../components/WhatsAppFloat";

export default function AgendaCitaFusionada() {
  const [step, setStep] = useState(1);

  // INFO DEL TATUAJE (NO SE GUARDA)
  const [primerTatuaje, setPrimerTatuaje] = useState("");
  const [areaCuerpo, setAreaCuerpo] = useState("");
  const [artista, setArtista] = useState("");
  const [tipoTatuaje, setTipoTatuaje] = useState("");

  // INFO DEL CLIENTE (clients)
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // INFO DE CITA (appointments)
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [success, setSuccess] = useState(false);

  const enviarCita = async () => {
    // Guardar cliente
    const { data: cliente, error: errCliente } = await supabase
      .from("clients")
      .insert({
        name,
        phone,
        email,
      })
      .select()
      .single();

    if (errCliente) {
      alert("Error al registrar cliente");
      console.log(errCliente);
      return;
    }

    // Crear notas con info del tatuaje
    const notes =
      `Primer tatuaje: ${primerTatuaje}\n` +
      `Área del cuerpo: ${areaCuerpo}\n` +
      `Artista: ${artista}\n` +
      `Tipo de tatuaje: ${tipoTatuaje}`;

    // Guardar cita ligada al cliente creado
    const { error: errCita } = await supabase
      .from("appointments")
      .insert({
        client_id: cliente.id,
        date,
        time,
        notes,
      });

    if (errCita) {
      alert("Error al registrar cita");
      console.log(errCita);
      return;
    }

    setSuccess(true);
  };

  return (
    <>
    <Navbar/>
    <WhatsAppFloat />
    <div className="cita-section">
      

      <div className="cita-container">

        {/* IZQUIERDA */}
        <div className="cita-info">
          <h3 className="cita-subtitle">Más de 9 años de experiencia</h3>
          <h1 className="cita-title">AGENDA EN FOSTER TATTOO</h1>

          <p className="cita-description">
            Agenda tu consulta personalizada y trabaja tu diseño junto a nuestros artistas.
          </p>

          <p className="cita-address">
            <a 
              href="https://www.google.com/maps?q=Av.+Óscar+Benavides+4170+Bellavista+Callao"
              target="_blank"
              rel="noopener noreferrer"
              className="map-link"
            >
              Av. Óscar Benavides 4170 Bellavista
            </a>
            <br />
            Foster NK
          </p>


          {/* MAPA */}
          <iframe
          className="cita-map"
          width="100%"
          height="260"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3900.43260792172!2d-77.10818702413332!3d-12.044875988152211!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105cf0ccc798011%3A0x783d8d30eb0badf1!2sAv.%20Oscar%20R%20Benavides%204170%2C%20Callao%2007011!5e0!3m2!1ses-419!2spe!4v1706240000000"
        ></iframe>

        </div>

        {/* DERECHA FORM */}
        <div className="cita-form">

          <h3 className="cita-form-subtitle">Estamos aquí para ti</h3>
          <h1 className="cita-form-title">AGENDA EN 2 PASOS</h1>

          <div className="cita-progress">
            <div
              className="cita-progress-bar"
              style={{ width: step === 1 ? "50%" : "100%" }}
            ></div>
          </div>

          {success && (
            <p style={{ color: "lightgreen", fontWeight: "bold" }}>
              ¡Tu cita fue registrada correctamente!
            </p>
          )}

          {/* PASO 1 */}
          {step === 1 && (
            <>
              <label>¿Primer tatuaje?</label>
              <select value={primerTatuaje} onChange={(e) => setPrimerTatuaje(e.target.value)}>
                <option value="">Seleccionar...</option>
                <option value="Sí">Sí</option>
                <option value="No">No</option>
              </select>

              <label>Área del cuerpo</label>
              <select value={areaCuerpo} onChange={(e) => setAreaCuerpo(e.target.value)}>
                <option value="">Seleccionar...</option>
                <option value="Brazo">Brazo</option>
                <option value="Pierna">Pierna</option>
                <option value="Espalda">Espalda</option>
              </select>

              <label>Artista</label>
              <select value={artista} onChange={(e) => setArtista(e.target.value)}>
                <option value="">Seleccionar...</option>
                <option value="Foster">Foster</option>
                <option value="Omar">Omar</option>
              </select>

              <label>Tipo de tatuaje</label>
              <select value={tipoTatuaje} onChange={(e) => setTipoTatuaje(e.target.value)}>
                  <option value="Realismo">Realismo</option>
                  <option value="Blackwork">Blackwork</option>
                  <option value="Linework">Linework</option>
                  <option value="Anime">Anime</option>
                  <option value="Color">Color</option>
                  <option value="Microrealismo">Microrealismo</option>
              </select>

              <button className="btn-primary" onClick={() => setStep(2)}>
                PASO 2 →
              </button>
            </>
          )}

          {/* PASO 2 */}
{step === 2 && (
  <>
    <label>Nombre completo</label>
    <input 
      value={name} 
      onChange={(e) => setName(e.target.value)} 
      placeholder="Ej: Juan Pérez"
    />

    <label>Teléfono</label>
    <input 
      value={phone} 
      onChange={(e) => setPhone(e.target.value)} 
      placeholder="987654321"
    />

    <label>Correo</label>
    <input 
      type="email"
      value={email} 
      onChange={(e) => setEmail(e.target.value)} 
      placeholder="correo@gmail.com"
    />

    {/* FECHA CON MIN Y DISEÑO */}
    <label>Seleccionar fecha</label>
    <input
      type="date"
      className="date-input"
      value={date}
      min={new Date().toISOString().split("T")[0]}  
      onChange={(e) => setDate(e.target.value)}
    />

    {/* SELECTOR DE HORARIOS ELEGANTE */}
    <label>Seleccionar hora</label>
    <select
      className="hour-select"
      value={time}
      onChange={(e) => setTime(e.target.value)}
    >
      <option value="">Seleccionar...</option>

      <optgroup label="Mañana">
        <option value="09:00">09:00 AM</option>
        <option value="10:00">10:00 AM</option>
        <option value="11:00">11:00 AM</option>
      </optgroup>

      <optgroup label="Tarde">
        <option value="14:00">02:00 PM</option>
        <option value="15:00">03:00 PM</option>
        <option value="16:00">04:00 PM</option>
        <option value="17:00">05:00 PM</option>
      </optgroup>
    </select>

    <div className="btn-row">
      <button className="btn-back" onClick={() => setStep(1)}>← Volver</button>
      <button className="btn-primary" onClick={enviarCita}>
        CONFIRMAR CITA
      </button>
    </div>
  </>
)}

        </div>
      </div>

      <Footer />
      </div>
    </>
  );
}
