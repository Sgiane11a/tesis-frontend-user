import { BsGrid3X3GapFill, BsCpu, BsPeople, BsPerson } from 'react-icons/bs';

export const userData = {
    name: "Alejandra",
    role: "Alumna",
    avatarUrl: "https://i.pravatar.cc/150?u=alejandra" // Un avatar de ejemplo
};

export const navLinks = [
    { id: 'dash', label: 'Dashboard', iconName: 'dashboard', path: '/student/dashboard' },
    { id: 'ia', label: 'IA general', iconName: 'ia', path: '/student/ia' },
    { id: 'people', label: 'Personas', iconName: 'people', path: '/student/personas' },
    { id: 'profile', label: 'Perfil', iconName: 'profile', path: '/student/perfil' },
];

export const sampleModules = [
    { id: 's1', title: 'Módulo 1 - Cuentos y relatos', items: [
        { id: 'd1', title: 'Documento de Cuentos clásicos', type: 'pdf' },
        { id: 'd2', title: 'Presentación: Introducción a los cuentos', type: 'ppt' },
        { id: 'd3', title: 'Guía de lectura', type: 'word' },
        { id: 'd4', title: 'Video: Cuentos populares', type: 'video' },
    ] },

    { id: 's2', title: 'Módulo 2 - Comprensión lectora', items: [
        { id: 'd5', title: 'Lectura: Textos narrativos', type: 'pdf' },
        { id: 'd6', title: 'Actividad práctica: Interpretación', type: 'link' },
        { id: 'd7', title: 'Video: Estrategias de lectura', type: 'video' },
    ] },

    { id: 's3', title: 'Módulo 3 - Gramática y estilo', items: [
        { id: 'd8', title: 'Presentación: Clases de palabra', type: 'ppt' },
        { id: 'd9', title: 'Documento: Oraciones compuestas', type: 'pdf' },
        { id: 'd10', title: 'Ejercicio: Reescritura de textos', type: 'quiz' },
    ] },

    { id: 's4', title: 'Módulo 4 - Producción de texto', items: [
        { id: 'd11', title: 'Artículo: Escritura creativa', type: 'pdf' },
        { id: 'd12', title: 'Tarea: Redacción de cuento', type: 'zip' },
    ] },

    { id: 's5', title: 'Módulo 5 - Literatura clásica', items: [
        { id: 'd13', title: 'Documental corto: Autores clásicos', type: 'video' },
        { id: 'd14', title: 'Infografía: Movimientos literarios', type: 'image' },
        { id: 'd15', title: 'Lectura complementaria', type: 'pdf' },
    ] },

    { id: 's6', title: 'Módulo 6 - Evaluación y repaso', items: [
        { id: 'd16', title: 'Examen final (formato online)', type: 'quiz' },
        { id: 'd17', title: 'Rubrica de evaluación', type: 'pdf' },
    ] },
];