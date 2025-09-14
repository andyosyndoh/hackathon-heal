'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  BookOpen,
  Heart,
  Brain,
  Users,
  Star,
  Play,
  Download,
  Clock,
  Search,
  Filter,
  ArrowLeft,
  ChevronRight,
  Headphones,
  Video,
  FileText,
  TrendingUp,
  Phone,
  Loader2,
  AlertCircle,
  Volume2,
  VolumeX
} from 'lucide-react';
import Link from 'next/link';
import { elevenLabsService } from '@/lib/ai-services';

// Add Acme font
if (typeof window !== 'undefined') {
  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css2?family=Acme&display=swap';
  link.rel = 'stylesheet';
  document.head.appendChild(link);
}

interface Resource {
  id: string;
  title: string;
  description: string;
  content?: string;
  type: 'article' | 'video' | 'audio' | 'exercise' | 'assessment' | 'contact';
  category: string;
  duration_minutes: number;
  rating: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'Easy';
  featured: boolean;
}

// Static resource data - this replaces the API call for static export
const getStaticResourcesData = (): Resource[] => [
  {
    id: '1',
    title: 'Understanding Anxiety: A Complete Guide',
    description: 'Learn about anxiety symptoms, triggers, and evidence-based coping strategies.',
    content: 'Anxiety is a natural response to stress, but when it becomes overwhelming, it can significantly impact your daily life. This comprehensive guide covers the different types of anxiety disorders, common symptoms like racing thoughts and physical tension, and practical coping strategies including breathing exercises, grounding techniques, and cognitive behavioral therapy approaches.',
    type: 'article',
    category: 'anxiety',
    duration_minutes: 15,
    rating: 4.8,
    difficulty: 'beginner',
    featured: true
  },
  {
    id: '2',
    title: 'Guided Meditation for Depression',
    description: 'A 20-minute guided meditation specifically designed for managing depressive symptoms.',
    content: 'This meditation focuses on self-compassion and gentle awareness, helping you navigate difficult emotions with kindness. The session includes breathing exercises, body awareness, and loving-kindness practices specifically tailored for those experiencing depression.',
    type: 'audio',
    category: 'depression',
    duration_minutes: 20,
    rating: 4.9,
    difficulty: 'beginner',
    featured: true
  },
  {
    id: '3',
    title: 'Cognitive Behavioral Therapy Techniques',
    description: 'Interactive exercises to help identify and change negative thought patterns.',
    content: 'CBT is one of the most effective treatments for depression and anxiety. This resource provides practical exercises for identifying cognitive distortions, challenging negative thoughts, and developing more balanced thinking patterns.',
    type: 'exercise',
    category: 'depression',
    duration_minutes: 30,
    rating: 4.7,
    difficulty: 'intermediate',
    featured: false
  },
  {
    id: '4',
    title: 'Building Healthy Relationships',
    description: 'Video series on communication skills and boundary setting.',
    content: 'Healthy relationships are fundamental to mental wellbeing. This video series covers effective communication techniques, how to set and maintain healthy boundaries, conflict resolution skills, and building trust.',
    type: 'video',
    category: 'relationships',
    duration_minutes: 25,
    rating: 4.6,
    difficulty: 'beginner',
    featured: true
  },
  {
    id: '5',
    title: 'Stress Assessment Quiz',
    description: 'Evaluate your stress levels and get personalized recommendations.',
    content: 'This comprehensive assessment helps identify your stress patterns, triggers, and current coping mechanisms. Based on your responses, you will receive personalized recommendations for stress management techniques.',
    type: 'assessment',
    category: 'stress',
    duration_minutes: 10,
    rating: 4.5,
    difficulty: 'beginner',
    featured: false
  },
  {
    id: '6',
    title: 'Advanced Mindfulness Practices',
    description: 'Deep dive into mindfulness techniques for experienced practitioners.',
    content: 'These advanced practices build on basic mindfulness skills and include body scanning, walking meditation, mindful eating, and integration of mindfulness into daily activities.',
    type: 'exercise',
    category: 'self-care',
    duration_minutes: 45,
    rating: 4.8,
    difficulty: 'advanced',
    featured: false
  },
  {
    id: 'kenya-befrienders',
    title: 'Befrienders Kenya',
    description: 'Provides emotional support to those in distress through confidential listening.',
    content: 'Befrienders Kenya offers 24/7 emotional support through trained volunteers who provide a safe space to talk about your feelings. Call +254 722 178 177 for free confidential support.',
    type: 'contact',
    category: 'Crisis Support',
    duration_minutes: 5,
    rating: 4.8,
    difficulty: 'Easy',
    featured: true
  },
  {
    id: 'kenya-eplus',
    title: 'Emergency Plus Medical Services (E-Plus)',
    description: 'Offers ambulance and pre-hospital emergency medical services across Kenya.',
    content: 'E-Plus provides 24/7 emergency medical services including crisis intervention. Emergency Line: +254 700 395 395 for immediate medical and mental health emergency response.',
    type: 'contact',
    category: 'Crisis Support',
    duration_minutes: 5,
    rating: 4.7,
    difficulty: 'Easy',
    featured: true
  },
  {
    id: 'kenya-redcross',
    title: 'Kenya Red Cross Society',
    description: 'Provides humanitarian services, including disaster response and emergency support.',
    content: 'Kenya Red Cross offers psychosocial support services and crisis counseling. Hotline: +254 703 037 000 for nationwide mental health support and emergency response.',
    type: 'contact',
    category: 'Crisis Support',
    duration_minutes: 5,
    rating: 4.6,
    difficulty: 'Easy',
    featured: true
  },
  {
    id: 'kenya-mental-health',
    title: 'Kenya Association for Mental Health',
    description: 'Dedicated to promoting mental health awareness and providing support services.',
    content: 'KAMH provides mental health advocacy and counseling services. Phone: +254 20 2717077 for individual counseling and crisis intervention services.',
    type: 'contact',
    category: 'Crisis Support',
    duration_minutes: 5,
    rating: 4.5,
    difficulty: 'Easy',
    featured: true
  },
  {
    id: 'kenya-police',
    title: 'Kenya Police Emergency Services',
    description: 'National police emergency services for immediate crisis intervention.',
    content: 'For immediate emergency situations involving threats to personal safety. Emergency: 999 for immediate intervention and mental health crisis response.',
    type: 'contact',
    category: 'Crisis Support',
    duration_minutes: 5,
    rating: 4.4,
    difficulty: 'Easy',
    featured: true
  },
  {
    id: 'kenya-childline',
    title: 'Childline Kenya',
    description: '24/7 helpline for children and young people in crisis.',
    content: 'Childline Kenya provides free confidential support for children and young people up to 18 years. Toll-Free: 116 for crisis counseling and mental health support.',
    type: 'contact',
    category: 'Crisis Support',
    duration_minutes: 5,
    rating: 4.7,
    difficulty: 'Easy',
    featured: true
  },
  {
    id: 'kenya-gender-violence',
    title: 'Gender Violence Recovery Centre',
    description: 'Specialized support for survivors of gender-based violence.',
    content: 'GVRC provides comprehensive support for survivors including counseling and legal aid. Hotline: +254 709 660 000 for specialized trauma-informed mental health support.',
    type: 'contact',
    category: 'Crisis Support',
    duration_minutes: 5,
    rating: 4.6,
    difficulty: 'Easy',
    featured: true
  },
  {
    id: 'kenya-samaritans',
    title: 'Samaritans Kenya',
    description: 'Emotional support and suicide prevention services.',
    content: 'Samaritans Kenya provides confidential emotional support to anyone experiencing distress. Nairobi: +254 722 178 177 for 24/7 non-judgmental listening and support.',
    type: 'contact',
    category: 'Crisis Support',
    duration_minutes: 5,
    rating: 4.8,
    difficulty: 'Easy',
    featured: true
  }
];

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const [generatingAudio, setGeneratingAudio] = useState<string | null>(null);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const router = useRouter();

  const categories = [
    { id: 'all', name: 'All Resources', icon: BookOpen },
    { id: 'anxiety', name: 'Anxiety', icon: Brain },
    { id: 'depression', name: 'Depression', icon: Heart },
    { id: 'stress', name: 'Stress Management', icon: TrendingUp },
    { id: 'relationships', name: 'Relationships', icon: Users },
    { id: 'self-care', name: 'Self-Care', icon: Star },
    { id: 'Crisis Support', name: 'Crisis Support', icon: Phone }
  ];

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'article', label: 'Articles' },
    { value: 'video', label: 'Videos' },
    { value: 'audio', label: 'Audio' },
    { value: 'exercise', label: 'Exercises' },
    { value: 'assessment', label: 'Assessments' },
    { value: 'contact', label: 'Contacts' }
  ];

  useEffect(() => {
    fetchResources();
  }, [selectedCategory, selectedType]);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.src = '';
      }
    };
  }, [currentAudio]);

  const fetchResources = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate loading delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      
      let allResources = getStaticResourcesData();
      
      // Apply filters
      if (selectedCategory !== 'all') {
        allResources = allResources.filter(r => 
          r.category.toLowerCase() === selectedCategory.toLowerCase()
        );
      }
      
      if (selectedType !== 'all') {
        allResources = allResources.filter(r => 
          r.type.toLowerCase() === selectedType.toLowerCase()
        );
      }
      
      setResources(allResources);
    } catch (error) {
      console.error('Failed to fetch resources:', error);
      setError('Failed to load resources. Please try again.');
      setResources(getStaticResourcesData());
    } finally {
      setLoading(false);
    }
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

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

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'article': return 'bg-blue-100 text-blue-700';
      case 'video': return 'bg-purple-100 text-purple-700';
      case 'audio': return 'bg-green-100 text-green-700';
      case 'exercise': return 'bg-orange-100 text-orange-700';
      case 'assessment': return 'bg-pink-100 text-pink-700';
      case 'contact': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const prepareTextForSpeech = (content: string): string => {
    return content
      .replace(/\n\n/g, '. ')
      .replace(/\n/g, ' ')
      .replace(/•/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  };

  const playResourceAudio = async (resource: Resource) => {
    if (!resource.content) return;

    try {
      setGeneratingAudio(resource.id);
      
      // Stop current audio if playing
      if (currentAudio) {
        currentAudio.pause();
        setCurrentAudio(null);
        setPlayingAudio(null);
      }

      const textToSpeak = prepareTextForSpeech(resource.content);
      const maxLength = 1000; // Shorter for preview
      const truncatedText = textToSpeak.length > maxLength 
        ? textToSpeak.substring(0, maxLength) + '...'
        : textToSpeak;

      console.log('Generating speech for:', resource.title);
      
      const audioBuffer = await elevenLabsService.textToSpeech(truncatedText);
      const audioBlob = new Blob([audioBuffer], { type: 'audio/mpeg' });
      const audioUrl = URL.createObjectURL(audioBlob);
      
      const audio = new Audio(audioUrl);
      audio.volume = 0.7;
      
      audio.onplay = () => {
        setPlayingAudio(resource.id);
        setGeneratingAudio(null);
      };
      
      audio.onpause = () => {
        setPlayingAudio(null);
      };
      
      audio.onended = () => {
        setPlayingAudio(null);
        setCurrentAudio(null);
        URL.revokeObjectURL(audioUrl);
      };
      
      audio.onerror = () => {
        setPlayingAudio(null);
        setGeneratingAudio(null);
        setCurrentAudio(null);
        URL.revokeObjectURL(audioUrl);
      };

      setCurrentAudio(audio);
      await audio.play();
      
    } catch (error) {
      console.error('Error playing audio:', error);
      setGeneratingAudio(null);
      setPlayingAudio(null);
    }
  };

  const stopAudio = () => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      setPlayingAudio(null);
    }
  };

  const handleResourceClick = (resourceId: string) => {
    router.push(`/resources/${resourceId}`);
  };

  const handleStartResource = (resource: Resource) => {
    if (resource.type === 'contact') {
      router.push('/crisis');
    } else {
      router.push(`/resources/${resource.id}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </Link>
              <div className="flex items-center space-x-2">
                <BookOpen className="h-6 w-6 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-900">Resource Library</h1>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-center py-20">
            <div className="flex items-center space-x-3">
              <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
              <span className="text-gray-600">Loading resources...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FEF0D3', fontFamily: 'Acme, sans-serif' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#012F35' }} className="shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src="/images/heallogo.jpeg" alt="HEAL Logo" className="h-10 w-auto" style={{ mixBlendMode: 'multiply' }} />
              <h1 className="text-2xl font-bold text-white">HEAL</h1>
            </div>
            
            {/* Navigation Menu */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-white hover:text-opacity-80 font-medium transition-colors" style={{ fontFamily: 'Acme, sans-serif' }}>HOME</Link>
              <Link href="/about" className="text-white hover:text-opacity-80 font-medium transition-colors" style={{ fontFamily: 'Acme, sans-serif' }}>ABOUT HEAL</Link>
              <Link href="/services" className="text-white hover:text-opacity-80 font-medium transition-colors" style={{ fontFamily: 'Acme, sans-serif' }}>SERVICES</Link>
              <Link href="/resources" className="font-bold transition-colors" style={{ color: '#6EA7B4', fontFamily: 'Acme, sans-serif' }}>RESOURCES</Link>
              <Link href="/report" className="text-white hover:text-opacity-80 font-medium transition-colors" style={{ fontFamily: 'Acme, sans-serif' }}>REPORT</Link>
              <Link href="/contact" className="text-white hover:text-opacity-80 font-medium transition-colors" style={{ fontFamily: 'Acme, sans-serif' }}>CONTACT US</Link>
            </nav>
            
            <div className="text-sm font-medium" style={{ color: '#6EA7B4' }}>
              {filteredResources.length} resources
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <p className="text-yellow-800">{error}</p>
              <button 
                onClick={fetchResources}
                className="ml-auto text-yellow-600 hover:text-yellow-700 font-medium text-sm"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5" style={{ color: '#016A79' }} />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 text-lg font-medium transition-colors focus:outline-none focus:ring-2"
                style={{ 
                  backgroundColor: 'white', 
                  borderColor: '#6EA7B4',
                  color: '#012F35',
                  fontFamily: 'Acme, sans-serif'
                }}
              />
            </div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full sm:w-auto px-4 py-3 rounded-xl border-2 text-lg font-medium transition-colors focus:outline-none focus:ring-2"
              style={{ 
                backgroundColor: 'white', 
                borderColor: '#6EA7B4',
                color: '#012F35',
                fontFamily: 'Acme, sans-serif'
              }}
            >
              {typeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center space-x-2 px-6 py-3 rounded-full text-lg font-bold transition-all transform hover:scale-105"
                style={{
                  backgroundColor: selectedCategory === category.id ? '#016A79' : 'white',
                  color: selectedCategory === category.id ? 'white' : '#012F35',
                  border: `2px solid ${selectedCategory === category.id ? '#016A79' : '#6EA7B4'}`,
                  fontFamily: 'Acme, sans-serif'
                }}
              >
                <category.icon className="h-4 w-4" />
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Resources */}
        {selectedCategory === 'all' && searchTerm === '' && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.filter(r => r.featured).slice(0, 6).map((resource) => {
                const IconComponent = getResourceIcon(resource.type);
                const isGenerating = generatingAudio === resource.id;
                const isPlaying = playingAudio === resource.id;
                
                return (
                  <div key={resource.id} className="p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer border-2" style={{ backgroundColor: 'white', borderColor: '#6EA7B4' }}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#6EA7B4' }}>
                        <IconComponent className="h-7 w-7" style={{ color: '#012F35' }} />
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-gray-600">{resource.rating}</span>
                      </div>
                    </div>
                    
                    <h3 className="font-bold text-xl mb-2" style={{ color: '#012F35', fontFamily: 'Acme, sans-serif' }}>{resource.title}</h3>
                    <p className="text-base mb-4 line-clamp-2" style={{ color: '#016A79', fontFamily: 'Acme, sans-serif' }}>{resource.description}</p>
                    
                    <div className="flex items-center justify-between text-sm mb-4">
                      <div className="flex items-center space-x-2 text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>{resource.duration_minutes} min</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(resource.difficulty)}`}>
                          {resource.difficulty}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(resource.type)}`}>
                          {resource.type}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleStartResource(resource)}
                        className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-bold text-lg transition-all transform hover:scale-105"
                        style={{ backgroundColor: '#016A79', color: 'white', fontFamily: 'Acme, sans-serif' }}
                      >
                        <Play className="h-4 w-4" />
                        <span>{resource.type === 'contact' ? 'View Contact' : 'Start'}</span>
                      </button>
                      
                      {resource.content && process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (isPlaying) {
                              stopAudio();
                            } else {
                              playResourceAudio(resource);
                            }
                          }}
                          disabled={isGenerating}
                          className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg transition-colors disabled:opacity-50"
                          title="Listen to preview"
                        >
                          {isGenerating ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : isPlaying ? (
                            <VolumeX className="h-4 w-4" />
                          ) : (
                            <Volume2 className="h-4 w-4" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* All Resources */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {selectedCategory === 'all' ? 'All Resources' : `${categories.find(c => c.id === selectedCategory)?.name} Resources`}
          </h2>
          
          {filteredResources.length === 0 ? (
            <div className="heal-card p-12 text-center">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No resources found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
              {error && (
                <button 
                  onClick={fetchResources}
                  className="mt-4 heal-button"
                >
                  Reload Resources
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredResources.map((resource) => {
                const IconComponent = getResourceIcon(resource.type);
                const isGenerating = generatingAudio === resource.id;
                const isPlaying = playingAudio === resource.id;
                
                return (
                  <div key={resource.id} className="p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border-2" style={{ backgroundColor: 'white', borderColor: '#6EA7B4' }}>
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#6EA7B4' }}>
                        <IconComponent className="h-8 w-8" style={{ color: '#012F35' }} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-bold text-xl" style={{ color: '#012F35', fontFamily: 'Acme, sans-serif' }}>{resource.title}</h3>
                          <div className="flex items-center space-x-2">
                            {resource.featured && (
                              <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">
                                Featured
                              </span>
                            )}
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(resource.type)}`}>
                              {resource.type}
                            </span>
                          </div>
                        </div>
                        
                        <p className="mb-4 text-lg" style={{ color: '#016A79', fontFamily: 'Acme, sans-serif' }}>{resource.description}</p>
                        
                        <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{resource.duration_minutes} min</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span>{resource.rating}</span>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(resource.difficulty)}`}>
                            {resource.difficulty}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex space-x-3">
                            <button 
                              onClick={() => handleStartResource(resource)}
                              className="flex items-center space-x-2 px-6 py-3 rounded-xl font-bold text-lg transition-all transform hover:scale-105"
                              style={{ backgroundColor: '#016A79', color: 'white', fontFamily: 'Acme, sans-serif' }}
                            >
                              <Play className="h-4 w-4" />
                              <span>{resource.type === 'contact' ? 'View Contact' : 'Start'}</span>
                            </button>
                            
                            {resource.content && process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (isPlaying) {
                                    stopAudio();
                                  } else {
                                    playResourceAudio(resource);
                                  }
                                }}
                                disabled={isGenerating}
                                className="font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-105 flex items-center space-x-2 disabled:opacity-50"
                                style={{ backgroundColor: '#6EA7B4', color: '#012F35', fontFamily: 'Acme, sans-serif' }}
                              >
                                {isGenerating ? (
                                  <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    <span>Generating...</span>
                                  </>
                                ) : isPlaying ? (
                                  <>
                                    <VolumeX className="h-4 w-4" />
                                    <span>Stop</span>
                                  </>
                                ) : (
                                  <>
                                    <Volume2 className="h-4 w-4" />
                                    <span>Listen</span>
                                  </>
                                )}
                              </button>
                            )}
                            
                            <button className="font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-105 flex items-center space-x-2 border-2" style={{ backgroundColor: 'white', color: '#016A79', borderColor: '#6EA7B4', fontFamily: 'Acme, sans-serif' }}>
                              <Download className="h-4 w-4" />
                              <span>Save</span>
                            </button>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ElevenLabs Status */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 text-xs text-gray-500 bg-gray-100 px-3 py-2 rounded-full">
            <div className={`w-2 h-2 rounded-full ${process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span>
              {process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY 
                ? 'AI Voice narration powered by ElevenLabs' 
                : 'ElevenLabs API key required for voice narration'
              }
            </span>
          </div>
        </div>

        {/* Personalized Recommendations */}
        {!error && filteredResources.length > 0 && (
          <div className="mt-12 heal-card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Personalized Recommendations</h3>
            <p className="text-gray-600 mb-4">
              Based on your recent activities and preferences, we recommend these resources:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Brain className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Anxiety Management Techniques</p>
                  <p className="text-sm text-gray-600">Based on your mood patterns</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Heart className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Self-Compassion Exercises</p>
                  <p className="text-sm text-gray-600">Popular among similar users</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}