// app/(main)/products/[id]/page.tsx
'use client';
import api from '@/lib/api';
import { Product, Review } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

const fetchProduct = async (id: string): Promise<Product> => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};

const fetchReviews = async (id: string): Promise<Review[]> => {
  const { data } = await api.get(`/reviews/product/${id}`);
  return data;
};

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;

  const { data: product, isLoading: productLoading } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => fetchProduct(productId),
    enabled: !!productId,
  });

  const { data: reviews, isLoading: reviewsLoading } = useQuery({
    queryKey: ['reviews', productId],
    queryFn: () => fetchReviews(productId),
    enabled: !!productId,
  });

  if (productLoading) return <p>Loading product...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="bg-gray-200 aspect-square rounded-lg mb-4" />
        </div>
        <div>
          <h1 className="text-4xl font-bold">{product.title}</h1>
          <p className="text-2xl font-semibold text-green-600 my-2">${product.price}</p>
          <p className="text-gray-500 mb-4">Condition: {product.condition}</p>
          <p className="text-gray-700 leading-relaxed">{product.description}</p>
          {/* Add to Cart / Add to Favorites Button would go here */}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        {/* AddReviewForm would go here */}
        <div className="space-y-4">
          {reviewsLoading ? <p>Loading reviews...</p> : 
            reviews?.map(review => (
              <div key={review._id} className="border p-4 rounded-md">
                <p className="font-semibold">{review.user.username} - {'⭐'.repeat(review.rating)}</p>
                <p className="text-gray-600 mt-1">{review.comment}</p>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}