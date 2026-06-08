export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const data = await request.formData();
    const name = data.get('name') || '';
    const email = data.get('email') || '';
    const company = data.get('company') || '';
    const phone = data.get('phone') || '';
    const interest = data.get('interest') || '';
    const message = data.get('message') || '';
    const marketing_consent = data.get('marketing_consent') || 'no';

    if (!name || !email || !message) {
      return new Response(null, {
        status: 302,
        headers: { 'Location': '/contact-us?error=missing-fields' }
      });
    }

    const subject = `Contact Form: ${name} (${company || 'No company'})`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company}`,
      `Phone: ${phone}`,
      `Interest: ${interest}`,
      `Marketing Consent: ${marketing_consent}`,
      '',
      'Message:',
      message
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
    await send(`Subject: ${subject}\r\nFrom: ${env.SMTP_USER}\r\nTo: ${env.SMTP_TO}\r\nReply-To: ${email}\r\n\r\n${body}\r\n.`);
    await send(`QUIT`);
    await writer.close();

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
