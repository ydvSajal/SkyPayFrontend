import { NextRequest, NextResponse } from 'next/server'

function resolveServerApiBaseUrl() {
  const configuredBaseUrl = process.env.API_URL?.trim() || process.env.NEXT_PUBLIC_API_URL?.trim()
  if (configuredBaseUrl) {
    return configuredBaseUrl.endsWith('/') ? configuredBaseUrl.slice(0, -1) : configuredBaseUrl
  }

  if (process.env.NODE_ENV !== 'production') {
    return 'http://localhost:3001'
  }

  return null
}

export async function POST(req: NextRequest) {
  try {
    const apiBaseUrl = resolveServerApiBaseUrl()
    if (!apiBaseUrl) {
      return NextResponse.json(
        { error: 'API_URL or NEXT_PUBLIC_API_URL is not configured on the server.' },
        { status: 500 }
      )
    }

    const { messages } = await req.json()
    
    // Get the authorization header from the request
    const authHeader = req.headers.get('authorization')
    
    if (!authHeader) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get the last message from the user
    const lastMessage = messages[messages.length - 1]
    
    if (!lastMessage || lastMessage.role !== 'user') {
      return NextResponse.json(
        { error: 'Invalid message format' },
        { status: 400 }
      )
    }

    // Proxy the request to the backend
    const response = await fetch(`${apiBaseUrl}/api/agent/process`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader,
      },
      body: JSON.stringify({ 
        message: lastMessage.content,
        // Extract threadId from previous messages if available
        threadId: messages.find((m: { threadId?: string }) => m.threadId)?.threadId
      }),
    })

    if (!response.ok) {
      let errorData: { error?: string } | null = null
      try {
        errorData = await response.json()
      } catch {
        errorData = null
      }
      return NextResponse.json(
        { error: errorData?.error || 'Backend request failed' },
        { status: response.status }
      )
    }

    const data = await response.json()
    
    return NextResponse.json({
      success: true,
      response: data.data?.response || 'No response from agent',
      threadId: data.data?.threadId
    })
    
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
