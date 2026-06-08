export async function onRequestPost(context) {
  const { request } = context;

  try {
    const data = await request.formData();
    const submission = {
      name: data.get('name') || '',
      email: data.get('email') || '',
      company: data.get('company') || '',
      phone: data.get('phone') || '',
      interest: data.get('interest') || '',
      message: data.get('message') || '',
      marketing_consent: data.get('marketing_consent') || 'no',
      submitted_at: new Date().toISOString(),
    };

    // Basic validation
    if (!submission.name || !submission.email || !submission.message) {
      return new Response(null, {
        status: 302,
        headers: { 'Location': '/contact-us?error=missing-fields' }
      });
    }

    // Log submission (replace with email/KV/storage as needed)
    console.log('Contact form submission:', JSON.stringify(submission));

    // TODO: Wire up email delivery via SendGrid, Mailgun, or Fastmail SMTP
    // using env.SENDGRID_API_KEY or env.SMTP_*. See README.md for setup.

    return new Response(null, {
      status: 302,
      headers: { 'Location': '/contact-us?success=1' }
    });
  } catch (err) {
    console.error('Contact form error:', err);
    return new Response(null, {
      status: 302,
      headers: { 'Location': '/contact-us?error=server' }
    });
  }
}

export async function onRequestGet() {
  return new Response(null, {
    status: 302,
    headers: { 'Location': '/contact-us' }
  });
}