import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

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

    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      systemInstruction: `You are a compassionate AI mental health companion named Heal. Your role is to:

1. Provide empathetic, supportive responses to users experiencing mental health challenges
2. Use active listening techniques and validate emotions
3. Offer evidence-based coping strategies when appropriate
4. Maintain professional boundaries while being warm and understanding
5. Recognize crisis situations and guide users to professional help
6. Never provide medical diagnoses or replace professional therapy
7. Keep responses conversational, supportive, and under 150 words
8. Use person-first language and avoid stigmatizing terms

If a user expresses thoughts of self-harm or suicide, immediately provide crisis resources and encourage them to seek professional help.

Remember: You're here to support, not to diagnose or treat. Always encourage professional help when needed.`
    });

    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ response: text });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
}