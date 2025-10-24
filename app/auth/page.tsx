'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Redirect to the appropriate new route based on mode parameter
  useEffect(() => {
    const mode = searchParams.get('mode');
    if (mode === 'signup') {
      router.replace('/auth/signup');
    } else {
      router.replace('/auth/signin');
    }
  }, [router, searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
      <div className="flex items-center space-x-2">
        <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
        <span className="text-gray-600">Redirecting...</span>
      </div>
    </div>
  );
}