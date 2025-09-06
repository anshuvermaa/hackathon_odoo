// components/ProductCard.tsx
import { Product } from '@/types';
import Link from 'next/link';
import { Card, CardContent, CardTitle } from './ui/Card';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product._id}`}>
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardContent className="p-4">
          {/* You would add an Image component here */}
          <div className="bg-gray-200 h-48 w-full rounded-md mb-4" />
          <CardTitle className="text-lg font-semibold">{product.title}</CardTitle>
          <p className="text-gray-500 text-sm mt-1">{product.category}</p>
          <p className="text-lg font-bold text-green-600 mt-2">${product.price}</p>
        </CardContent>
      </Card>
    </Link>
  );
}