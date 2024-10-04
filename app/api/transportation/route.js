import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const from = searchParams.get('from');
  const to = searchParams.get('to');

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Suggest 5 eco-friendly and budget-friendly transportation options from ${from} to ${to}.
    Return only a JSON array of objects, each with 'name', 'co2Emissions', 'cost', and 'duration' properties.
    Example format:
    [
      {"name": "Electric Train", "co2Emissions": 10, "cost": 50, "duration": 120},
      {"name": "Shared Electric Car", "co2Emissions": 15, "cost": 30, "duration": 90}
    ]
    Ensure co2Emissions is in kg, cost is in dollars, and duration is in minutes.
    Do not include any additional text or formatting.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let responseText = response.text();
    
    responseText = responseText.replace(/^[\s\S]*?\[/, '[').replace(/\][\s\S]*$/, ']');

    console.log('Cleaned response:', responseText);  // For debugging

    let transportOptions;
    try {
      transportOptions = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      console.log('Raw response:', responseText);
      throw new Error('Invalid JSON response from AI model');
    }

    if (!Array.isArray(transportOptions) || transportOptions.length === 0 || 
        !transportOptions.every(item => item.name && item.co2Emissions !== undefined && 
                                        item.cost !== undefined && item.duration !== undefined)) {
      console.error('Invalid response structure:', transportOptions);
      throw new Error('Invalid response structure from AI model');
    }

    return NextResponse.json(transportOptions);
  } catch (error) {
    console.error('Error fetching transportation options:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch transportation options' }, { status: 500 });
  }
}
