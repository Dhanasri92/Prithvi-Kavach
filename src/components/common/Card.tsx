import type { ReactNode } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CardProps {
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
}

export function Card({ children, className, noPadding = false }: CardProps) {
  return (
    <div
      className={cn(
        'bg-dash-panel border border-gray-800 rounded-xl overflow-hidden shadow-lg',
        !noPadding && 'p-4 sm:p-5',
        className
      )}
    >
      {children}
    </div>
  );
}
