
import React, { useState } from 'react';
import '../style/Header.css'; // <-- Ruta corregida a tu archivo de estilos

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        <a href="/" className="logo-container">
          <div className="logo-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5"></path></svg>
          </div>
          <div className="logo-text">
            <span className="logo-main">EduIA</span>
            <span className="logo-sub">Plataforma Educativa</span>
          </div>
        </a>

        <nav className="nav-desktop">
          <a href="#inicio">Inicio</a>
          <a href="#como-funciona">Como Funciona</a>
          <a href="#caracteristicas">Características</a>
          <a href="#ia-educativa">IA educativa</a>
        </nav>

        <div className="cta-desktop">
          <a href="/login" className="cta-button">Iniciar Sesión</a>
        </div>

        <button className="menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          )}
        </button>
      </div>

      {isMenuOpen && (
        <nav className="nav-mobile">
          <a href="#inicio" onClick={toggleMenu}>Inicio</a>
          <a href="#como-funciona" onClick={toggleMenu}>Como Funciona</a>
          <a href="#caracteristicas" onClick={toggleMenu}>Características</a>
          <a href="#ia-educativa" onClick={toggleMenu}>IA educativa</a>
          <a href="/login" className="cta-button-mobile" onClick={toggleMenu}>Iniciar Sesión</a>
        </nav>
      )}
    </header>
  );
};

export default Header;