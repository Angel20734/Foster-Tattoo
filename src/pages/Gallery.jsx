import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { useLocation } from "react-router-dom";
import "../estilos.css";

import WhatsAppFloat from "../components/WhatsAppFloat";
import Navbar from "../components/Navbar";

export default function Gallery() {
  const [designs, setDesigns] = useState([]);
  const [modalImg, setModalImg] = useState(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  // Leer parámetro style desde la URL
  const params = new URLSearchParams(location.search);
  const filtroStyle = params.get("style");

  const loadDesigns = async () => {
    setLoading(true);

    let query = supabase.from("designs").select("*");

    // Si llegó desde Tatuajes.jsx → aplicar el filtro
    if (filtroStyle) {
      query = query.eq("style", filtroStyle);
    }

    const { data, error } = await query.order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    setDesigns(data || []);
    setLoading(false);
  };

  useEffect(() => {
    loadDesigns();
  }, [filtroStyle]);

  return (
    <>
  <Navbar />
  <WhatsAppFloat />

  <div className="gallery-section">
    <div className="gallery-container">
      <h1 className="gallery-title">
        {filtroStyle ? `Estilo: ${filtroStyle}` : "Galería de Diseños"}
      </h1>

      {loading && <p className="loading-text">Cargando diseños...</p>}

      <div className="gallery-grid">
        {designs.map((d) => (
          <div key={d.id} className="gallery-card">
            <img
              src={d.image_url}
              className="gallery-img"
              onClick={() => setModalImg(d.image_url)}
            />
          </div>
        ))}
      </div>

      {modalImg && (
        <div className="lightbox" onClick={() => setModalImg(null)}>
          <img src={modalImg} className="lightbox-img" />
        </div>
      )}
    </div>
  </div>
</>

  );
}
