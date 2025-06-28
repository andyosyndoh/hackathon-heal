'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  BookOpen,
  Headphones,
  Video,
  FileText,
  Brain,
  TrendingUp,
  Star,
  Clock,
  Download,
  Play,
  Phone,
  ExternalLink,
  Copy,
  CheckCircle,
  Loader2,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';

interface Resource {
  id: string;
  title: string;
  description: string;
  content: string;
  type: 'article' | 'video' | 'audio' | 'exercise' | 'assessment' | 'contact';
  category: string;
  duration_minutes: number;
  rating: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'Easy';
  featured: boolean;
}

// Static params for build-time generation
export async function generateStaticParams() {
  // Define all possible resource IDs that should be pre-generated
  const resourceIds = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    'kenya-befrienders',
    'kenya-eplus',
    'kenya-redcross',
    'kenya-mental-health',
    'kenya-police',
    'kenya-childline',
    'kenya-gender-violence',
    'kenya-samaritans'
  ];

  return resourceIds.map((id) => ({
    id: id,
  }));
}

export default function ResourceDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [resource, setResource] = useState<Resource | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchResource();
    }
  }, [id]);

  const fetchResource = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/resources/${id}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          setError('Resource not found');
        } else {
          throw new Error(`Failed to fetch resource: ${response.status}`);
        }
        return;
      }
      
      const data = await response.json();
      setResource(data);
    } catch (err: any) {
      console.error('Failed to fetch resource:', err);
      setError('Failed to load resource. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'article': return FileText;
      case 'video': return Video;
      case 'audio': return Headphones;
      case 'exercise': return Brain;
      case 'assessment': return TrendingUp;
      case 'contact': return Phone;
      default: return BookOpen;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
      case 'easy': 
        return 'text-green-600 bg-green-100';
      case 'intermediate': 
        return 'text-yellow-600 bg-yellow-100';
      case 'advanced': 
        return 'text-red-600 bg-red-100';
      default: 
        return 'text-gray-600 bg-gray-100';
    }
  };

  const extractPhoneNumber = (content: string): string | null => {
    const phoneMatch = content.match(/(?:Call:|Phone:|Hotline:|Emergency:)\s*([+\d\s-]+)/i) || 
                     content.match(/([+]\d{3}\s?\d{3}\s?\d{3}\s?\d{3})/);
    return phoneMatch ? phoneMatch[1].trim() : null;
  };

  const extractEmail = (content: string): string | null => {
    const emailMatch = content.match(/Email:\s*([^\s\n]+@[^\s\n]+)/i);
    return emailMatch ? emailMatch[1] : null;
  };

  const extractWebsite = (content: string): string | null => {
    const websiteMatch = content.match(/Website:\s*([^\s\n]+)/i);
    return websiteMatch ? websiteMatch[1] : null;
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setTimeout(() => setCopiedText(null), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const makeCall = (phone: string) => {
    const cleanPhone = phone.replace(/\s/g, '');
    window.location.href = `tel:${cleanPhone}`;
  };

  const sendEmail = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  const openWebsite = (website: string) => {
    const url = website.startsWith('http') ? website : `https://${website}`;
    window.open(url, '_blank');
  };

  const handleInteraction = () => {
    if (!resource) return;
    
    if (resource.type === 'contact') {
      const phoneNumber = extractPhoneNumber(resource.content);
      if (phoneNumber) {
        makeCall(phoneNumber);
      } else {
        // If no phone number found, show contact info
        alert(`Contact: ${resource.title}\nDetails: ${resource.content}`);
      }
    } else if (resource.type === 'video') {
      alert(`Playing video: ${resource.title}\nContent: ${resource.content}`);
    } else if (resource.type === 'audio') {
      alert(`Playing audio: ${resource.title}\nContent: ${resource.content}`);
    } else {
      alert(`Starting ${resource.type}: ${resource.title}\nContent: ${resource.content}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center space-x-4">
              <Link href="/resources" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </Link>
              <div className="flex items-center space-x-2">
                <BookOpen className="h-6 w-6 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-900">Loading...</h1>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center justify-center py-20">
            <div className="flex items-center space-x-3">
              <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
              <span className="text-gray-600">Loading resource...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !resource) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center space-x-4">
              <Link href="/resources" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </Link>
              <div className="flex items-center space-x-2">
                <BookOpen className="h-6 w-6 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-900">Resource Not Found</h1>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="heal-card p-12 text-center">
            <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{error || 'Resource not found'}</h3>
            <p className="text-gray-600 mb-6">The resource you're looking for doesn't exist or has been removed.</p>
            <div className="flex justify-center space-x-4">
              <Link href="/resources" className="heal-button">
                Back to Resources
              </Link>
              <button onClick={fetchResource} className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors">
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const IconComponent = getResourceIcon(resource.type);
  const phoneNumber = extractPhoneNumber(resource.content);
  const email = extractEmail(resource.content);
  const website = extractWebsite(resource.content);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/resources" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </Link>
            <div className="flex items-center space-x-2">
              <IconComponent className="h-6 w-6 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">{resource.title}</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="heal-card p-6">
          <div className="flex items-start space-x-4 mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <IconComponent className="h-8 w-8 text-blue-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{resource.title}</h2>
              <p className="text-gray-600 mb-4">{resource.description}</p>
              
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                {resource.duration_minutes > 0 && (
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{resource.duration_minutes} min</span>
                  </div>
                )}
                {resource.rating > 0 && (
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span>{resource.rating}</span>
                  </div>
                )}
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(resource.difficulty)}`}>
                  {resource.difficulty}
                </span>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                  {resource.type}
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none mb-6">
            {resource.type === 'contact' ? (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Contact Information</h3>
                <div className="whitespace-pre-line text-blue-800 mb-6">
                  {resource.content}
                </div>
                
                {/* Contact Actions */}
                <div className="flex flex-wrap gap-3">
                  {phoneNumber && (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => makeCall(phoneNumber)}
                        className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center space-x-2"
                      >
                        <Phone className="h-4 w-4" />
                        <span>Call {phoneNumber}</span>
                      </button>
                      <button
                        onClick={() => copyToClipboard(phoneNumber)}
                        className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                        title="Copy phone number"
                      >
                        {copiedText === phoneNumber ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  )}

                  {email && (
                    <button
                      onClick={() => sendEmail(email)}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center space-x-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>Email</span>
                    </button>
                  )}

                  {website && (
                    <button
                      onClick={() => openWebsite(website)}
                      className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center space-x-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>Website</span>
                    </button>
                  )}
                </div>
              </div>
            ) : resource.type === 'video' ? (
              <div className="w-full bg-gray-200 rounded-lg flex items-center justify-center" style={{ height: '300px' }}>
                <div className="text-center">
                  <Video className="h-12 w-12 text-gray-500 mx-auto mb-2" />
                  <p className="text-gray-500">Video Player Placeholder</p>
                  <p className="text-sm text-gray-400 mt-2">{resource.content}</p>
                </div>
              </div>
            ) : resource.type === 'audio' ? (
              <div className="w-full bg-gray-200 rounded-lg flex items-center justify-center py-8">
                <div className="text-center">
                  <Headphones className="h-12 w-12 text-gray-500 mx-auto mb-2" />
                  <p className="text-gray-500">Audio Player Placeholder</p>
                  <p className="text-sm text-gray-400 mt-2">{resource.content}</p>
                </div>
              </div>
            ) : (
              <div className="whitespace-pre-line text-gray-700">
                {resource.content}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button 
              onClick={handleInteraction} 
              className="heal-button flex items-center space-x-2"
            >
              <Play className="h-4 w-4" />
              <span>
                {resource.type === 'contact' ? 'Call / View Contact' : 
                 resource.type === 'video' ? 'Play Video' :
                 resource.type === 'audio' ? 'Play Audio' :
                 'Start Resource'}
              </span>
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Save</span>
            </button>
          </div>
        </div>

        {/* Related Resources */}
        <div className="mt-8 heal-card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Resources</h3>
          <p className="text-gray-600 mb-4">
            Explore more resources in the {resource.category} category to continue your mental health journey.
          </p>
          <Link 
            href={`/resources?category=${encodeURIComponent(resource.category)}`}
            className="heal-button inline-flex items-center space-x-2"
          >
            <BookOpen className="h-4 w-4" />
            <span>Browse {resource.category} Resources</span>
          </Link>
        </div>
      </div>
    </div>
  );
}