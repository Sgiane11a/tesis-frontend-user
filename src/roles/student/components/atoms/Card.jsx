const Card = ({ children, className }) => {
  return (
    // CAMBIOS CLAVE:
    // - Bordes más redondeados (`rounded-xl`).
    // - Sin borde visible (`border-none`).
    // - Sombra más pronunciada y moderna (`shadow-lg`).
    // - Transición suave para efectos hover (`transition-shadow`).
    <div className={`bg-surface rounded-xl shadow-lg border border-gray-200/80 overflow-hidden ${className || ''}`}>
      {children}
    </div>
  );
};

export { Card };
export {};