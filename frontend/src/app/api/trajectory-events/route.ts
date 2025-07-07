import { NextRequest } from 'next/server';

const FASTAPI_BASE_URL = 'http://localhost:7999';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const trajectoryId = searchParams.get('trajectoryId');

  if (!trajectoryId) {
    return new Response('trajectoryId parameter is required', { status: 400 });
  }

  try {
    // Fetch trajectory data from the JSON file
    const response = await fetch(`${FASTAPI_BASE_URL}/trajectory/${trajectoryId}/events`);

    if (!response.ok) {
      return new Response(`Failed to fetch trajectory: ${response.status}`, {
        status: response.status
      });
    }

    const trajectoryData = await response.json();
    return Response.json(trajectoryData);
  } catch (error) {
    console.error('Error fetching trajectory data:', error);
    return new Response('Failed to fetch trajectory data', { status: 500 });
  }
}
