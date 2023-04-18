import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.sendinblue.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(req) {
  const res = await req.json();
  const { name: { firstName, lastName } = {}, email, phone, address, city, state, postalCode: zip, message } = res;

  // Perform validation on the form data
  if (!firstName || (!email && !phone) || !message) {
    return new Response('Please fill out all fields.', {
      status: 500,
    });
  }
  const plainTextEmail = `Dear Owner,

    You have received a new contact request from your golf course country club's website contact form. Here are the details:

    Name: ${firstName} ${lastName}
    ${email ? `Email: ${email}` : ''}
    ${phone ? `Phone: ${phone}` : ''}
    Address: ${address}
    City: ${city}
    State: ${state}
    Zip: ${zip}

    Message:
    ${message}

    Please reach out to the person at your earliest convenience using the provided contact information.

    Sincerely,
    Your Golf Course Country Club Team`;

  const htmlEmail = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
        }
        table {
          border-collapse: collapse;
          width: 100%;
          margin-bottom: 20px;
        }
        th, td {
          padding: 8px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }
      </style>
    </head>
    <body>

    <p>Dear Owner,</p>

    <p>You have received a new contact request from your golf course country club's website contact form. Here are the details:</p>

    <table>
      <tr>
        <td>Name:</td>
        <td>${firstName} ${lastName}</td>
      </tr>
      ${
        email
          ? `
      <tr>
        <td>Email:</td>
        <td>${email}</td>
      </tr>`
          : ''
      }
      ${
        phone
          ? `
      <tr>
        <td>Phone:</td>
        <td>${phone}</td>
      </tr>`
          : ''
      }
      <tr>
        <td>Address:</td>
        <td>${address}</td>
      </tr>
      <tr>
        <td>City:</td>
        <td>${city}</td>
      </tr>
      <tr>
        <td>State:</td>
        <td>${state}</td>
      </tr>
      <tr>
        <td>Zip:</td>
        <td>${zip}</td>
      </tr>
    </table>

    <p>Message:</p>
    <p>${message}</p>

    <p>Please reach out to the person at your earliest convenience using the provided contact information.</p>

    <p>Sincerely,<br>
    Your Golf Course Country Club Team</p>

    </body>
    </html>
  `;

  // setup email data with unicode symbols
  const mailOptions = {
    from: `"${firstName} ${lastName}" <${email}>`,
    to: 'panacountryclubwebsite@gmail.com', // list of receivers
    subject: `New Conact Form Request From ${firstName}`, // Subject line
    text: plainTextEmail, // plain text body
    html: htmlEmail, // html body
  };

  try {
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        throw new Error(error);
      }
      console.log('Message sent: %s', info.messageId);
    });
    return NextResponse.json({ message: 'Your message has been sent' });
  } catch (err) {
    return new Response('Something went wrong', {
      status: 500,
    });
  }
}
