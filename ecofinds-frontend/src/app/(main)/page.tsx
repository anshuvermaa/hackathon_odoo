// app/(main)/page.tsx
'use client';
import api from '@/lib/api';
import { Product } from '@/types';
import { useQuery } from '@tanstack/react-query';
import ProductCard from '@/components/ProductCard';

const fetchProducts = async (): Promise<Product[]> => {
  const { data } = await api.get('/products');
  return data;
};

export default function HomePage() {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products.</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Sustainable Finds</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}