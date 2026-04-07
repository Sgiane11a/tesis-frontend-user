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
  MoreVertical,
  Sparkles, 
  ChevronUp, 
  ChevronDown,
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
  test: FileText,
  chat: MessageSquare,
  x: X,
  
  // Chat y Paneles
  'file-text': FileText,
  sparkles: Sparkles,
  'chevron-up': ChevronUp,
  'chevron-down': ChevronDown,
  'chevrons-up': ChevronUp,
  'chevrons-down': ChevronDown,
  mic: Mic,
  send: Send,
  'panel-open': PanelRightOpen,
  'panel-close': PanelRightClose,
  'more-vertical': MoreVertical,
  more: MoreVertical,
  
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
  // Tipos de archivo específicos
  pdf: FileText,
  ppt: BookOpen,
  word: Book,
  video: MonitorPlay,
  youtube: MonitorPlay,
  link: Book,
};

const Icon = ({ name, size = 20, className }) => {
  const LucideIcon = iconMap[name];
  if (!LucideIcon) {
    // Mostrar advertencia solo en desarrollo para no llenar la consola en producción
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`Icono no encontrado: "${name}"`);
    }
    return null; 
  }
  return <LucideIcon size={size} className={className} />;
};

export { Icon };
export {};