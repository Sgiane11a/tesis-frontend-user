
import React from 'react';
import { Avatar } from '../atoms/Avatar';
import { Text } from '../atoms/Text';

// URL estática para el avatar del tutor
const TUTOR_AVATAR_URL = 'https://i.imgur.com/3j3Rf7T.png';

/**
 * Muestra una burbuja de mensaje individual en el chat.
 * Se alinea a la izquierda para el tutor y a la derecha para el usuario.
 * @param {string} message - El texto del mensaje.
 * @param {boolean} isTutor - Si el mensaje es del tutor.
 * @param {string} userName - El nombre del usuario para la inicial del avatar.
 */
const ChatMessage = ({ message, isTutor = false, userName = 'Alumno' }) => {
  return (
    // CONTENEDOR PRINCIPAL DEL MENSAJE
    // La clase `flex-row-reverse` es la clave para alinear los mensajes del usuario a la derecha.
    // Invierte el orden de los elementos hijos (avatar y burbuja).
    <div className={`flex w-full items-end gap-3 ${!isTutor && 'flex-row-reverse'}`}>
      
      {/* AVATAR */}
      {/* Muestra el avatar del tutor o un avatar con la inicial del usuario. */}
      <Avatar 
        src={isTutor ? TUTOR_AVATAR_URL : null} 
        alt={isTutor ? 'Tutor' : userName} 
      />
      
      {/* BURBUJA DEL MENSAJE */}
      {/* Los estilos de color y bordes redondeados se aplican condicionalmente
          para diferenciar visualmente los mensajes del tutor y del usuario. */}
      <div className={`max-w-md p-3 text-sm rounded-t-xl ${
          isTutor
          ? 'bg-white text-gray-800 rounded-r-xl shadow-sm' 
          : 'bg-primary-light text-primary-dark font-medium rounded-l-xl'
      }`}>
        <Text>{message}</Text>
      </div>
    </div>
  );
};

export { ChatMessage };
export {};