import { useState } from "react";
import { supabase } from "../supabase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const registerClient = async () => {
    if (!name.trim()) return alert("El nombre es obligatorio");

    const { error } = await supabase.from("clients").insert({
      name,
      phone,
      email,
    });

    if (error) {
      alert("Error al registrar cliente");
      return;
    }

    setSuccess(true);
    setName("");
    setPhone("");
    setEmail("");
  };

  return (
    <>
      <Navbar />

      <div className="form-container">
        <h2>Registro de Cliente</h2>

        {success && (
          <p style={{ color: "green", textAlign: "center", fontWeight: "bold" }}>
            Registro exitoso ✔️
          </p>
        )}

        <div className="form-group">
          <label className="form-label">Nombre completo</label>
          <input
            className="form-input"
            placeholder="Ej: Juan Pérez"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Teléfono</label>
          <input
            className="form-input"
            placeholder="Ej: 987654321"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Correo electrónico</label>
          <input
            className="form-input"
            placeholder="Ej: correo@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button className="btn-primary" onClick={registerClient}>
          Registrarse
        </button>
      </div>
      <Footer />
    </>
  );
}
