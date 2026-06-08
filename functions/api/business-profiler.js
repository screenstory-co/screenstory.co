export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const data = await request.formData();
    const first = data.get('first_name') || '';
    const last = data.get('last_name') || '';
    const business = data.get('business_name') || '';
    const website = data.get('website') || '';
    const phone = data.get('phone') || '';
    const email = data.get('email') || '';
    const description = data.get('company_description') || '';
    const target = data.get('target_market') || '';
    const ecommerce = data.get('ecommerce') || '';
    const competitors = data.get('competitors') || '';
    const challenges = data.get('challenges') || '';
    const content_production = data.get('content_production') || '';
    const has_branding = data.get('has_branding') || '';
    const comments = data.get('comments') || '';
    const budget = data.get('budget') || '';

    const subject = `Business Profiler: ${first} ${last} (${business})`;
    const body = [
      `Name: ${first} ${last}`,
      `Business: ${business}`,
      `Website: ${website}`,
      `Phone: ${phone}`,
      `Email: ${email}`,
      '',
      'Company Description:',
      description,
      '',
      'Target Market:',
      target,
      '',
      'eCommerce:',
      ecommerce,
      '',
      'Competitors:',
      competitors,
      '',
      'Challenges:',
      challenges,
      '',
      'Content Production:',
      content_production,
      '',
      'Has Branding:',
      has_branding,
      '',
      'Other Comments:',
      comments,
      '',
      'Budget:',
      budget
    ].join('\r\n');

    const { connect } = await import('cloudflare:sockets');
    const socket = connect({ hostname: env.SMTP_HOST || 'smtp.fastmail.com', port: parseInt(env.SMTP_PORT || '465') });
    const writer = socket.writable.getWriter();
    const reader = socket.readable.getReader();

    async function readLine() {
      let line = '';
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const text = new TextDecoder().decode(value);
        line += text;
        if (line.includes('\r\n')) return line.split('\r\n')[0];
      }
      return line;
    }

    async function send(cmd) {
      await writer.write(new TextEncoder().encode(cmd + '\r\n'));
      return readLine();
    }

    await readLine();
    await send(`EHLO screenstory.co`);
    await send(`AUTH LOGIN`);
    await send(btoa(env.SMTP_USER));
    await send(btoa(env.SMTP_PASS));
    await send(`MAIL FROM:<${env.SMTP_USER}>`);
    await send(`RCPT TO:<${env.SMTP_TO}>`);
    await send(`DATA`);
    await send(`Subject: ${subject}\r\nFrom: ${env.SMTP_USER}\r\nTo: ${env.SMTP_TO}\r\n\r\n${body}\r\n.`);
    await send(`QUIT`);
    await writer.close();

    return new Response(null, { status: 302, headers: { 'Location': '/business-profiler?success=1' } });
  } catch (err) {
    console.error('Business profiler error:', err);
    return new Response(null, { status: 302, headers: { 'Location': '/business-profiler?error=1' } });
  }
}
