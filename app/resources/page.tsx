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
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';

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

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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

  const fetchResources = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams();
      if (selectedCategory !== 'all') {
        params.append('category', selectedCategory);
      }
      if (selectedType !== 'all') {
        params.append('type', selectedType);
      }
      params.append('limit', '50');
      
      const response = await fetch(`/api/resources?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch resources: ${response.status}`);
      }
      
      const data = await response.json();
      setResources(data.resources || []);
    } catch (error) {
      console.error('Failed to fetch resources:', error);
      setError('Failed to load resources. Please try again.');
      // Set fallback data
      setResources(getFallbackResources());
    } finally {
      setLoading(false);
    }
  };

  const getFallbackResources = (): Resource[] => [
    {
      id: '1',
      title: 'Understanding Anxiety: A Complete Guide',
      description: 'Learn about anxiety symptoms, triggers, and evidence-based coping strategies.',
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
      type: 'audio',
      category: 'depression',
      duration_minutes: 20,
      rating: 4.9,
      difficulty: 'beginner',
      featured: true
    },
    {
      id: 'kenya-befrienders',
      title: 'Befrienders Kenya',
      description: 'Provides emotional support to those in distress through confidential listening.',
      type: 'contact',
      category: 'Crisis Support',
      duration_minutes: 5,
      rating: 4.8,
      difficulty: 'Easy',
      featured: true
    }
  ];

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

  const handleResourceClick = (resourceId: string) => {
    router.push(`/resources/${resourceId}`);
  };

  const handleStartResource = (resource: Resource) => {
    if (resource.type === 'contact') {
      // For crisis contacts, redirect to crisis page
      router.push('/crisis');
    } else {
      // For other resources, go to detail page
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </Link>
              <div className="flex items-center space-x-2">
                <BookOpen className="h-6 w-6 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-900">Resource Library</h1>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              {filteredResources.length} resources available
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
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="heal-input pl-10"
              />
            </div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="heal-input w-full sm:w-auto"
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
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
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
                return (
                  <div key={resource.id} className="heal-card p-6 hover:shadow-lg transition-all duration-200 transform hover:scale-105 cursor-pointer">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <IconComponent className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-gray-600">{resource.rating}</span>
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-gray-900 mb-2">{resource.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{resource.description}</p>
                    
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
                    
                    <button 
                      onClick={() => handleStartResource(resource)}
                      className="w-full heal-button flex items-center justify-center space-x-2"
                    >
                      <Play className="h-4 w-4" />
                      <span>{resource.type === 'contact' ? 'View Contact' : 'Start Resource'}</span>
                    </button>
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
                return (
                  <div key={resource.id} className="heal-card p-6 hover:shadow-lg transition-all duration-200 cursor-pointer">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <IconComponent className="h-8 w-8 text-blue-600" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-gray-900 text-lg">{resource.title}</h3>
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
                        
                        <p className="text-gray-600 mb-4">{resource.description}</p>
                        
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
                              className="heal-button flex items-center space-x-2"
                            >
                              <Play className="h-4 w-4" />
                              <span>{resource.type === 'contact' ? 'View Contact' : 'Start'}</span>
                            </button>
                            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors flex items-center space-x-2">
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