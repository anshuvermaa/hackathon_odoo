// app/(main)/add-product/page.tsx
'use client';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
// Import your AddProductForm here

export default function AddProductPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return <p>Loading...</p>; // Or a spinner component
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Add a New Product</h1>
      {/* <AddProductForm /> */}
      <p>Your Add Product form will go here.</p>
    </div>
  );
}