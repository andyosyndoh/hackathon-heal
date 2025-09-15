'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Heart, 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  ArrowLeft,
  Shield,
  Loader2
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/hooks/use-auth';

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, register, isAuthenticated, isLoading: authLoading } = useAuth();
  
  const [mode, setMode] = useState(searchParams.get('mode') === 'signup' ? 'signup' : 'signin');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    agreeToPrivacy: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, authLoading, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (mode === 'signup') {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms';
      if (!formData.agreeToPrivacy) newErrors.agreeToPrivacy = 'You must agree to the privacy policy';
    }

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      let result;
      
      if (mode === 'signup') {
        result = await register({
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          firstName: formData.firstName,
          lastName: formData.lastName,
        });
      } else {
        result = await login(formData.email, formData.password);
      }

      if (result.success) {
        router.push('/dashboard');
      } else {
        setErrors({ general: result.error || 'Authentication failed' });
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
          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          <span className="text-gray-600">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FCF4E3] flex" style={{ fontFamily: 'Acme, sans-serif' }}>
      {/* Left Side - Logo */}
      <div className="absolute top-6 left-6 z-10">
        <Image
          src="/images/healLOGO.png"
          alt="HEAL Logo"
          width={120}
          height={120}
          className="w-30 h-30"
        />
      </div>

      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center px-8 py-12 relative">

        
        <div className="absolute bottom-24 left-8" aria-hidden="true">
          <svg width={48} height={48} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <rect x={18} y={5} rx={2.5} ry={2.5} width={6} height={16} fill="#EDC865" opacity={0.6} transform="rotate(0 24 24)" />
            <rect x={18} y={5} rx={2.5} ry={2.5} width={6} height={16} fill="#EDC865" opacity={0.6} transform="rotate(60 24 24)" />
            <rect x={18} y={5} rx={2.5} ry={2.5} width={6} height={16} fill="#EDC865" opacity={0.6} transform="rotate(120 24 24)" />
            <rect x={18} y={5} rx={2.5} ry={2.5} width={6} height={16} fill="#EDC865" opacity={0.6} transform="rotate(180 24 24)" />
            <rect x={18} y={5} rx={2.5} ry={2.5} width={6} height={16} fill="#EDC865" opacity={0.6} transform="rotate(240 24 24)" />
          </svg>
        </div>
        
        <div className="absolute top-1/2 left-4" aria-hidden="true">
          <svg width={40} height={40} viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <rect x={15} y={4} rx={2} ry={2} width={5} height={14} fill="#EDC865" opacity={0.65} transform="rotate(0 20 20)" />
            <rect x={15} y={4} rx={2} ry={2} width={5} height={14} fill="#EDC865" opacity={0.65} transform="rotate(72 20 20)" />
            <rect x={15} y={4} rx={2} ry={2} width={5} height={14} fill="#EDC865" opacity={0.65} transform="rotate(144 20 20)" />
            <rect x={15} y={4} rx={2} ry={2} width={5} height={14} fill="#EDC865" opacity={0.65} transform="rotate(216 20 20)" />
            <rect x={15} y={4} rx={2} ry={2} width={5} height={14} fill="#EDC865" opacity={0.65} transform="rotate(288 20 20)" />
          </svg>
        </div>
        
        <div className="w-full max-w-md">
          {/* Back to Home Link */}
          <Link href="/" className="inline-flex items-center space-x-2 text-[#016A79] hover:text-[#014d5a] mb-8">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back To Home</span>
          </Link>

          {/* Form Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {mode === 'signup' ? 'Sign Up' : 'Sign In'}
            </h1>
            <p className="text-gray-600 text-sm">
              {mode === 'signup' ? 'Welcome back, Please login here.' : 'Create your account here.'}
            </p>
          </div>

          {/* Error Message */}
          {errors.general && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{errors.general}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    className={`w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#016A79] focus:border-transparent text-sm placeholder-gray-400 ${errors.firstName ? 'border-red-500' : ''}`}
                    placeholder="Enter your first name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    className={`w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#016A79] focus:border-transparent text-sm placeholder-gray-400 ${errors.lastName ? 'border-red-500' : ''}`}
                    placeholder="Enter your last name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className={`w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#016A79] focus:border-transparent text-sm placeholder-gray-400 ${errors.email ? 'border-red-500' : ''}`}
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  className={`w-full px-3 py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#016A79] focus:border-transparent text-sm placeholder-gray-400 ${errors.password ? 'border-red-500' : ''}`}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {mode === 'signup' && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  className={`w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#016A79] focus:border-transparent text-sm placeholder-gray-400 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                )}
              </div>
            )}

            {mode === 'signup' && (
              <div className="space-y-3">
                <div className="flex items-start">
                  <input
                    id="agreeToTerms"
                    name="agreeToTerms"
                    type="checkbox"
                    className="h-4 w-4 text-[#016A79] border-gray-300 rounded focus:ring-[#016A79] mt-0.5"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="agreeToTerms" className="ml-2 text-sm text-gray-600">
                    <Link href="/terms" className="text-[#016A79] hover:text-[#014d5a]">
                      Terms Of Service
                    </Link>
                  </label>
                </div>
                {errors.agreeToTerms && (
                  <p className="text-red-500 text-xs">{errors.agreeToTerms}</p>
                )}
                
                <div className="flex items-start">
                  <input
                    id="agreeToPrivacy"
                    name="agreeToPrivacy"
                    type="checkbox"
                    className="h-4 w-4 text-[#016A79] border-gray-300 rounded focus:ring-[#016A79] mt-0.5"
                    checked={formData.agreeToPrivacy}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="agreeToPrivacy" className="ml-2 text-sm text-gray-600">
                    <Link href="/privacy" className="text-[#016A79] hover:text-[#014d5a]">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
                {errors.agreeToPrivacy && (
                  <p className="text-red-500 text-xs">{errors.agreeToPrivacy}</p>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-[#016A79] hover:bg-[#014d5a] text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 text-sm ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Please wait...</span>
                </div>
              ) : (
                mode === 'signup' ? 'Sign Up' : 'Sign In'
              )}
            </button>
          </form>

          {/* Switch Mode */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              {mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                type="button"
                onClick={() => {
                  setMode(mode === 'signup' ? 'signin' : 'signup');
                  setErrors({});
                }}
                className="text-[#016A79] hover:text-[#014d5a] font-medium underline"
              >
                {mode === 'signup' ? 'Log In' : 'Sign Up'}
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[#016A79] to-[#014d5a] relative overflow-hidden items-center justify-center p-12">
        <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-3xl p-12 max-w-2xl border-4 border-[#FCF4E3]">
          <div className="text-center mb-8">
            <h2 className="text-white text-2xl font-bold mb-3" style={{ fontFamily: 'Acme, sans-serif' }}>
              Streamline and optimize GBV
            </h2>
            <h2 className="text-white text-2xl font-bold mb-3" style={{ fontFamily: 'Acme, sans-serif' }}>
              Case Management System
            </h2>
            <h2 className="text-white text-2xl font-bold" style={{ fontFamily: 'Acme, sans-serif' }}>
              In Kenya
            </h2>
          </div>
          <div className="relative w-full h-[28rem] rounded-2xl overflow-hidden">
            <Image
              src="/images/authrightimage.png"
              alt="GBV Case Management System"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
        
        {/* Right Panel Star Clusters */}
        <div className="absolute top-16 right-16" aria-hidden="true">
          <svg width={56} height={56} viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg">
            <rect x={21} y={6} rx={3} ry={3} width={7} height={18} fill="#EDC865" opacity={0.8} transform="rotate(0 28 28)" />
            <rect x={21} y={6} rx={3} ry={3} width={7} height={18} fill="#EDC865" opacity={0.8} transform="rotate(45 28 28)" />
            <rect x={21} y={6} rx={3} ry={3} width={7} height={18} fill="#EDC865" opacity={0.8} transform="rotate(90 28 28)" />
            <rect x={21} y={6} rx={3} ry={3} width={7} height={18} fill="#EDC865" opacity={0.8} transform="rotate(135 28 28)" />
            <rect x={21} y={6} rx={3} ry={3} width={7} height={18} fill="#EDC865" opacity={0.8} transform="rotate(180 28 28)" />
            <rect x={21} y={6} rx={3} ry={3} width={7} height={18} fill="#EDC865" opacity={0.8} transform="rotate(225 28 28)" />
            <rect x={21} y={6} rx={3} ry={3} width={7} height={18} fill="#EDC865" opacity={0.8} transform="rotate(270 28 28)" />
            <rect x={21} y={6} rx={3} ry={3} width={7} height={18} fill="#EDC865" opacity={0.8} transform="rotate(315 28 28)" />
          </svg>
        </div>
        
        <div className="absolute bottom-20 right-12" aria-hidden="true">
          <svg width={44} height={44} viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg">
            <rect x={17} y={5} rx={2.5} ry={2.5} width={5} height={14} fill="#EDC865" opacity={0.75} transform="rotate(0 22 22)" />
            <rect x={17} y={5} rx={2.5} ry={2.5} width={5} height={14} fill="#EDC865" opacity={0.75} transform="rotate(60 22 22)" />
            <rect x={17} y={5} rx={2.5} ry={2.5} width={5} height={14} fill="#EDC865" opacity={0.75} transform="rotate(120 22 22)" />
            <rect x={17} y={5} rx={2.5} ry={2.5} width={5} height={14} fill="#EDC865" opacity={0.75} transform="rotate(180 22 22)" />
            <rect x={17} y={5} rx={2.5} ry={2.5} width={5} height={14} fill="#EDC865" opacity={0.75} transform="rotate(240 22 22)" />
            <rect x={17} y={5} rx={2.5} ry={2.5} width={5} height={14} fill="#EDC865" opacity={0.75} transform="rotate(300 22 22)" />
          </svg>
        </div>
        
        <div className="absolute top-1/3 right-4" aria-hidden="true">
          <svg width={48} height={48} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <rect x={18} y={5} rx={2.5} ry={2.5} width={6} height={16} fill="#EDC865" opacity={0.85} transform="rotate(0 24 24)" />
            <rect x={18} y={5} rx={2.5} ry={2.5} width={6} height={16} fill="#EDC865" opacity={0.85} transform="rotate(72 24 24)" />
            <rect x={18} y={5} rx={2.5} ry={2.5} width={6} height={16} fill="#EDC865" opacity={0.85} transform="rotate(144 24 24)" />
            <rect x={18} y={5} rx={2.5} ry={2.5} width={6} height={16} fill="#EDC865" opacity={0.85} transform="rotate(216 24 24)" />
            <rect x={18} y={5} rx={2.5} ry={2.5} width={6} height={16} fill="#EDC865" opacity={0.85} transform="rotate(288 24 24)" />
          </svg>
        </div>
      </div>
    </div>
  );
}