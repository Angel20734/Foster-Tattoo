import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../estilos.css";
import WhatsAppFloat from "../components/WhatsAppFloat";

export default function Tatuajes() {
  const estilos = [
    {
      name: "Realismo",
      img: "/imgs/realismo.jpg",
      desc: "Sombras profundas y detalles precisos para un acabado fotográfico.",
    },
    {
      name: "Blackwork",
      img: "/imgs/blackwork.jpg",
      desc: "Trazos contundentes, figuras sólidas y contraste extremo.",
    },
    {
      name: "Linework",
      img: "/imgs/linework.jpg",
      desc: "Diseños limpios con líneas finas y precisión absoluta.",
    },
    {
      name: "Anime",
      img: "/imgs/anime.jpg",
      desc: "Estilo inspirado en manga/anime con trazos expresivos.",
    },
    {
      name: "Microrealismo",
      img: "/imgs/microrealismo.jpg",
      desc: "Piezas pequeñas con alto nivel de detalle.",
    },
    {
      name: "Color",
      img: "/imgs/color.jpg",
      desc: "Uso de pigmentos vibrantes y degradados llamativos.",
    },
  ];

  return (
    <>
      <Navbar />
      <WhatsAppFloat />

      <div className="tatuajes-section">
        <div className="tatuajes-container">
          <h1 className="titulo-seccion">Estilos de Tatuajes</h1>
          <p className="subtitulo-seccion">
            Explora los diferentes estilos que trabajamos en el estudio
          </p>

          <div className="grid-estilos">
            {estilos.map((est) => (
              <div key={est.name} className="tarjeta-estilo">
                <img src={est.img} className="img-estilo" alt={est.name} />

                <h3>{est.name}</h3>
                <p>{est.desc}</p>

                <Link to={`/galeria?style=${est.name}`} className="btn-estilo">
                  Ver diseños
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
