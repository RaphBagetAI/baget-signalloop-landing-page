import type { NextApiRequest, NextApiResponse } from 'next';

const founderEmail = 'raphael@baget.ai';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  try {
    const { name, email, company, role, useCase } = req.body;

    if (!name || !email || !company || !role || !useCase) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Send email to founder (raphael@baget.ai) with demo request info
    // For prototype, we mock email sending by logging or would use a service like SendGrid, Mailgun, or nodemailer.
    // Here, we just log and respond success.

    console.log('Demo request received:', { name, email, company, role, useCase });

    // In real deployment, integrate email service or save to a CRM here

    res.status(200).json({ message: 'Demo request submitted successfully' });
  } catch (error) {
    console.error('Error processing demo request:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
