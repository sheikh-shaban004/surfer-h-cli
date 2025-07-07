import { NextRequest } from 'next/server';

const FASTAPI_BASE_URL = 'http://localhost:7999';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log('Next.js API: Forwarding request to FastAPI:', {
      url: `${FASTAPI_BASE_URL}/start`,
      body: body
    });

    // Forward the request to our FastAPI server
    let response;
    try {
      response = await fetch(`${FASTAPI_BASE_URL}/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
    } catch (fetchError) {
      console.error('Next.js API: Failed to connect to FastAPI:', fetchError);
      const errorMessage = fetchError instanceof Error ? fetchError.message : 'Unknown error';
      return Response.json({
        detail: `Failed to connect to backend server: ${errorMessage}`
      }, { status: 503 });
    }

    console.log('Next.js API: FastAPI response status:', response.status, response.statusText);

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
        console.log('Next.js API: FastAPI error (JSON):', errorData);
      } catch {
        const textData = await response.text();
        console.log('Next.js API: FastAPI error (TEXT):', textData);
        errorData = { detail: textData };
      }
      return Response.json(errorData, { status: response.status });
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error('Error starting trajectory:', error);
    return Response.json({ detail: 'Failed to start trajectory' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const taskId = searchParams.get('taskId');

  try {
    if (taskId) {
      // Get specific trajectory status
      const response = await fetch(`${FASTAPI_BASE_URL}/status/${taskId}`);

      if (!response.ok) {
        return Response.json({ detail: 'Trajectory not found' }, { status: 404 });
      }

      const data = await response.json();
      return Response.json(data);
    } else {
      // List all trajectories
      const response = await fetch(`${FASTAPI_BASE_URL}/trajectories`);

      if (!response.ok) {
        return Response.json({ detail: 'Failed to fetch trajectories' }, { status: 500 });
      }

      const data = await response.json();
      return Response.json(data);
    }
  } catch (error) {
    console.error('Error fetching trajectory data:', error);
    return Response.json({ detail: 'Failed to fetch trajectory data' }, { status: 500 });
  }
}
