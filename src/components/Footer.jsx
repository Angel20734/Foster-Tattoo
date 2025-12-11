export default function Footer() {
  return (
    <footer>
      <div className="footer-container">
        
        <div>
          <h3>Foster Tattoo Studio</h3>
          <p>Diseños únicos para ti.</p>
        </div>

        <div>
          <h3>Horarios</h3>
          <p>Lunes a Sábado: 10am – 8pm</p>
          <p>Domingos: Atención previa cita</p>
        </div>

        <div className="footer-social">
  <h3>Síguenos</h3>

  <a
    href="https://www.facebook.com/delsonvoz"
    target="_blank"
    rel="noopener noreferrer"
    className="social-icon"
  >
    <img
      src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
      alt="Facebook"
    />
  </a>

  <a
    href="https://www.instagram.com/foster_tattoos/"
    target="_blank"
    rel="noopener noreferrer"
    className="social-icon"
  >
    <img
      src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
      alt="Instagram"
    />
  </a>
</div>


        <div className="copy">
          © {new Date().getFullYear()} Foster Tattoo Studio — Todos los derechos reservados.
        </div>

      </div>
    </footer>
  );
}
