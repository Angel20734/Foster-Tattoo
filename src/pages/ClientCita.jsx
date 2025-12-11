import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ClientCita() {
  const [clients, setClients] = useState([]);
  const [clientId, setClientId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    supabase
      .from("clients")
      .select("*")
      .order("name", { ascending: true })
      .then(({ data }) => setClients(data || []));
  }, []);

  const sendCita = async () => {
    if (!clientId || !date || !time) {
      alert("Complete todos los campos obligatorios");
      return;
    }

    const { error } = await supabase.from("appointments").insert({
      client_id: clientId,
      date,
      time,
      notes,
    });

    if (error) {
      alert("Error al registrar cita");
      return;
    }

    setSuccess(true);
    setClientId("");
    setDate("");
    setTime("");
    setNotes("");
  };

  return (
    <>
      <Navbar />

      <div className="form-container">
        <h2>Agendar Cita</h2>

        {success && (
          <p className="success-message">Cita registrada correctamente</p>
        )}

        <div className="form-group">
          <label className="form-label">Selecciona tu nombre</label>
          <select
            className="form-input"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
          >
            <option value="">Seleccione...</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Fecha</label>
          <input
            type="date"
            className="form-input"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Hora</label>
          <input
            type="time"
            className="form-input"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Notas (opcional)</label>
          <textarea
            className="form-input form-note"
            placeholder="Describe lo que deseas hacerte..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>

        <button className="btn-primary" onClick={sendCita}>
          Agendar Cita
        </button>
      </div>
      <Footer />
    </>
  );
}
