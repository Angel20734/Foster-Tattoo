import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { Link } from "react-router-dom";
import WhatsAppFloat from "../components/WhatsAppFloat";

export default function Landing() {
  const [designs, setDesigns] = useState([]);

  useEffect(() => {
    supabase
      .from("designs")
      .select("*")
      .order("id", { ascending: false })
      .limit(3)
      .then(({ data }) => setDesigns(data || []));
  }, []);

  return (
    <>
      <Navbar />
      <WhatsAppFloat />

      {/* HERO PRINCIPAL FULLSCREEN */}
      <section className="hero">
        <div className="hero-content">
          <h1>Foster Tattoo Studio</h1>
          <p>Arte que deja huella</p>
          <p>Mas de 9 años de experiencia </p>
          <a href="/citas" className="btn-primary-big">
            Agendar Cita
          </a>
        </div>
      </section>

      {/* SECCIÓN SOBRE NOSOTROS */}
            <section className="about-premium fade-in">
  <div className="about-left">

    <p className="about-small-text">Nosotros estamos aquí para ti</p>

    <h2 className="about-title">FOSTER TATTOO STUDIO</h2>

    <p className="about-description">
      Durante el proceso de tu cita vivirás una experiencia exclusiva,
      guiada por artistas profesionales del tatuaje que te acompañarán
      en cada paso del diseño, creación y tatuado.
    </p>

    <div className="accordion-premium">

      <details>
        <summary>
          ¿Cuál es el horario de atención?
          <span className="icon"></span>
        </summary>
        <p>Atendemos de lunes a sábado de 10:00 am a 8:00 pm previa cita.</p>
      </details>

      <details>
        <summary>
          ¿Puedo acercarme al estudio sin previa cita?
          <span className="icon"></span>
        </summary>
        <p>Sí puedes, pero recomendamos agendar para asegurar disponibilidad.</p>
      </details>

      <details open>
        <summary>
          ¿Pueden realizar un diseño personalizado?
          <span className="icon"></span>
        </summary>
        <p>Claro, trabajamos tu diseño desde cero en conjunto contigo.</p>
      </details>

    </div>
  </div>

  <div className="about-right">
    <img src="/imgs/mask.png" className="about-illustration fade-in-delayed" />
  </div>
</section>

      {/* SECCIÓN ARTISTAS */}

      <section className="artistas-section">
        <h2 className="section-title">Nuestros Artistas</h2>
        <p className="section-subtitle">Profesionales especializados en diferentes estilos de tatuaje</p>

        <div className="artistas-grid">
          
          <div className="artista-card">
            <img src="public/imgs/artista1.jpg" alt="Foster" />
            <h3>Foster</h3>
            <p>Especialista en realismo y microrealismo</p>
          </div>

          <div className="artista-card">
            <img src="public/imgs/artista2.jpg" alt="Omar" />
            <h3>Omar</h3>
            <p>Blackwork, sombras profundas y piezas grandes</p>
          </div>

        </div>
      </section>


      {/* DISEÑOS RECIENTES */}
      <section className="recent-section">
        <h2>Diseños Recientes</h2>

        {designs.length === 0 ? (
          <p className="no-designs">No hay diseños registrados aún.</p>
        ) : (
          <div className="recent-grid">
  {designs.slice(0, 4).map((d) => (
    <div key={d.id} className="recent-card">
      <img src={d.image_url} className="recent-img" alt="Diseño reciente" />
    </div>
  ))}
</div>

        )}

        <div className="center">
          <Link to="/galeria" className="btn-secondary">
            Ver Galería Completa
          </Link>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="cta-section">
        <h2>¿Listo para tu próximo tatuaje?</h2>
        <a href="/citas" className="btn-primary-big">
          Agendar Cita Ahora
        </a>
      </section>

      <Footer />
    </>
  );
}
