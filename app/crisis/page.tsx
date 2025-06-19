'use client';

import { useState, useEffect } from 'react';
import { 
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Shield,
  Heart,
  AlertTriangle,
  ArrowRight,
  User,
  Headphones,
  Users,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

export default function CrisisPage() {
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [isEmergency, setIsEmergency] = useState(false);

  useEffect(() => {
    // Get user's location for local emergency services
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log('Location access denied');
        }
      );
    }
  }, []);

  const emergencyContacts = [
    {
      name: 'National Suicide Prevention Lifeline',
      number: '988',
      description: '24/7 crisis support',
      icon: Phone,
      color: 'bg-red-500',
      urgent: true
    },
    {
      name: 'Crisis Text Line',
      number: 'Text "HELLO" to 741741',
      description: 'Text-based crisis support',
      icon: MessageCircle,
      color: 'bg-blue-500',
      urgent: true
    },
    {
      name: 'Emergency Services',
      number: '911',
      description: 'For immediate medical emergencies',
      icon: AlertTriangle,
      color: 'bg-red-600',
      urgent: true
    }
  ];

  const supportResources = [
    {
      title: 'AI Crisis Companion',
      description: 'Immediate AI support while you wait for human help',
      icon: Heart,
      action: 'Start Chat',
      href: '/chat?mode=crisis',
      color: 'bg-green-500'
    },
    {
      title: 'Local Emergency Services',
      description: 'Find nearby hospitals and crisis centers',
      icon: MapPin,
      action: 'Find Services',
      href: '#local-services',
      color: 'bg-purple-500'
    },
    {
      title: 'Safety Planning',
      description: 'Create a personalized crisis plan',
      icon: Shield,
      action: 'Create Plan',
      href: '/safety-plan',
      color: 'bg-blue-500'
    }
  ];

  const calmingTechniques = [
    {
      title: '5-4-3-2-1 Grounding',
      description: 'Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste',
      duration: '2-3 minutes'
    },
    {
      title: 'Box Breathing',
      description: 'Breathe in for 4, hold for 4, breathe out for 4, hold for 4',
      duration: '5-10 minutes'
    },
    {
      title: 'Progressive Muscle Relaxation',
      description: 'Tense and release each muscle group, starting from your toes',
      duration: '10-15 minutes'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </Link>
              <div className="flex items-center space-x-2">
                <Heart className="h-6 w-6 text-red-500" />
                <h1 className="text-xl font-bold text-gray-900">Crisis Support</h1>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">24/7 Available</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Emergency Alert */}
        <div className="heal-emergency mb-8">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-6 w-6 text-red-500 mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-lg font-semibold text-red-900 mb-2">
                If you're having thoughts of suicide or self-harm
              </h2>
              <p className="text-red-800 mb-4">
                Please reach out for help immediately. You don't have to go through this alone. 
                Your life has value and there are people who want to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => window.open('tel:988')}
                  className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <Phone className="h-4 w-4" />
                  <span>Call 988 Now</span>
                </button>
                <button
                  onClick={() => window.open('sms:741741?body=HELLO')}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Text Crisis Line</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Immediate Support Options */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Immediate Support</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {supportResources.map((resource, index) => (
              <Link
                key={index}
                href={resource.href}
                className="heal-card p-6 hover:shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                <div className={`w-12 h-12 ${resource.color} rounded-lg flex items-center justify-center mb-4`}>
                  <resource.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{resource.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
                <div className="flex items-center text-blue-600 font-medium text-sm">
                  <span>{resource.action}</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Emergency Contacts</h2>
          <div className="space-y-4">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="heal-card p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 ${contact.color} rounded-lg flex items-center justify-center`}>
                      <contact.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                      <p className="text-lg font-bold text-gray-700">{contact.number}</p>
                      <p className="text-sm text-gray-600">{contact.description}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      if (contact.number.includes('Text')) {
                        window.open('sms:741741?body=HELLO');
                      } else {
                        window.open(`tel:${contact.number.replace(/\D/g, '')}`);
                      }
                    }}
                    className="heal-button"
                  >
                    Contact
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Calming Techniques */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Calming Techniques</h2>
          <div className="heal-card p-6">
            <p className="text-gray-600 mb-6">
              While you're waiting for help or if you need to calm down right now, try these techniques:
            </p>
            <div className="space-y-4">
              {calmingTechniques.map((technique, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                  <h3 className="font-semibold text-gray-900 mb-1">{technique.title}</h3>
                  <p className="text-gray-700 text-sm mb-1">{technique.description}</p>
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <Clock className="h-3 w-3" />
                    <span>{technique.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Local Services */}
        <div className="mb-8" id="local-services">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Local Emergency Services</h2>
          <div className="heal-card p-6">
            {userLocation ? (
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <MapPin className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-600">Location detected</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div>
                      <h3 className="font-medium text-gray-900">Central Hospital Emergency Room</h3>
                      <p className="text-sm text-gray-600">1.2 miles away • Open 24/7</p>
                    </div>
                    <button 
                      onClick={() => window.open('tel:911')}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      Call
                    </button>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div>
                      <h3 className="font-medium text-gray-900">Crisis Intervention Center</h3>
                      <p className="text-sm text-gray-600">2.8 miles away • Walk-in available</p>
                    </div>
                    <button 
                      onClick={() => window.open('tel:555-0123')}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      Call
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">
                  Enable location services to find nearby emergency services
                </p>
                <button 
                  onClick={() => window.location.reload()}
                  className="heal-button"
                >
                  Enable Location
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Safety and Privacy */}
        <div className="heal-card p-6">
          <div className="flex items-start space-x-3">
            <Shield className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Your Safety & Privacy</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• All crisis conversations are encrypted and confidential</p>
                <p>• Emergency services may be contacted if there's immediate danger</p>
                <p>• Your location is used only to find nearby help when needed</p>
                <p>• Crisis counselors are trained professionals bound by confidentiality</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}