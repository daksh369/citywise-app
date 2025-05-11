export function GET(request: Request) {
  return Response.json({ 
    message: "Welcome to the CityWise API",
    status: "online",
    timestamp: new Date().toISOString()
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // If location data is provided, we could return localized content
    if (body.location) {
      return Response.json({
        message: `Location data received for ${body.location}`,
        localUpdates: true,
        totalUpdates: Math.floor(Math.random() * 10) + 1
      });
    }
    
    return Response.json({
      message: "Data received successfully",
      success: true
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Invalid request body" }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}