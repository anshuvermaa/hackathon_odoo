// components/Navbar.tsx
'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Button } from './ui/Button';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/auth');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-green-600">
          EcoFinds
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-gray-600 hover:text-green-600">Home</Link>
          {user ? (
            <>
              <Link href="/add-products" className="text-gray-600 hover:text-green-600">Add Product</Link>
              <Link href="/favorites" className="text-gray-600 hover:text-green-600">Favorites</Link>
              <Link href="/orders" className="text-gray-600 hover:text-green-600">My Orders</Link>
              <Button onClick={handleLogout} variant="outline">Logout</Button>
            </>
          ) : (
            <Link href="/auth">
              <Button>Login / Register</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}