// components/ui/Input.tsx
import { cn } from '@/lib/utils';
import React from 'react';

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      className={cn(
        'flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-green-500 disabled:cursor-not-allowed disabled:opacity-50',
        'border-gray-300 focus:border-green-500',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = 'Input';
export { Input };