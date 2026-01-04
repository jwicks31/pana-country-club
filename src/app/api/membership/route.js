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

function sendMailPromise(transporter, mailOptions) {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        reject(new Error('Something went wrong.'));
      } else {
        console.log('Message sent: %s', info.messageId);
        resolve(info);
      }
    });
  });
}

function formatDate(dateString) {
  if (!dateString) return 'Not provided';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function getMembershipTypeLabel(type) {
  const labels = {
    full: 'Full Membership',
    introductory: 'Introductory Membership',
    junior: 'Junior Membership',
  };
  return labels[type] || type;
}

function getPaymentFrequencyLabel(freq) {
  const labels = {
    annually: 'Annually',
    'semi-annually': 'Semi-Annually',
    monthly: 'Monthly',
  };
  return labels[freq] || freq;
}

export async function POST(req) {
  const body = await req.json();
  const {
    membershipType,
    householdType,
    outOfTown,
    introductoryDiscount,
    nonResidentDiscount,
    applicantName,
    applicantDOB,
    applicantMaritalStatus,
    primaryResidence,
    applicantPhone,
    applicantEmail,
    applicantEmployer,
    coApplicantName,
    coApplicantDOB,
    coApplicantMaritalStatus,
    secondaryResidence,
    coApplicantPhone,
    coApplicantEmail,
    coApplicantEmployer,
    children,
    yearsInArea,
    previousMember,
    previousMembershipDetails,
    relatives,
    sponsorName,
    sponsorRelationship,
    cartStorage,
    cartTrailFee,
    cartUnlimitedRental,
    paymentFrequency,
    bankName,
    bankAddress,
    routingNumber,
    accountNumber,
    accountType,
  } = body;

  // Perform validation on the form data
  if (!applicantName || !applicantEmail || !applicantPhone || !membershipType) {
    return new Response('Please fill out all required fields.', {
      status: 400,
    });
  }

  // Filter out empty children entries
  const filledChildren = children.filter((c) => c.name);
  // Filter out empty relatives entries
  const filledRelatives = relatives.filter((r) => r.name);

  const currentYear = new Date().getFullYear();

  const plainTextEmail = `Dear Pana Country Club Board,

You have received a new membership application from your website. Here are the details:

=== MEMBERSHIP TYPE ===
Type: ${getMembershipTypeLabel(membershipType)}
Household: ${householdType ? householdType.charAt(0).toUpperCase() + householdType.slice(1) : 'Not specified'}
Out of Town Discount ($50 off): ${outOfTown ? 'Yes' : 'No'}
Introductory Discount (50% off): ${introductoryDiscount ? 'Yes - REQUIRES APPROVAL' : 'No'}
Non-Resident Discount (50% off): ${nonResidentDiscount ? 'Yes - REQUIRES APPROVAL' : 'No'}

=== APPLICANT INFORMATION ===
Name: ${applicantName}
Date of Birth: ${formatDate(applicantDOB)}
Marital Status: ${applicantMaritalStatus ? applicantMaritalStatus.charAt(0).toUpperCase() + applicantMaritalStatus.slice(1) : 'Not specified'}
Primary Residence: ${primaryResidence}
Phone: ${applicantPhone}
Email: ${applicantEmail}
Employer: ${applicantEmployer || 'Not provided'}

${coApplicantName ? `=== CO-APPLICANT INFORMATION ===
Name: ${coApplicantName}
Date of Birth: ${formatDate(coApplicantDOB)}
Marital Status: ${coApplicantMaritalStatus ? coApplicantMaritalStatus.charAt(0).toUpperCase() + coApplicantMaritalStatus.slice(1) : 'Not specified'}
Secondary Residence: ${secondaryResidence || 'Same as primary'}
Phone: ${coApplicantPhone || 'Not provided'}
Email: ${coApplicantEmail || 'Not provided'}
Employer: ${coApplicantEmployer || 'Not provided'}
` : ''}
${filledChildren.length > 0 ? `=== CHILDREN (Under 21) ===
${filledChildren.map((child, i) => `${i + 1}. ${child.name} - DOB: ${formatDate(child.dob)} - School: ${child.schoolEnrollment || 'Not provided'}`).join('\n')}
` : ''}
=== ADDITIONAL INFORMATION ===
Years in Area: ${yearsInArea || 'Not provided'}
Previous Member: ${previousMember === 'yes' ? 'Yes' : 'No'}
${previousMember === 'yes' && previousMembershipDetails ? `Previous Membership Details: ${previousMembershipDetails}` : ''}

${filledRelatives.length > 0 ? `=== RELATIVES WHO ARE/WERE MEMBERS ===
${filledRelatives.map((rel, i) => `${i + 1}. ${rel.name} - ${rel.relationship}`).join('\n')}
` : ''}
${sponsorName ? `=== SPONSOR ===
Name: ${sponsorName}
Relationship: ${sponsorRelationship || 'Not provided'}
` : ''}
=== GOLF CART OPTIONS ===
Cart Storage ($180/year): ${cartStorage ? 'Yes' : 'No'}
Trail Fee ($120/year): ${cartTrailFee ? 'Yes' : 'No'}
Unlimited Rental ($324/year): ${cartUnlimitedRental ? 'Yes' : 'No'}

=== PAYMENT INFORMATION ===
Payment Frequency: ${getPaymentFrequencyLabel(paymentFrequency)}
${paymentFrequency === 'monthly' ? `
Bank Name: ${bankName || 'Not provided'}
Bank Address: ${bankAddress || 'Not provided'}
Routing Number: ${routingNumber || 'Not provided'}
Account Number: ${accountNumber ? '****' + accountNumber.slice(-4) : 'Not provided'}
Account Type: ${accountType ? accountType.charAt(0).toUpperCase() + accountType.slice(1) : 'Not provided'}
` : ''}

The applicant has agreed to the terms and conditions.

Please review this application and follow up with the applicant.

Sincerely,
Pana Country Club Website`;

  const htmlEmail = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
        }
        .container {
          max-width: 700px;
          margin: 0 auto;
          padding: 20px;
        }
        h1 {
          color: #8B7355;
          border-bottom: 2px solid #D4AF37;
          padding-bottom: 10px;
        }
        h2 {
          color: #8B7355;
          margin-top: 25px;
          font-size: 18px;
          border-bottom: 1px solid #ddd;
          padding-bottom: 5px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 15px;
        }
        th, td {
          padding: 10px;
          text-align: left;
          border-bottom: 1px solid #eee;
        }
        th {
          background-color: #f8f8f8;
          font-weight: 600;
          width: 200px;
        }
        .highlight {
          background-color: #FFF8DC;
          padding: 15px;
          border-radius: 5px;
          margin: 15px 0;
        }
        .footer {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #ddd;
          font-size: 14px;
          color: #666;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>New Membership Application - ${currentYear}</h1>

        <div class="highlight">
          <strong>Application from:</strong> ${applicantName}<br>
          <strong>Email:</strong> ${applicantEmail}<br>
          <strong>Phone:</strong> ${applicantPhone}
        </div>

        <h2>Membership Type</h2>
        <table>
          <tr>
            <th>Type</th>
            <td>${getMembershipTypeLabel(membershipType)}</td>
          </tr>
          <tr>
            <th>Household</th>
            <td>${householdType ? householdType.charAt(0).toUpperCase() + householdType.slice(1) : 'Not specified'}</td>
          </tr>
          <tr>
            <th>Out of Town Discount ($50 off)</th>
            <td>${outOfTown ? 'Yes' : 'No'}</td>
          </tr>
          <tr>
            <th>Introductory Discount (50% off)</th>
            <td>${introductoryDiscount ? '<strong style="color: #d97706;">Yes - REQUIRES APPROVAL</strong>' : 'No'}</td>
          </tr>
          <tr>
            <th>Non-Resident Discount (50% off)</th>
            <td>${nonResidentDiscount ? '<strong style="color: #d97706;">Yes - REQUIRES APPROVAL</strong>' : 'No'}</td>
          </tr>
        </table>

        <h2>Applicant Information</h2>
        <table>
          <tr>
            <th>Name</th>
            <td>${applicantName}</td>
          </tr>
          <tr>
            <th>Date of Birth</th>
            <td>${formatDate(applicantDOB)}</td>
          </tr>
          <tr>
            <th>Marital Status</th>
            <td>${applicantMaritalStatus ? applicantMaritalStatus.charAt(0).toUpperCase() + applicantMaritalStatus.slice(1) : 'Not specified'}</td>
          </tr>
          <tr>
            <th>Primary Residence</th>
            <td>${primaryResidence}</td>
          </tr>
          <tr>
            <th>Phone</th>
            <td>${applicantPhone}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>${applicantEmail}</td>
          </tr>
          <tr>
            <th>Employer</th>
            <td>${applicantEmployer || 'Not provided'}</td>
          </tr>
        </table>

        ${coApplicantName ? `
        <h2>Co-Applicant / Spouse Information</h2>
        <table>
          <tr>
            <th>Name</th>
            <td>${coApplicantName}</td>
          </tr>
          <tr>
            <th>Date of Birth</th>
            <td>${formatDate(coApplicantDOB)}</td>
          </tr>
          <tr>
            <th>Marital Status</th>
            <td>${coApplicantMaritalStatus ? coApplicantMaritalStatus.charAt(0).toUpperCase() + coApplicantMaritalStatus.slice(1) : 'Not specified'}</td>
          </tr>
          <tr>
            <th>Secondary Residence</th>
            <td>${secondaryResidence || 'Same as primary'}</td>
          </tr>
          <tr>
            <th>Phone</th>
            <td>${coApplicantPhone || 'Not provided'}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>${coApplicantEmail || 'Not provided'}</td>
          </tr>
          <tr>
            <th>Employer</th>
            <td>${coApplicantEmployer || 'Not provided'}</td>
          </tr>
        </table>
        ` : ''}

        ${filledChildren.length > 0 ? `
        <h2>Children (Under 21)</h2>
        <table>
          <tr>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>School Enrollment</th>
          </tr>
          ${filledChildren.map((child) => `
          <tr>
            <td>${child.name}</td>
            <td>${formatDate(child.dob)}</td>
            <td>${child.schoolEnrollment || 'Not provided'}</td>
          </tr>
          `).join('')}
        </table>
        ` : ''}

        <h2>Additional Information</h2>
        <table>
          <tr>
            <th>Years in Area</th>
            <td>${yearsInArea || 'Not provided'}</td>
          </tr>
          <tr>
            <th>Previous Member</th>
            <td>${previousMember === 'yes' ? 'Yes' : 'No'}</td>
          </tr>
          ${previousMember === 'yes' && previousMembershipDetails ? `
          <tr>
            <th>Previous Membership Details</th>
            <td>${previousMembershipDetails}</td>
          </tr>
          ` : ''}
        </table>

        ${filledRelatives.length > 0 ? `
        <h2>Relatives Who Are/Were Members</h2>
        <table>
          <tr>
            <th>Name</th>
            <th>Relationship</th>
          </tr>
          ${filledRelatives.map((rel) => `
          <tr>
            <td>${rel.name}</td>
            <td>${rel.relationship}</td>
          </tr>
          `).join('')}
        </table>
        ` : ''}

        ${sponsorName ? `
        <h2>Membership Sponsor</h2>
        <table>
          <tr>
            <th>Sponsor Name</th>
            <td>${sponsorName}</td>
          </tr>
          <tr>
            <th>Relationship</th>
            <td>${sponsorRelationship || 'Not provided'}</td>
          </tr>
        </table>
        ` : ''}

        <h2>Golf Cart Options</h2>
        <table>
          <tr>
            <th>Cart Storage ($180/year)</th>
            <td>${cartStorage ? 'Yes' : 'No'}</td>
          </tr>
          <tr>
            <th>Trail Fee ($120/year)</th>
            <td>${cartTrailFee ? 'Yes' : 'No'}</td>
          </tr>
          <tr>
            <th>Unlimited Rental ($324/year)</th>
            <td>${cartUnlimitedRental ? 'Yes' : 'No'}</td>
          </tr>
        </table>

        <h2>Payment Information</h2>
        <table>
          <tr>
            <th>Payment Frequency</th>
            <td>${getPaymentFrequencyLabel(paymentFrequency)}</td>
          </tr>
          ${paymentFrequency === 'monthly' ? `
          <tr>
            <th>Bank Name</th>
            <td>${bankName || 'Not provided'}</td>
          </tr>
          <tr>
            <th>Bank Address</th>
            <td>${bankAddress || 'Not provided'}</td>
          </tr>
          <tr>
            <th>Routing Number</th>
            <td>${routingNumber || 'Not provided'}</td>
          </tr>
          <tr>
            <th>Account Number</th>
            <td>${accountNumber ? '****' + accountNumber.slice(-4) : 'Not provided'}</td>
          </tr>
          <tr>
            <th>Account Type</th>
            <td>${accountType ? accountType.charAt(0).toUpperCase() + accountType.slice(1) : 'Not provided'}</td>
          </tr>
          ` : ''}
        </table>

        <div class="footer">
          <p>The applicant has agreed to the terms and conditions of membership.</p>
          <p>Please review this application and follow up with the applicant at your earliest convenience.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  // setup email data
  const mailOptions = {
    from: `"${applicantName}" <${applicantEmail}>`,
    to: 'panacountryclub@gmail.com',
    subject: `New Membership Application from ${applicantName}`,
    text: plainTextEmail,
    html: htmlEmail,
  };

  try {
    await sendMailPromise(transporter, mailOptions);
    return NextResponse.json({ message: 'Your application has been submitted' });
  } catch (err) {
    console.error('Email send error:', err);
    return new Response('Something went wrong', {
      status: 500,
    });
  }
}
