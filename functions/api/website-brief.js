export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const data = await request.formData();
    const first = data.get('first_name') || '';
    const last = data.get('last_name') || '';
    const email = data.get('email') || '';
    const business = data.get('business_name') || '';
    const has_branding = data.get('has_branding') || '';
    const target = data.get('target_audience') || '';
    const needs = data.get('specific_needs') || '';
    const assets = data.get('assets');
    const content_dev = data.get('content_development') || '';
    const style_ideas = data.get('style_ideas') || '';
    const pages_needed = data.get('pages_needed') || '';
    const website_1 = data.get('website_1') || '';
    const website_1_notes = data.get('website_1_notes') || '';
    const website_2 = data.get('website_2') || '';
    const website_2_notes = data.get('website_2_notes') || '';

    const subject = `Website Brief: ${first} ${last} (${business})`;
    const body = [
      `Name: ${first} ${last}`,
      `Email: ${email}`,
      `Business: ${business}`,
      `Has Branding: ${has_branding}`,
      '',
      'Target Audience:',
      target,
      '',
      'Specific Needs:',
      needs,
      '',
      'Attached Assets:',
      assets ? assets.name : 'None',
      '',
      'Content Development:',
      content_dev,
      '',
      'Style Ideas:',
      style_ideas,
      '',
      'Pages Needed:',
      pages_needed,
      '',
      'Website Reference #1:',
      website_1,
      website_1_notes,
      '',
      'Website Reference #2:',
      website_2,
      website_2_notes
    ].join('\r\n');

    const { connect } = await import('cloudflare:sockets');
    const socket = connect({
      hostname: env.SMTP_HOST || 'smtp.fastmail.com',
      port: parseInt(env.SMTP_PORT || '465'),
      secureTransport: 'on'
    });
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

    return new Response(null, { status: 302, headers: { 'Location': '/website-brief?success=1' } });
  } catch (err) {
    console.error('Website brief error:', err);
    return new Response(null, { status: 302, headers: { 'Location': '/website-brief?error=1' } });
  }
}
