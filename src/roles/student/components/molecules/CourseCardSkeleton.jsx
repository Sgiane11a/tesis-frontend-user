import React from 'react'
import { Card } from '../atoms/Card'
import { Skeleton } from '../atoms/Skeleton'

/**
 * Molecule: Skeleton de tarjeta de curso.
 * Replica la estructura visual del CourseCard real para evitar layout shift.
 */
const CourseCardSkeleton = () => (
  <Card className="overflow-hidden">
    {/* Imagen placeholder */}
    <Skeleton className="w-full h-44" rounded="rounded-none" />

    <div className="p-5 flex flex-col gap-4">
      {/* Título */}
      <div>
        <Skeleton className="h-5 w-3/4 mb-3" />
        <div className="flex items-center gap-3">
          <Skeleton className="w-8 h-8" rounded="rounded-full" />
          <div className="flex-1">
            <Skeleton className="h-4 w-28 mb-1" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      </div>

      {/* Barra de progreso */}
      <div className="flex items-center gap-4">
        <Skeleton className="flex-1 h-2.5" rounded="rounded-full" />
        <Skeleton className="w-10 h-4" />
      </div>

      {/* Botones */}
      <div className="pt-2 flex items-center gap-3">
        <Skeleton className="flex-1 h-12" rounded="rounded-lg" />
        <Skeleton className="w-12 h-12" rounded="rounded-lg" />
      </div>
    </div>
  </Card>
)

export { CourseCardSkeleton }
