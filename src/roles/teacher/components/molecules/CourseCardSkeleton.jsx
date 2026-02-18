import React from 'react';
import { Card, Skeleton } from '../atoms';

const CourseCardSkeleton = () => (
  <Card hover={false}>
    <Skeleton className="w-full h-40" rounded="rounded-none" />
    <div className="p-5 flex flex-col gap-3">
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
      <div className="flex items-center gap-4 pt-1">
        <Skeleton className="w-12 h-4" />
        <Skeleton className="flex-1 h-2" rounded="rounded-full" />
        <Skeleton className="w-8 h-4" />
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-gray-50">
        <Skeleton className="w-20 h-4" />
        <Skeleton className="w-14 h-4" />
      </div>
    </div>
  </Card>
);

export { CourseCardSkeleton };
