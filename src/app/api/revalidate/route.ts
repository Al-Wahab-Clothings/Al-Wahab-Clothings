import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // Parse JSON body
    const { slug } = body;

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug is required for revalidation.' },
        { status: 400 }
      );
    }

    // Trigger revalidation of a specific page
    await fetch(`${process.env.NEXTAUTH_URL}/api/revalidate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug }),
    });

    return NextResponse.json({ message: 'Revalidation triggered successfully.' });
  } catch (err) {
    console.error('Error during revalidation:', err);
    return NextResponse.json(
      { error: 'Failed to trigger revalidation.' },
      { status: 500 }
    );
  }
}
