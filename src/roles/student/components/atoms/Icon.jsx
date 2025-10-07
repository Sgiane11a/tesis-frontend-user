// src/roles/student/components/atoms/Icon.jsx (CÓDIGO CORREGIDO Y LIMPIO)

import React from 'react';
import { 
  // Iconos de Navegación y Generales
  LayoutGrid, 
  BrainCircuit, 
  Users, 
  UserCircle, 
  Search, 
  Book, 
  MonitorPlay,
  FileText, 
  MessageSquare, 
  Sparkles, 
  ChevronUp, 
  Mic, 
  Send,
  X,
  
  // Iconos para FAQ y Paneles
  Lightbulb, 
  TrendingUp, // Importado aquí una sola vez
  Clock,
  PanelRightOpen, 
  PanelRightClose,
  
  // Iconos para Perfil de Usuario
  Mail, 
  Phone, 
  Calendar, 
  Home, 
  Shield, 
  Siren,
  GraduationCap, 
  BookOpen, 
  CheckCircle,
  HeartPulse // Este también faltaba en tu código anterior
  
} from 'lucide-react';

const iconMap = {
  // Navegación
  dashboard: LayoutGrid,
  ia: BrainCircuit,
  people: Users,
  profile: UserCircle,
  
  // Generales
  search: Search,
  book: Book,
  video: MonitorPlay, // Asegúrate de que este es el nombre correcto, la imagen usa 'monitor-play'
  test: FileText,
  chat: MessageSquare,
  x: X,
  
  // Chat y Paneles
  'file-text': FileText,
  sparkles: Sparkles,
  'chevron-up': ChevronUp,
  mic: Mic,
  send: Send,
  'panel-open': PanelRightOpen,
  'panel-close': PanelRightClose,
  
  // FAQ y Temas
  lightbulb: Lightbulb,
  'trending-up': TrendingUp,
  clock: Clock,
  
  // Perfil de Usuario
  mail: Mail,
  phone: Phone,
  calendar: Calendar,
  home: Home,
  shield: Shield,
  siren: Siren,
  'graduation-cap': GraduationCap,
  'book-open': BookOpen,
  'check-circle': CheckCircle,
  'heart-pulse': HeartPulse, // Añadido
};

const Icon = ({ name, size = 20, className }) => {
  const LucideIcon = iconMap[name];
  if (!LucideIcon) {
    // Es buena práctica mostrar un error en la consola si un icono no se encuentra
    console.warn(`Icono no encontrado: "${name}"`);
    return null; 
  }
  return <LucideIcon size={size} className={className} />;
};

export { Icon };
export {};