// src/landing/components/Hero.jsx

import React from 'react';
// Importa aquí las imágenes si las tienes en tu proyecto
// import heroImage from '../assets/hero-image.png';

const Hero = () => {
  return (
    <section id="inicio" className="hero-section">
      <div className="hero-content">
        <div className="hero-text">
          <p className="powered-by">Potenciado por Inteligencia Artificial</p>
          <h1>Aprende con <br /><span>Inteligencia Artificial</span></h1>
          <p className="hero-description">
            Plataforma educativa inteligente donde estudiantes y profesores
            interactúan con IA especializada en cada materia. Pregunta,
            aprende y enseña de manera revolucionaria.
          </p>
          <div className="hero-cta">
            {/* Como solicitaste, eliminamos el botón "Ver Demo" */}
            <a href="/register" className="btn btn-primary">Comenzar Ahora →</a>
          </div>
          <div className="hero-stats">
            <div>
              <h3>500+</h3>
              <p>Estudiantes Activos</p>
            </div>
            <div>
              <h3>50+</h3>
              <p>Profesores</p>
            </div>
            <div>
              <h3>24/7</h3>
              <p>IA Disponible</p>
            </div>
          </div>
        </div>
        <div className="hero-image-container">
          {/* <img src={heroImage} alt="Estudiantes aprendiendo con IA" /> */}
          <p>[Aquí va la imagen grande de los estudiantes]</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;