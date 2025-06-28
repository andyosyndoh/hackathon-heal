import { NextRequest, NextResponse } from 'next/server';

// Mock data for resources including Kenyan crisis contacts
const mockResources = [
  // Mental Health Resources
  {
    id: '1',
    title: 'Understanding Anxiety: A Complete Guide',
    description: 'Learn about anxiety symptoms, triggers, and evidence-based coping strategies.',
    content: 'Anxiety is a natural response to stress, but when it becomes overwhelming...',
    type: 'article',
    category: 'anxiety',
    difficulty: 'beginner',
    duration_minutes: 15,
    rating: 4.8,
    featured: true
  },
  {
    id: '2',
    title: 'Guided Meditation for Depression',
    description: 'A 20-minute guided meditation specifically designed for managing depressive symptoms.',
    content: 'This meditation focuses on self-compassion and gentle awareness...',
    type: 'audio',
    category: 'depression',
    difficulty: 'beginner',
    duration_minutes: 20,
    rating: 4.9,
    featured: true
  },

  // Kenyan Crisis Support Contacts
  {
    id: 'kenya-befrienders',
    title: 'Befrienders Kenya',
    description: 'Provides emotional support to those in distress through confidential listening.',
    content: 'Befrienders Kenya offers 24/7 emotional support through trained volunteers who provide a safe space to talk about your feelings. They offer confidential telephone support for people experiencing emotional distress, depression, or suicidal thoughts. Services are free and available in English and Kiswahili.\n\nCall: +254 722 178 177\nEmail: info@befrienderskenya.org\nWebsite: www.befrienderskenya.org',
    type: 'contact',
    category: 'Crisis Support',
    difficulty: 'Easy',
    duration_minutes: 5,
    rating: 4.8,
    featured: true
  },
  {
    id: 'kenya-eplus',
    title: 'Emergency Plus Medical Services (E-Plus)',
    description: 'Offers ambulance and pre-hospital emergency medical services across Kenya.',
    content: 'E-Plus provides 24/7 emergency medical services including ambulance services, emergency medical care, and crisis intervention. They have trained medical professionals who can respond to mental health emergencies and provide immediate support while connecting you to appropriate mental health services.\n\nEmergency Line: +254 700 395 395\nAlternative: +254 733 395 395\nWebsite: www.eplus.co.ke',
    type: 'contact',
    category: 'Crisis Support',
    difficulty: 'Easy',
    duration_minutes: 5,
    rating: 4.7,
    featured: true
  },
  {
    id: 'kenya-redcross',
    title: 'Kenya Red Cross Society',
    description: 'Provides humanitarian services, including disaster response and emergency support.',
    content: 'Kenya Red Cross offers psychosocial support services, emergency response, and community-based mental health programs. They provide crisis counseling, trauma support, and can connect you with local mental health resources. Available nationwide with trained counselors.\n\nHotline: +254 703 037 000\nAlternative: +254 20 3950000\nEmail: info@redcross.or.ke\nWebsite: www.redcross.or.ke',
    type: 'contact',
    category: 'Crisis Support',
    difficulty: 'Easy',
    duration_minutes: 5,
    rating: 4.6,
    featured: true
  },
  {
    id: 'kenya-mental-health',
    title: 'Kenya Association for Mental Health',
    description: 'Dedicated to promoting mental health awareness and providing support services.',
    content: 'KAMH provides mental health advocacy, counseling services, and community outreach programs. They offer support groups, individual counseling, and crisis intervention services. They also provide training and education on mental health issues.\n\nPhone: +254 20 2717077\nMobile: +254 722 364 456\nEmail: info@mentalhealthkenya.org\nWebsite: www.mentalhealthkenya.org',
    type: 'contact',
    category: 'Crisis Support',
    difficulty: 'Easy',
    duration_minutes: 5,
    rating: 4.5,
    featured: true
  },
  {
    id: 'kenya-police',
    title: 'Kenya Police Emergency Services',
    description: 'National police emergency services for immediate crisis intervention.',
    content: 'For immediate emergency situations involving threats to personal safety, domestic violence, or when someone is in immediate danger. Police can provide immediate intervention and connect you with appropriate mental health crisis services.\n\nEmergency: 999\nAlternative: 911\nPolice Hotline: +254 20 341 4906',
    type: 'contact',
    category: 'Crisis Support',
    difficulty: 'Easy',
    duration_minutes: 5,
    rating: 4.4,
    featured: true
  },
  {
    id: 'kenya-childline',
    title: 'Childline Kenya',
    description: '24/7 helpline for children and young people in crisis.',
    content: 'Childline Kenya provides free, confidential support for children and young people (up to 18 years) facing any kind of problem including mental health issues, abuse, family problems, or suicidal thoughts. Trained counselors provide immediate support and referrals.\n\nToll-Free: 116\nAlternative: +254 20 2671757\nWebsite: www.childlinekenya.co.ke',
    type: 'contact',
    category: 'Crisis Support',
    difficulty: 'Easy',
    duration_minutes: 5,
    rating: 4.7,
    featured: true
  },
  {
    id: 'kenya-gender-violence',
    title: 'Gender Violence Recovery Centre',
    description: 'Specialized support for survivors of gender-based violence.',
    content: 'GVRC provides comprehensive support for survivors of gender-based violence including counseling, legal aid, medical support, and safe shelter. They have trained counselors who understand trauma and can provide specialized mental health support.\n\nHotline: +254 709 660 000\nNairobi: +254 20 2731313\nWebsite: www.gvrc.or.ke',
    type: 'contact',
    category: 'Crisis Support',
    difficulty: 'Easy',
    duration_minutes: 5,
    rating: 4.6,
    featured: true
  },
  {
    id: 'kenya-samaritans',
    title: 'Samaritans Kenya',
    description: 'Emotional support and suicide prevention services.',
    content: 'Samaritans Kenya provides confidential emotional support to anyone experiencing feelings of distress or despair, including those having suicidal thoughts. Trained volunteers offer non-judgmental listening and support 24/7.\n\nNairobi: +254 722 178 177\nMombasa: +254 41 222 5555\nEmail: samaritanskenya@gmail.com',
    type: 'contact',
    category: 'Crisis Support',
    difficulty: 'Easy',
    duration_minutes: 5,
    rating: 4.8,
    featured: true
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const type = searchParams.get('type');
    const difficulty = searchParams.get('difficulty');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    let filteredResources = mockResources;

    // Apply filters
    if (category && category !== 'all') {
      filteredResources = filteredResources.filter(r => 
        r.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (type && type !== 'all') {
      filteredResources = filteredResources.filter(r => 
        r.type.toLowerCase() === type.toLowerCase()
      );
    }

    if (difficulty && difficulty !== 'all') {
      filteredResources = filteredResources.filter(r => 
        r.difficulty.toLowerCase() === difficulty.toLowerCase()
      );
    }

    // Apply pagination
    const paginatedResources = filteredResources.slice(offset, offset + limit);

    return NextResponse.json({
      resources: paginatedResources,
      total: filteredResources.length,
      limit,
      offset
    });
  } catch (error) {
    console.error('Error fetching resources:', error);
    return NextResponse.json(
      { error: 'Failed to fetch resources' },
      { status: 500 }
    );
  }
}