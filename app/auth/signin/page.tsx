'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function SignInPage() {
  const router = useRouter();
  const { login, isAuthenticated, isLoading: authLoading } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [keepSignedIn, setKeepSignedIn] = useState(false);

  // Redirect authenticated users
  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, authLoading, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      const result = await login(formData.email, formData.password);
      if (result.success) router.push('/dashboard');
      else setErrors({ general: result.error || 'Authentication failed' });
    } catch (err) {
      setErrors({ general: 'An unexpected error occurred' });
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#C8E1E7] flex items-center justify-center">
        <div className="flex items-center space-x-2 text-[#0B3C49]">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAEFD9] flex items-center justify-center p-6">
      <Image src="/images/decoration.png" alt="Decoration" 
              className="absolute top-0 left-0 w-auto h-auto"
              width={100}
              height={100}
              priority />
      <div className="flex flex-col md:flex-row w-full max-w-5xl overflow-hidden">
        
        {/* LEFT SIDE */}
        <div className="flex flex-col justify-center items-center md:w-1/2 p-10 text-center">
          <Link href="/" className="text-sm text-gray-500 mb-4 flex items-center gap-1 hover:underline">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
          <h2 className="text-2xl font-semibold text-[#0B3C49]">Join Our Platform</h2>
          <p className="text-sm text-gray-600 mt-1">Get full access to all platform features</p>

          <div className="my-8">
            <Image
              src="/images/hugging-friends.png"
              alt="Group hugging"
              width={220}
              height={220}
              className="rounded-lg object-cover"
            />
          </div>

          <p className="text-[#006C67] font-medium max-w-sm leading-relaxed">
            “Access confidential, dignified mental health support anytime,
            anywhere.” <span className="font-bold">24/7</span>
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="md:w-1/2 flex flex-col items-center justify-center p-10">
        <div className='bg-[#758E8A] bg-opacity-40 p-10 rounded-l-3xl md:rounded-none'>

          <div className="bg-[#758E8A] text-white rounded-2xl shadow-md w-full max-w-sm p-8">
            <h2 className="text-center text-xl font-semibold mb-6">Sign In</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full rounded-md px-3 py-2 text-black outline-none border ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-[#0B3C49]`}
                  required
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm mb-1">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full rounded-md px-3 py-2 text-black outline-none border ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-[#0B3C49]`}
                  required
                />
                <div className="text-right text-xs mt-1 text-[#0B3C49] hover:underline cursor-pointer">
                  Forgot your password?
                </div>
                {errors.password && (
                  <p className="text-red-400 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              {/* Keep Signed In */}
              <div className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  id="keepSignedIn"
                  checked={keepSignedIn}
                  onChange={() => setKeepSignedIn(!keepSignedIn)}
                  className="accent-[#0B3C49]"
                />
                <label htmlFor="keepSignedIn">Keep me signed in</label>
              </div>

              {/* General error */}
              {errors.general && (
                <p className="text-red-400 text-sm text-center">{errors.general}</p>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="w-full mt-4 bg-[#0B3C49] text-white py-2 rounded-md hover:bg-[#092F3A] transition disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="animate-spin h-4 w-4" /> Signing in...
                  </span>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>
          </div>
        </div>

          {/* OR Divider */}
          <div className="flex items-center justify-center w-full max-w-sm my-6">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="px-2 text-sm text-gray-600">OR</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          {/* Anonymous Access */}
          <div className="bg-[#FAEFD9] rounded-2xl shadow-sm w-full max-w-sm p-6 text-center">
            <h3 className="text-[#0B3C49] font-medium mb-2">
              Need Quick Help Access
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Get help resources and access our AI text support without registration
            </p>
            <button
              type="button"
              onClick={() => router.push('/anonymous-access')}
              className="bg-[#0B3C49] text-white px-4 py-2 rounded-md hover:bg-[#092F3A] transition text-sm"
            >
              Anonymous Access →
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
