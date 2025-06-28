import { NextRequest, NextResponse } from 'next/server';

// Mock data for individual resource lookup
const mockResources: Record<string, any> = {
  'kenya-befrienders': {
    id: 'kenya-befrienders',
    title: 'Befrienders Kenya',
    description: 'Provides emotional support to those in distress through confidential listening.',
    content: 'Befrienders Kenya offers 24/7 emotional support through trained volunteers who provide a safe space to talk about your feelings. They offer confidential telephone support for people experiencing emotional distress, depression, or suicidal thoughts. Services are free and available in English and Kiswahili.\n\nServices Include:\n• 24/7 telephone support\n• Confidential listening\n• Emotional support\n• Crisis intervention\n• Referrals to professional services\n\nContact Information:\nCall: +254 722 178 177\nEmail: info@befrienderskenya.org\nWebsite: www.befrienderskenya.org\n\nAvailable in English and Kiswahili. All services are free and confidential.',
    type: 'contact',
    category: 'Crisis Support',
    difficulty: 'Easy',
    duration_minutes: 5,
    rating: 4.8,
    featured: true
  },
  'kenya-eplus': {
    id: 'kenya-eplus',
    title: 'Emergency Plus Medical Services (E-Plus)',
    description: 'Offers ambulance and pre-hospital emergency medical services across Kenya.',
    content: 'E-Plus provides 24/7 emergency medical services including ambulance services, emergency medical care, and crisis intervention. They have trained medical professionals who can respond to mental health emergencies and provide immediate support while connecting you to appropriate mental health services.\n\nServices Include:\n• 24/7 emergency medical response\n• Ambulance services\n• Mental health crisis intervention\n• Pre-hospital emergency care\n• Medical emergency consultation\n• Referrals to mental health facilities\n\nContact Information:\nEmergency Line: +254 700 395 395\nAlternative: +254 733 395 395\nWebsite: www.eplus.co.ke\n\nNationwide coverage with trained medical professionals.',
    type: 'contact',
    category: 'Crisis Support',
    difficulty: 'Easy',
    duration_minutes: 5,
    rating: 4.7,
    featured: true
  },
  'kenya-redcross': {
    id: 'kenya-redcross',
    title: 'Kenya Red Cross Society',
    description: 'Provides humanitarian services, including disaster response and emergency support.',
    content: 'Kenya Red Cross offers psychosocial support services, emergency response, and community-based mental health programs. They provide crisis counseling, trauma support, and can connect you with local mental health resources. Available nationwide with trained counselors.\n\nServices Include:\n• Psychosocial support\n• Crisis counseling\n• Trauma support\n• Community mental health programs\n• Emergency response\n• Referrals to mental health services\n• Support groups\n\nContact Information:\nHotline: +254 703 037 000\nAlternative: +254 20 3950000\nEmail: info@redcross.or.ke\nWebsite: www.redcross.or.ke\n\nNationwide presence with trained counselors and volunteers.',
    type: 'contact',
    category: 'Crisis Support',
    difficulty: 'Easy',
    duration_minutes: 5,
    rating: 4.6,
    featured: true
  },
  'kenya-childline': {
    id: 'kenya-childline',
    title: 'Childline Kenya',
    description: '24/7 helpline for children and young people in crisis.',
    content: 'Childline Kenya provides free, confidential support for children and young people (up to 18 years) facing any kind of problem including mental health issues, abuse, family problems, or suicidal thoughts. Trained counselors provide immediate support and referrals.\n\nServices Include:\n• 24/7 helpline for children and youth\n• Crisis counseling\n• Mental health support\n• Abuse reporting and support\n• Family problem mediation\n• Referrals to appropriate services\n• Follow-up support\n\nContact Information:\nToll-Free: 116\nAlternative: +254 20 2671757\nWebsite: www.childlinekenya.co.ke\n\nSpecialized support for children and young people up to 18 years.',
    type: 'contact',
    category: 'Crisis Support',
    difficulty: 'Easy',
    duration_minutes: 5,
    rating: 4.7,
    featured: true
  }
};

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    const resource = mockResources[id];
    
    if (!resource) {
      return NextResponse.json(
        { error: 'Resource not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(resource);
  } catch (error) {
    console.error('Error fetching resource:', error);
    return NextResponse.json(
      { error: 'Failed to fetch resource' },
      { status: 500 }
    );
  }
}