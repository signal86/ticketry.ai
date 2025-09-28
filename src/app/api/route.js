import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ 
    message: 'Hello, world!',
    timestamp: new Date().toISOString()
  })
}

export async function POST(request) {
  const body = await request.json()
  return NextResponse.json({ 
    received: true,
    data: body,
    timestamp: new Date().toISOString()
  })
}
