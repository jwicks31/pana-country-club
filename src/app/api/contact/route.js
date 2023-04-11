import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.sendinblue.com',
  port: 587,
  secure: false,
  auth: {
    user: 'panacountryclubwebsite@gmail.com',
    pass: 'srWvB3Pm9abEMg1t',
  },
});

export async function POST(req) {
  const res = await req.json();
  const { name: { firstName, lastName } = {}, email, phone, message } = res;

  // Perform validation on the form data
  if (!firstName || (!email && !phone) || !message) {
    return new Response('Please fill out all fields.', {
      status: 500,
    });
  }

  // setup email data with unicode symbols
  const mailOptions = {
    from: `"${firstName} ${lastName}" <${email}>`,
    to: 'panacountryclubwebsite@gmail.com', // list of receivers
    subject: `New Conact Form Request From ${firstName}`, // Subject line
    text: message, // plain text body
    html: '<b>Hello world?</b>', // html body
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
