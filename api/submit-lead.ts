import type { VercelRequest, VercelResponse } from '@vercel/node';

interface LeadPayload {
  topic: string;
  name: string;
  email: string;
  phone?: string;
  currentBrokerage?: string;
  yearsLicensed?: string;
  message?: string;
  sourcePage?: string;
  honeypot?: string;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const payload = req.body as LeadPayload;

  // Spam protection: reject if honeypot is filled
  if (payload.honeypot && payload.honeypot.trim().length > 0) {
    return res.status(200).json({ ok: true, message: 'Received' });
  }

  // Validate required fields
  if (!payload.name || !payload.email || !payload.topic) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  
  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY not configured');
    return res.status(500).json({ 
      error: 'Email service not configured',
      message: 'Please set RESEND_API_KEY environment variable in Vercel project settings'
    });
  }

  // Build email content
  const subject = `KW Success website inquiry — ${payload.topic}`;
  const lines = [
    `<h2>New Lead from KW Success Website</h2>`,
    `<p><strong>Topic:</strong> ${payload.topic}</p>`,
    `<p><strong>Name:</strong> ${payload.name}</p>`,
    `<p><strong>Email:</strong> ${payload.email}</p>`,
    payload.phone ? `<p><strong>Phone:</strong> ${payload.phone}</p>` : '',
    payload.currentBrokerage ? `<p><strong>Current Brokerage:</strong> ${payload.currentBrokerage}</p>` : '',
    payload.yearsLicensed ? `<p><strong>Years Licensed:</strong> ${payload.yearsLicensed}</p>` : '',
    payload.sourcePage ? `<p><strong>Source Page:</strong> ${payload.sourcePage}</p>` : '',
    payload.message ? `<p><strong>Message:</strong></p><p>${payload.message.replace(/\n/g, '<br>')}</p>` : '',
  ].filter(Boolean).join('\n');

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'KW Success Website <noreply@kwsuccess.com>',
        to: ['admin@unitedagentservices.biz'],
        subject: subject,
        html: lines,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Resend API error:', errorData);
      throw new Error('Email delivery failed');
    }

    const data = await response.json();
    console.log('Email sent successfully:', data);

    return res.status(200).json({ 
      ok: true, 
      message: 'Lead submitted successfully',
      emailId: data.id 
    });

  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ 
      error: 'Failed to send email',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
