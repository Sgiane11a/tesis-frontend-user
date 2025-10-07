import { BsGrid3X3GapFill, BsCpu, BsPeople, BsPerson } from 'react-icons/bs';

export const userData = {
    name: "Alejandra",
    role: "Alumna",
    avatarUrl: "https://i.pravatar.cc/150?u=alejandra" // Un avatar de ejemplo
};

export const coursesData = [
    { id: 1, title: "Historia del Perú - 1er Año", progress: 65, imageUrl: "https://picsum.photos/seed/historia1/400/200" },
    { id: 2, title: "Historia del Perú - 1er Año", progress: 65, imageUrl: "https://picsum.photos/seed/historia2/400/200" },
    { id: 3, title: "Historia del Perú - 1er Año", progress: 65, imageUrl: "https://picsum.photos/seed/historia3/400/200" },
    { id: 4, title: "Historia del Perú - 1er Año", progress: 65, imageUrl: "https://picsum.photos/seed/historia4/400/200" },
    { id: 5, title: "Historia del Perú - 1er Año", progress: 65, imageUrl: "https://picsum.photos/seed/historia5/400/200" },
    { id: 6, title: "Historia del Perú - 1er Año", progress: 65, imageUrl: "https://picsum.photos/seed/historia6/400/200" },
];

export const navLinks = [
    { id: 'dash', label: 'Dashboard', icon: <BsGrid3X3GapFill />, path: '/student/dashboard' },
    { id: 'ia', label: 'IA general', icon: <BsCpu />, path: '/student/ia' },
    { id: 'people', label: 'Personas', icon: <BsPeople />, path: '/student/personas' },
    { id: 'profile', label: 'Perfil', icon: <BsPerson />, path: '/student/perfil' },
];