import React from 'react';
import { BookOpen } from 'lucide-react';

const CourseBanner = ({ imageUrl, title }) => {
  return (
    <div className="relative w-full h-48 sm:h-56 md:h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-primary-light via-indigo-50 to-blue-50 shadow-sm">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <BookOpen className="w-20 h-20 text-primary/20" strokeWidth={1} />
        </div>
      )}
      {/* Overlay sutil */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
    </div>
  );
};

export { CourseBanner };
