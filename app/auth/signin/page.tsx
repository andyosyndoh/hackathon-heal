'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Loader2, ArrowLeft, Headset } from 'lucide-react';
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
    <main className="min-h-screen bg-[#FAEFD9] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decoration Images */}
      <Image src="/images/decoration.png" alt="Decoration" 
              className="absolute top-1/5 left-1/4 w-auto h-auto opacity-70 -rotate-12"
              width={80}
              height={80}
              priority />
      <Image src="/images/decoration.png" alt="Decoration" 
              className="absolute top-1/3 right-1/5 w-auto h-auto opacity-60 rotate-25"
              width={70}
              height={70}
              priority />
      <Image src="/images/decoration.png" alt="Decoration" 
              className="absolute bottom-1/3 left-1/2 w-auto h-auto opacity-50 -rotate-15"
              width={90}
              height={90}
              priority />
      <Image src="/images/decoration.png" alt="Decoration" 
              className="absolute bottom-1/4 right-1/3 w-auto h-auto opacity-70 rotate-15"
              width={60}
              height={60}
              priority />
      <Image src="/images/decoration.png" alt="Decoration" 
              className="absolute top-1/2 -right-8 w-auto h-auto opacity-60 -rotate-20"
              width={70}
              height={70}
              priority />
      <Image src="/images/decoration.png" alt="Decoration" 
              className="absolute top-1/2 -left-8 w-auto h-auto opacity-50 rotate-30"
              width={80}
              height={80}
              priority />
      <Image src="/images/decoration.png" alt="Decoration" 
              className="absolute bottom-1/5 right-1/2 w-auto h-auto opacity-70 -rotate-5"
              width={65}
              height={65}
              priority />
      <Image src="/images/decoration.png" alt="Decoration" 
              className="absolute -top-8 -left-8 w-auto h-auto"
              width={100}
              height={100}
              priority />
      <Image src="/images/logo.png" alt='logo' className="absolute top-6 left-8 w-auto h-auto"
              width={80}
              height={80}
              priority />
      <div className="flex flex-col md:flex-row w-full max-w-5xl overflow-hidden">
        
        {/* LEFT SIDE */}
        <div className="flex flex-col justify-center items-center md:w-1/2 p-10 text-center">
          <Link href="/" className="text-sm text-gray-500 mb-4 w-full flex items-left gap-1 hover:underline text-[18px]" style={{fontFamily: 'Acme, cursive'}}>
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
          <h2 className="text-[40px] font-semibold text-[#0B3C49]" style={{fontFamily: 'Acme, cursive'}}>Join Our Platform</h2>
          <p className="text-[18px] text-gray-600 mt-1 italic">Get full access to all platform features</p>

          <div className="my-8">
            <Image
              src="/images/hugging-friends.png"
              alt="Group hugging"
              width={220}
              height={220}
              className="rounded-lg object-cover"
            />
          </div>

          <p className="text-[#006C67] text-[20px] font-bold max-w-sm leading-relaxed" style={{fontFamily: 'Acme, cursive'}}>
            “Access confidential, dignified mental<br/>
            health support anytime,<br/>
            anywhere.” <span className="font-bold">24/7</span>
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="md:w-1/2 flex flex-col items-center justify-center p-8">
          <div className='w-full bg-[#C2BCAE] bg-opacity-40 p-6 rounded-3xl'>
          {/* Sign In Card */}
          <div className="w-full max-w-md bg-[#677E83] p-8 rounded-3xl shadow-md text-[#0B3C49]">
            <h2 className="text-center text-2xl font-semibold mb-8 text-[#0B3C49]" style={{fontFamily: 'Acme, cursive'}}>
              Sign In
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm mb-1 font-medium">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full rounded-full px-4 py-2 text-[#FEF0D3] bg-[#677E83] placeholder-[#FEF0D3] border ${
                    errors.email ? 'border-red-500' : 'border-[#FEF0D3]'
                  } focus:ring-2 focus:ring-[#0B3C49] focus:outline-none`}
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm mb-1 font-medium">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full rounded-full px-4 py-2 text-[#FEF0D3] bg-[#677E83] placeholder-[#FEF0D3] border ${
                    errors.password ? 'border-red-500' : 'border-[#FEF0D3]'
                  } focus:ring-2 focus:ring-[#0B3C49] focus:outline-none`}
                  required
                />
                <div className="text-right text-xs mt-2 text-[#0B3C49] hover:underline cursor-pointer">
                  Forgot your password?
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              {/* Keep Signed In */}
              <div className="flex items-center gap-2 text-sm text-[#FEF0D3]">
                <input
                  type="checkbox"
                  id="keepSignedIn"
                  checked={keepSignedIn}
                  onChange={() => setKeepSignedIn(!keepSignedIn)}
                  className="accent-[#FEF0D3]"
                />
                <label htmlFor="keepSignedIn">Keep me signed in.</label>
              </div>

              {/* General error */}
              {errors.general && (
                <p className="text-red-500 text-sm text-center">{errors.general}</p>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="w-full mt-2 border border-[#FEF0D3] text-[#044750] py-2 rounded-full font-medium hover:bg-[#092F3A] hover:text-[#FEF0D3] transition disabled:opacity-50"
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
          <div className="flex items-center justify-center w-full max-w-md my-8">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="px-2 text-sm text-gray-600">OR</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          {/* Sign Up Link */}
          <div className="text-center mb-6">
            <p className="text-gray-600 text-sm">
              Don't have an account?{' '}
              <Link href="/auth/signup" className="text-[#0B3C49] hover:underline font-medium">
                Sign up here
              </Link>
            </p>
          </div>

          {/* Anonymous Access */}
          <div className="bg-[#B0BEC0] rounded-2xl w-full max-w-md p-6 text-center shadow-sm">
            
            <h3 className="text-[#0B3C49] text-[24px] font-semibold mb-2 flex items-center justify-center gap-2" style={{fontFamily: 'Acme, cursive'}}>
              <Headset className="h-8 w-8 text-[#0B3C49]" />
              <span>Need Quick Help Access</span>
            </h3>
            <p className="text-sm text-gray-700 mb-4">
              Get help resources and access our AI text support without registration
            </p>
            <button
              type="button"
              onClick={() => router.push('/anonymous-access')}
              className="bg-[#FBF9F4] text-[#0B3C49] px-6 py-2 shadow-sm hover:bg-[#092F3A] hover:text-[#FEF0D3] transition text-sm"
            >
              Anonymous Access →
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}
