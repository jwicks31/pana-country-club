import { NextResponse } from 'next/server';

export async function POST(req) {
  const res = await req.json();
  const { name, email, message } = res;

  // Perform validation on the form data
  if (!name || !email || !message) {
    return new Response('Please fill out all fields.', {
      status: 500,
    });
  }

  try {
    // Send the email using your email provider of choice
    // For example, you could use Nodemailer with Gmail SMTP
    // See: https://nodemailer.com/about/

    // Send a response to the client to indicate success
    throw new Error('ERROR');
    return NextResponse.json({ message: 'Your message has been sent' });
  } catch (err) {
    return new Response('Something went wrong', {
      status: 500,
    });
  }
}
