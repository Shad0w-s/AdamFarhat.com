import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Here you would typically send an email using a service like Resend, SendGrid, etc.
    // For now, we'll just log it and return success
    console.log('Contact form submission:', body)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact error:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}

