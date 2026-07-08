import { useState, useEffect } from 'react'

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuActive, setMenuActive] = useState(false);

  // Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-up, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => observer.observe(el));
    
    // Initial check for elements in viewport
    setTimeout(() => {
      animatedElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          el.classList.add('visible');
          observer.unobserve(el);
        }
      });
    }, 100);

    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuActive(false);

  return (
    <>
      {/* Floating WhatsApp */}
      <a href="https://wa.me/526181686644?text=Hola,%20me%20gustaría%20más%20información%20sobre%20sus%20productos." className="floating-wa" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {/* Header */}
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container navbar-inner">
          <a href="#" className="logo">B&C <span className="accent">Durango</span></a>
          <nav className={`nav-links ${menuActive ? 'active' : ''}`}>
            <a href="#hero" onClick={closeMenu}>Inicio</a>
            <a href="#nosotros" onClick={closeMenu}>Nosotros</a>
            <a href="#productos" onClick={closeMenu}>Productos</a>
            <a href="#contacto" onClick={closeMenu}>Contacto</a>
          </nav>
          <div className={`menu-toggle ${menuActive ? 'active' : ''}`} onClick={() => setMenuActive(!menuActive)}>
            <span></span><span></span><span></span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="hero">
        <div className="hero-bg">
          <img src="/assets/premium_hero_bed_1783477751327.png" alt="Cama premium Durango" />
        </div>
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <p className="subtitle fade-up">Más de 20 años vistiendo hogares</p>
          <h1 className="title fade-up delay-1">Confort y Elegancia <br /> Para Tu Hogar</h1>
          <p className="desc fade-up delay-2">Productos de alta calidad que transforman tu espacio en un refugio de descanso y calidez inigualable.</p>
          <div className="hero-actions fade-up delay-3">
            <a href="#productos" className="btn btn-primary">Ver Colección</a>
          </div>
        </div>
      </section>

      {/* Nosotros */}
      <section id="nosotros" className="section about-section">
        <div className="container">
          <div className="about-grid">
            <div className="about-text slide-in-left">
              <h2 className="section-title">Nuestra Historia</h2>
              <p>En Blancos y Confecciones de Durango llevamos más de dos décadas comprometidos con la calidad. Nos apasiona brindar a nuestros clientes productos que no solo decoran sus hogares, sino que también ofrecen un confort excepcional. Apoyamos el talento local y el empoderamiento a través de la venta directa.</p>
            </div>
            <div className="about-stats slide-in-right">
              <div className="stat-card glass">
                <h3>20+</h3>
                <p>Años de Experiencia</p>
              </div>
              <div className="stat-card glass">
                <h3>10k+</h3>
                <p>Hogares Vistiendo</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Productos */}
      <section id="productos" className="section products-section">
        <div className="container">
          <div className="section-header text-center fade-up">
            <h2 className="section-title">Nuestra Colección Premium</h2>
            <p>Descubre nuestra selección de productos diseñados para tu máximo descanso.</p>
          </div>
          <div className="product-grid">
            <div className="product-card glass fade-up delay-1">
              <div className="product-img">
                <img src="/assets/cozy_soft_sheets_1783477760176.png" alt="Sábanas Premium" />
              </div>
              <div className="product-info">
                <h3>Sábanas Ultra Suaves</h3>
                <p>Algodón puro y texturas suaves que aseguran un descanso profundo.</p>
              </div>
            </div>
            <div className="product-card glass fade-up delay-2">
              <div className="product-img">
                <img src="/assets/elegant_pillows_stack_1783477767825.png" alt="Almohadas" />
              </div>
              <div className="product-info">
                <h3>Almohadas Confort</h3>
                <p>Soporte perfecto para tu cuello y cabeza con nuestra línea de almohadas.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contacto / Footer */}
      <footer id="contacto" className="footer">
        <div className="container footer-grid">
          <div className="footer-info">
            <h2 className="footer-logo">B&C Durango</h2>
            <p>Tu descanso es nuestra prioridad. Vistiendo hogares con calidad desde hace más de 20 años.</p>
          </div>
          <div className="footer-contact">
            <h3>Contacto</h3>
            <p>📍 Durango, México</p>
            <p>📞 +52 618 168 6644</p>
            <a href="https://wa.me/526181686644" className="btn btn-secondary mt-1" target="_blank" rel="noopener noreferrer">Escríbenos ahora</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Blancos y Confecciones de Durango S.A. de C.V. Todos los derechos reservados.</p>
        </div>
      </footer>
    </>
  )
}

export default App
