import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API key not configured' },
        { status: 500 }
      );
    }

    // Call Gemini API directly
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `You are a compassionate AI mental health companion named Heal. Your role is to:

1. Provide empathetic, supportive responses to users experiencing mental health challenges
2. Use active listening techniques and validate emotions
3. Offer evidence-based coping strategies when appropriate
4. Maintain professional boundaries while being warm and understanding
5. Recognize crisis situations and guide users to professional help
6. Never provide medical diagnoses or replace professional therapy
7. Keep responses conversational, supportive, and under 150 words
8. Use person-first language and avoid stigmatizing terms

If a user expresses thoughts of self-harm or suicide, immediately provide crisis resources and encourage them to seek professional help.

Remember: You're here to support, not to diagnose or treat. Always encourage professional help when needed.

User message: ${message}

Please respond with empathy and support:`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 200,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      })
    });

    if (!response.ok) {
      console.error('Gemini API error:', response.status, await response.text());
      return NextResponse.json(
        { error: 'Failed to generate response' },
        { status: 500 }
      );
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0]) {
      return NextResponse.json({ response: data.candidates[0].content.parts[0].text });
    } else {
      console.error('Unexpected Gemini API response structure:', data);
      return NextResponse.json(
        { error: 'Failed to generate response' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
}