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

    Please provide a day-by-day itinerary that includes:
    1. Sustainable accommodations
    2. Eco-friendly activities and attractions
    3. Local, sustainable dining options
    4. Green transportation suggestions
    5. Tips for minimizing environmental impact

    Format the response as a JSON object with the following structure:
    {
      "overview": "A brief overview of the trip",
      "days": [
        {
          "day": 1,
          "activities": [
            "Activity 1",
            "Activity 2",
            "Activity 3"
          ]
        },
        // ... more days
      ]
    }

    Ensure the output is a valid JSON object without any additional text or formatting.`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const itineraryJson = JSON.parse(response.text());

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
