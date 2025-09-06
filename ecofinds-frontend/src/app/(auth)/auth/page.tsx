// app/(auth)/auth/page.tsx
'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import LoginForm from '@/components/forms/LoginForm';
import RegisterForm from '@/components/forms/RegisterForm';

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex border-b">
            <button
              className={`flex-1 py-2 text-center font-semibold ${
                activeTab === 'login' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('login')}
            >
              Login
            </button>
            <button
              className={`flex-1 py-2 text-center font-semibold ${
                activeTab === 'register' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('register')}
            >
              Register
            </button>
          </div>
        </CardHeader>
        <CardContent>
          {activeTab === 'login' ? <LoginForm /> : <RegisterForm onSuccess={() => setActiveTab('login')} />}
        </CardContent>
      </Card>
    </div>
  );
}