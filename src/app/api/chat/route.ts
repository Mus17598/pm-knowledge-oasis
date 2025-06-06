import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Validate environment variables
if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is not set in environment variables');
}

export async function POST(req: Request) {
  try {
    // Parse request body
    const body = await req.json();
    const { message, level } = body;

    // Validate request body
    if (!message || !level) {
      return NextResponse.json(
        { error: 'Message and level are required' },
        { status: 400 }
      );
    }

    // Construct the prompt based on experience level
    const prompt = `You are a product management expert. Answer the following question for a ${level} level product manager.

For Beginner level:
- Provide simple, conceptual explanations
- Use analogies and real-world examples
- Focus on fundamental concepts
- Avoid technical jargon
- Include step-by-step guidance

For Intermediate level:
- Include relevant frameworks and methodologies
- Discuss tools and best practices
- Provide concrete examples
- Include some metrics and KPIs
- Reference industry standards

For Advanced level:
- Discuss nuanced tradeoffs and edge cases
- Include systems thinking and cross-functional impact
- Reference advanced frameworks and methodologies
- Discuss scaling and optimization
- Include strategic considerations

Question: ${message}

Please provide a clear, structured response that matches the experience level.`;

    // Get response from OpenAI
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4-turbo-preview",
      temperature: 0.7,
      max_tokens: 1000,
    });

    // Validate response
    if (!completion.choices[0]?.message?.content) {
      throw new Error('No response from OpenAI');
    }

    // Return formatted response
    return NextResponse.json({
      response: completion.choices[0].message.content
    });

  } catch (error) {
    console.error('Error in chat API:', error);
    
    // Handle specific error cases
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return NextResponse.json(
          { error: 'OpenAI API key is invalid or not configured' },
          { status: 500 }
        );
      }
    }

    // Generic error response
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
} 