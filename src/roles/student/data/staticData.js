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
    { id: 's1', title: 'Semana 01 - Rebelión de José Gabriel Condorcanqui', items: [
        { id: 'd1', title: 'Documento de la Rebelión', type: 'pdf' },
        { id: 'd2', title: 'Presentación - Introducción', type: 'ppt' },
        { id: 'd3', title: 'Guía de lectura (apuntes del profesor)', type: 'word' },
        { id: 'd4', title: 'Video: Contexto histórico (12:34)', type: 'video' },
    ] },

    { id: 's2', title: 'Semana 02 - Corriente Libertadora del Sur', items: [
        { id: 'd5', title: 'Lectura: Análisis de fuentes primarias', type: 'pdf' },
        { id: 'd6', title: 'Actividad práctica: Mapa interactivo', type: 'link' },
        { id: 'd7', title: 'Video: Testimonio de la época', type: 'video' },
    ] },

    { id: 's3', title: 'Semana 03 - Independencia y procesos regionales', items: [
        { id: 'd8', title: 'Presentación: Líderes regionales', type: 'ppt' },
        { id: 'd9', title: 'Documento: Tratados y acuerdos (resumen)', type: 'pdf' },
        { id: 'd10', title: 'Ejercicio: Preguntas tipo test', type: 'quiz' },
    ] },

    { id: 's4', title: 'Semana 04 - Reformas sociales y económicas', items: [
        { id: 'd11', title: 'Artículo académico: Reforma agraria', type: 'pdf' },
        { id: 'd12', title: 'Tarea: Ensayo corto (subir ZIP)', type: 'zip' },
    ] },

    { id: 's5', title: 'Semana 05 - Guerra y consecuencias', items: [
        { id: 'd13', title: 'Documental corto (17:20)', type: 'video' },
        { id: 'd14', title: 'Infografía: Línea de tiempo', type: 'image' },
        { id: 'd15', title: 'Lectura complementaria', type: 'pdf' },
    ] },

    { id: 's6', title: 'Semana 06 - Evaluación final', items: [
        { id: 'd16', title: 'Examen final (formato online)', type: 'quiz' },
        { id: 'd17', title: 'Rubrica de evaluación', type: 'pdf' },
    ] },
];