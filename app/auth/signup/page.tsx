'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Eye, EyeOff, Mail, Lock, User, Loader2, ArrowLeft, Heart, Check, Headset } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function SignUpPage() {
  const router = useRouter();
  const { register, isAuthenticated, isLoading: authLoading } = useAuth();
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    agreeToPrivacy: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, authLoading, router]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms';
    if (!formData.agreeToPrivacy) newErrors.agreeToPrivacy = 'You must agree to the privacy policy';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      const result = await register({
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        firstName: formData.firstName,
        lastName: formData.lastName,
      });

      if (result.success) {
        router.push('/dashboard');
      } else {
        setErrors({ general: result.error || 'Registration failed' });
      }
    } catch (error) {
      setErrors({ general: 'An unexpected error occurred' });
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-600">Loading...</span>
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
          <h2 className="text-[40px] font-semibold text-[#0B3C49] font-acme">Join Our Platform</h2>
          <p className="text-[18px] text-gray-600 mt-1 italic">Create your account to get started</p>

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
    <div className="flex flex-col items-center justify-center p-8">
      <div className="w-full bg-[#C2BCAE]/30 p-6 rounded-3xl">
        {/* Sign Up Card */}
        <div className="w-full max-w-md bg-[#677E83] p-10 rounded-3xl shadow-lg text-[#FAEFD9]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <h2 className="text-center text-2xl font-semibold mb-8 text-[#0B3C49] font-acme">
              Sign Up
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label htmlFor="firstName" className="block text-sm mb-1 text-[#044750] text-[20px] font-acme font-medium">
                First Name
              </label>
              <label htmlFor="lastName" className="block text-sm mb-1 text-[#044750] text-[20px] font-acme font-medium">
                Last Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full rounded-full border border-[#FAEFD9] bg-transparent px-4 py-2 placeholder-[#FAEFD9] text-[#FAEFD9] focus:ring-2 focus:ring-[#FAEFD9] focus:outline-none"
              />
              <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full rounded-full border border-[#FAEFD9] bg-transparent px-4 py-2 placeholder-[#FAEFD9] text-[#FAEFD9] focus:ring-2 focus:ring-[#FAEFD9] focus:outline-none"
              />
            </div>
            <label htmlFor="email" className="block text-sm mb-1 text-[#044750] text-[20px] font-acme font-medium">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your Email Address"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full rounded-full border border-[#FAEFD9] bg-transparent px-4 py-2 placeholder-[#FAEFD9] text-[#FAEFD9] focus:ring-2 focus:ring-[#FAEFD9] focus:outline-none"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label htmlFor="password" className="block text-sm mb-1 text-[#044750] text-[20px] font-acme font-medium">Password</label>
              <label htmlFor="confirmPassword" className="block text-sm mb-1 text-[#044750] text-[20px] font-acme font-medium">Confirm Password</label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full rounded-full border border-[#FAEFD9] bg-transparent px-4 py-2 placeholder-[#FAEFD9] text-[#FAEFD9] focus:ring-2 focus:ring-[#FAEFD9] focus:outline-none"
              />

              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full rounded-full border border-[#FAEFD9] bg-transparent px-4 py-2 placeholder-[#FAEFD9] text-[#FAEFD9] focus:ring-2 focus:ring-[#FAEFD9] focus:outline-none"
              />
            </div>
            <div className="space-y-2 mt-4">
              <label className="flex items-center space-x-2 text-sm text-[#FAEFD9]">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="rounded"
                />
                <span>
                  I agree to the{' '}
                  <Link href="/terms" className="text-[#2AB1F4] hover:underline">
                    Terms of Service
                  </Link>
                </span>
              </label>
              <label className="flex items-center space-x-2 text-sm text-[#FAEFD9]">
                <input
                  type="checkbox"
                  name="agreeToPrivacy"
                  checked={formData.agreeToPrivacy}
                  onChange={handleInputChange}
                  className="rounded"
                />
                <span>
                  I agree to the{' '}
                  <Link href="/privacy" className="text-[#2AB1F4] hover:underline">
                    Privacy Policy
                  </Link>
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full text-[18px] mt-6 border border-[#FAEFD9] text-[#044750] py-2 rounded-full font-semibold hover:bg-[#FAEFD9] hover:text-[#0B3C49] transition-all font-acme"
            >
              Create Account
            </button>
          </form>
        </div>

    </div>
    
    {/* Sign In Link */}
    <div className="text-center mb-6">
      <p className="text-gray-600 text-sm">
        Already have an account?{' '}
        <Link href="/auth/signin" className="text-[#0B3C49] hover:underline font-medium">
          Sign in here
        </Link>
      </p>
    </div>

    {/* Divider */}
    <div className="flex items-center justify-center my-8">
      <div className="flex-1 h-px bg-gray-300" />
      <span className="px-3 text-gray-700 text-sm">OR</span>
      <div className="flex-1 h-px bg-gray-300" />
    </div>

    {/* Anonymous Access */}
    <div className="bg-[#C2D0D2] rounded-2xl w-full max-w-md p-6 text-center shadow-md">
      <h3 className="text-[#0B3C49] text-lg font-bold mb-3 flex items-center justify-center gap-2">
        <Headset className="h-6 w-6 text-[#0B3C49]" />
        Need Quick Help Access
      </h3>
      <p className="text-sm text-[#0B3C49]/80 mb-4">
        Get help resources and access our AI text support without registration
      </p>
      <button
              type="button"
              onClick={() => router.push('/anonymous-access')}
              className="bg-[#FBF9F4] text-[#0B3C49] px-6 py-2 shadow-sm hover:bg-[#092F3A] hover:text-[#FEF5E3] transition text-sm"
            >
              Anonymous Access →
            </button>
    </div>
  </div>
      </div>
    </main>
  );
}
