import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { supabase } from "./supabase";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);

  // Estados para el modal de edición
  const [editData, setEditData] = useState(null);
  const [editDate, setEditDate] = useState("");
  const [editTime, setEditTime] = useState("");
  const [editNotes, setEditNotes] = useState("");

  // Cargar citas
  const loadAppointments = async () => {
    const { data } = await supabase
      .from("appointments")
      .select("*, clients(name)")
      .order("id", { ascending: false });

    setAppointments(data || []);
  };

  // Abrir modal con datos de la cita
  const openEdit = (appointment) => {
    setEditData(appointment);
    setEditDate(appointment.date);
    setEditTime(appointment.time);
    setEditNotes(appointment.notes || "");
  };

  // Guardar cambios
  const saveChanges = async () => {
    const { error } = await supabase
      .from("appointments")
      .update({
        date: editDate,
        time: editTime,
        notes: editNotes,
      })
      .eq("id", editData.id);

    if (error) {
      alert("Error al actualizar");
      return;
    }

    setEditData(null);
    loadAppointments();
  };

  // Eliminar cita
  const deleteAppointment = async (id) => {
    if (!confirm("¿Eliminar cita?")) return;

    await supabase.from("appointments").delete().eq("id", id);
    loadAppointments();
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  return (
    <>
      <Navbar />
      <div className="page-default">
      

      <div className="table-container">
        <h2>Citas Registradas</h2>

        <table>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Notas</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((a) => (
              <tr key={a.id}>
                <td>{a.clients?.name}</td>
                <td>{a.date}</td>
                <td>{a.time}</td>
                <td>{a.notes || "—"}</td>
                <td>
                  <button
                    className="action-btn btn-edit"
                    onClick={() => openEdit(a)}
                  >
                    <img
                      className="icon"
                      src="https://cdn-icons-png.flaticon.com/512/1159/1159633.png"
                    />
                    Editar
                  </button>

                  <button
                    className="action-btn btn-delete"
                    onClick={() => deleteAppointment(a.id)}
                  >
                    <img
                      className="icon"
                      src="https://cdn-icons-png.flaticon.com/512/3096/3096673.png"
                    />
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL DE EDICIÓN */}
      {editData && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Editar Cita</h3>

            <label>Fecha</label>
            <input
              type="date"
              value={editDate}
              onChange={(e) => setEditDate(e.target.value)}
            />

            <label>Hora</label>
            <input
              type="time"
              value={editTime}
              onChange={(e) => setEditTime(e.target.value)}
            />

            <label>Notas</label>
            <textarea
              value={editNotes}
              onChange={(e) => setEditNotes(e.target.value)}
            ></textarea>

            <button className="action-btn btn-edit" onClick={saveChanges}>
              Guardar Cambios
            </button>

            <button
              className="action-btn btn-delete"
              onClick={() => setEditData(null)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
      </div>
    </>
  );
}

