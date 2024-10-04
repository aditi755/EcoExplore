import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const location = searchParams.get('location');
  const nights = searchParams.get('nights');

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Suggest 3 ${type} accommodations in ${location} for a ${nights}-night stay.
    Return only a JSON array of objects, each with 'name' and 'address' properties.
    Example format:
    [
      {"name": "Accommodation 1", "address": "Address 1"},
      {"name": "Accommodation 2", "address": "Address 2"},
      {"name": "Accommodation 3", "address": "Address 3"}
    ]
    Do not include any additional text or formatting.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let responseText = response.text();
    
    // Remove any non-JSON content
    responseText = responseText.replace(/^[\s\S]*?\[/, '[').replace(/\][\s\S]*$/, ']');

    console.log('Cleaned response:', responseText);  // For debugging

    let accommodations;
    try {
      accommodations = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      console.log('Raw response:', responseText);
      throw new Error('Invalid JSON response from AI model');
    }

    if (!Array.isArray(accommodations) || accommodations.length === 0 || !accommodations.every(item => item.name && item.address)) {
      console.error('Invalid response structure:', accommodations);
      throw new Error('Invalid response structure from AI model');
    }

    return NextResponse.json(accommodations);
  } catch (error) {
    console.error('Error fetching accommodations:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch accommodations' }, { status: 500 });
  }
}
