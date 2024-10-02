import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
  const formData = await request.json();

  const prompt = `Generate a sustainable travel itinerary for the following trip:
    Destination: ${formData.destination}
    Start Date: ${formData.startDate}
    End Date: ${formData.endDate}
    Duration: ${formData.duration} days
    Travel Style: ${formData.travelStyle}
    Budget: ${formData.budget}
    Interests: ${formData.interests}
    Sustainability Preference: ${formData.sustainabilityPreference}

    Provide a day-by-day itinerary that includes sustainable accommodations, eco-friendly activities, local dining options, and green transportation.

    IMPORTANT: Respond ONLY with a valid JSON object. Do not include any additional text, explanations, or formatting outside of the JSON structure. The JSON should follow this exact format:

    {
      "overview": "Brief overview of the trip",
      "days": [
        {
          "day": 1,
          "activities": [
            "Detailed description of activity 1",
            "Detailed description of activity 2",
            "Detailed description of activity 3"
          ]
        }
      ]
    }

    Ensure the JSON is valid and contains the exact number of days specified in the duration.`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let responseText = response.text();

    // Log the raw response for debugging
    console.log('Raw AI response:', responseText);

    // Try to extract JSON from the response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON object found in the response');
    }

    let itineraryJson;
    try {
      itineraryJson = JSON.parse(jsonMatch[0]);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      throw new Error('Invalid JSON structure in AI response');
    }

    // Validate the structure of the JSON
    if (!itineraryJson.overview || !Array.isArray(itineraryJson.days)) {
      throw new Error('Invalid itinerary structure');
    }

    return new Response(JSON.stringify(itineraryJson), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error generating itinerary:', error);
    return new Response(JSON.stringify({ error: error.message || 'Failed to generate itinerary' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
}
