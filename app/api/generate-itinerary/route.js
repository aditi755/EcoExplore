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

    Respond ONLY with a JSON object in the following format, without any additional text or explanation:

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
        },
        {
          "day": 2,
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

    // Remove any non-JSON content
    responseText = responseText.replace(/^[\s\S]*?(\{[\s\S]*\})[\s\S]*$/, '$1');

    // Attempt to parse the JSON
    let itineraryJson;
    try {
      itineraryJson = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      console.log('Raw response:', responseText);
      throw new Error('Invalid JSON response from AI model');
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
    return new Response(JSON.stringify({ error: 'Failed to generate itinerary' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
}
