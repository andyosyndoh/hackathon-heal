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
  ArrowLeft,
  ExternalLink,
  Copy,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';

interface CrisisContact {
  id: string;
  title: string;
  description: string;
  content: string;
  phone?: string;
  email?: string;
  website?: string;
  available?: string;
  type: string;
}

export default function CrisisPage() {
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [isEmergency, setIsEmergency] = useState(false);
  const [crisisContacts, setCrisisContacts] = useState<CrisisContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

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

    // Load crisis contacts from backend
    loadCrisisContacts();
  }, []);

  const loadCrisisContacts = async () => {
    try {
      const response = await fetch('/api/resources?category=Crisis Support&type=contact');
      if (response.ok) {
        const data = await response.json();
        setCrisisContacts(data.resources || []);
      }
    } catch (error) {
      console.error('Failed to load crisis contacts:', error);
      // Fallback to hardcoded Kenyan contacts
      setCrisisContacts(fallbackKenyanContacts);
    } finally {
      setLoading(false);
    }
  };

  const fallbackKenyanContacts: CrisisContact[] = [
    {
      id: 'kenya-emergency',
      title: 'Kenya Emergency Services',
      description: 'National emergency services for immediate crisis intervention',
      content: 'For immediate emergency situations involving threats to personal safety or when someone is in immediate danger.',
      phone: '999',
      available: '24/7',
      type: 'emergency'
    },
    {
      id: 'kenya-befrienders',
      title: 'Befrienders Kenya',
      description: 'Emotional support and suicide prevention',
      content: 'Free confidential telephone support for people experiencing emotional distress, depression, or suicidal thoughts.',
      phone: '+254 722 178 177',
      email: 'info@befrienderskenya.org',
      website: 'www.befrienderskenya.org',
      available: '24/7',
      type: 'mental_health'
    },
    {
      id: 'kenya-eplus',
      title: 'Emergency Plus Medical Services',
      description: 'Emergency medical and crisis intervention services',
      content: '24/7 emergency medical services including crisis intervention and mental health emergency response.',
      phone: '+254 700 395 395',
      website: 'www.eplus.co.ke',
      available: '24/7',
      type: 'medical'
    },
    {
      id: 'kenya-redcross',
      title: 'Kenya Red Cross Society',
      description: 'Psychosocial support and emergency services',
      content: 'Provides psychosocial support, crisis counseling, and trauma support services nationwide.',
      phone: '+254 703 037 000',
      email: 'info@redcross.or.ke',
      website: 'www.redcross.or.ke',
      available: '24/7',
      type: 'support'
    },
    {
      id: 'kenya-childline',
      title: 'Childline Kenya',
      description: 'Support for children and young people',
      content: 'Free confidential support for children and young people up to 18 years facing any problems.',
      phone: '116',
      website: 'www.childlinekenya.co.ke',
      available: '24/7',
      type: 'youth'
    }
  ];

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

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedPhone(text);
      setTimeout(() => setCopiedPhone(null), 2000);
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

  const getContactIcon = (type: string) => {
    switch (type) {
      case 'emergency': return AlertTriangle;
      case 'medical': return Heart;
      case 'mental_health': return Users;
      case 'support': return Shield;
      case 'youth': return User;
      default: return Phone;
    }
  };

  const getContactColor = (type: string) => {
    switch (type) {
      case 'emergency': return 'bg-red-500';
      case 'medical': return 'bg-blue-500';
      case 'mental_health': return 'bg-green-500';
      case 'support': return 'bg-purple-500';
      case 'youth': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

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
    <Layout onToggle={setSidebarCollapsed} sidebarCollapsed={sidebarCollapsed}>
    <div className="min-h-screen">
      {/* Header */}
      <div className=" shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft className="h-5 w-5 text-gray-900" />
              </Link>
              <div className="flex items-center space-x-2">
                <Heart className="h-6 w-6 text-red-500" />
                <h1 className="text-xl font-bold text-gray-900">Crisis Support</h1>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-900">24/7 Available</span>
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
                  onClick={() => makeCall('999')}
                  className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <Phone className="h-4 w-4" />
                  <span>Call 999 Now</span>
                </button>
                <button
                  onClick={() => makeCall('+254 722 178 177')}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Call Befrienders Kenya</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Crisis Contacts */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Kenya Crisis Support Contacts</h2>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-900 mt-2">Loading crisis contacts...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {(crisisContacts.length > 0 ? crisisContacts : fallbackKenyanContacts).map((contact) => {
                const phone = contact.phone || extractPhoneNumber(contact.content);
                const email = contact.email || extractEmail(contact.content);
                const website = contact.website || extractWebsite(contact.content);
                const IconComponent = getContactIcon(contact.type);
                const colorClass = getContactColor(contact.type);

                return (
                  <div key={contact.id} className="heal-card p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 ${colorClass} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 text-lg">{contact.title}</h3>
                          <p className="text-gray-900 text-sm mb-2">{contact.description}</p>
                          <p className="text-gray-900 text-sm leading-relaxed">{contact.content}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {phone && (
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => makeCall(phone)}
                            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center space-x-2"
                          >
                            <Phone className="h-4 w-4" />
                            <span>Call {phone}</span>
                          </button>
                          <button
                            onClick={() => copyToClipboard(phone, 'phone')}
                            className="p-2 text-gray-500 hover:text-gray-900 transition-colors"
                            title="Copy phone number"
                          >
                            {copiedPhone === phone ? (
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
                          <MessageCircle className="h-4 w-4" />
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

                    {contact.available && (
                      <div className="mt-3 flex items-center space-x-2 text-sm text-green-600">
                        <Clock className="h-4 w-4" />
                        <span>Available: {contact.available}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Quick Calming Techniques */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Calming Techniques</h2>
          <div className="heal-card p-6">
            <p className="text-gray-900 mb-6">
              While you're waiting for help or if you need to calm down right now, try these techniques:
            </p>
            <div className="space-y-4">
              {calmingTechniques.map((technique, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                  <h3 className="font-semibold text-gray-900 mb-1">{technique.title}</h3>
                  <p className="text-gray-900 text-sm mb-1">{technique.description}</p>
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
                  <span className="text-sm text-gray-900">Location detected - Kenya</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div>
                      <h3 className="font-medium text-gray-900">Kenyatta National Hospital</h3>
                      <p className="text-sm text-gray-900">Emergency Department • Open 24/7</p>
                    </div>
                    <button 
                      onClick={() => makeCall('+254 20 2726300')}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      Call
                    </button>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div>
                      <h3 className="font-medium text-gray-900">Nairobi Hospital</h3>
                      <p className="text-sm text-gray-900">Emergency Services • 24/7 Available</p>
                    </div>
                    <button 
                      onClick={() => makeCall('+254 20 2845000')}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      Call
                    </button>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <h3 className="font-medium text-gray-900">Mathare Mental Hospital</h3>
                      <p className="text-sm text-gray-900">Mental Health Emergency Services</p>
                    </div>
                    <button 
                      onClick={() => makeCall('+254 20 2557104')}
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
                <p className="text-gray-900 mb-4">
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
              <div className="space-y-2 text-sm text-gray-900">
                <p>• All crisis conversations are encrypted and confidential</p>
                <p>• Emergency services may be contacted if there's immediate danger</p>
                <p>• Your location is used only to find nearby help when needed</p>
                <p>• Crisis counselors are trained professionals bound by confidentiality</p>
                <p>• All listed services follow Kenyan healthcare privacy regulations</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
}
