import { getVectorStore } from '../../utils/vectorStore';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
  const formData = await request.json();

  try {
    // Search for relevant destinations
    const vectorStore = await getVectorStore();
    const searchResults = await vectorStore.similaritySearch(formData.destination, 3);

    // Generate recommendations and itinerary using Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Based on the following travel preferences:
      Destination: ${formData.destination}
      Start Date: ${formData.startDate}
      End Date: ${formData.endDate}
      Duration: ${formData.duration} days
      Travel Style: ${formData.travelStyle}
      Budget: ${formData.budget}
      Interests: ${formData.interests}
      Sustainability Preference: ${formData.sustainabilityPreference}

      And considering these destinations:
      ${searchResults.map(result => `- ${result.metadata.destination}: ${result.pageContent}`).join('\n')}

      Provide travel recommendations and a detailed itinerary in the following JSON format:
      {
        "recommendations": [
          {
            "destination": "Destination Name",
            "description": "Brief description of why this destination matches the preferences",
            "sustainabilityScore": 85,
            "activities": ["Activity 1", "Activity 2", "Activity 3"]
          }
        ],
        "itinerary": {
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
      }

      Ensure the recommendations and itinerary are tailored to the user's preferences, focus on sustainable travel options, and cover the exact number of days specified in the duration. Return only the JSON object without any additional text or formatting.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const responseText = response.text();
    
    console.log('Raw AI response:', responseText);  // Log the raw response for debugging

    // Remove any markdown formatting if present
    const jsonString = responseText.replace(/```json\n?|\n?```/g, '').trim();

    let plannerData;
    try {
      plannerData = JSON.parse(jsonString);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      throw new Error('Invalid JSON response from AI model');
    }

    // Validate the structure of plannerData
    if (!plannerData.recommendations || !Array.isArray(plannerData.recommendations) || !plannerData.itinerary) {
      console.error('Invalid plannerData structure:', plannerData);
      throw new Error('Invalid response structure from AI model');
    }

    return new Response(JSON.stringify(plannerData), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error in generate itinerary:', error);
    return new Response(JSON.stringify({ error: error.message || 'Failed to generate itinerary' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
}
