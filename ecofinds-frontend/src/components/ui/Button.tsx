// components/ui/Button.tsx
import { cn } from '@/lib/utils';
import React from 'react';

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
        'bg-green-600 text-white hover:bg-green-700 h-10 py-2 px-4',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = 'Button';
export { Button };