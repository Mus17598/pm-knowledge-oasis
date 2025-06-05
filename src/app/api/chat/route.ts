import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { message, level } = await req.json();

    const prompt = `You are a product management expert. Answer the following question for a ${level} level product manager. 
    For Beginner level: Provide simple, conceptual explanations with analogies.
    For Intermediate level: Include frameworks, tools, examples, and some metrics.
    For Advanced level: Discuss nuanced tradeoffs, edge cases, systems thinking, and cross-functional impact.
    
    Question: ${message}`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4-turbo-preview",
    });

    return NextResponse.json({
      response: completion.choices[0].message.content
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
} 