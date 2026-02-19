import crypto from 'crypto';

export const config = {
    api: {
        bodyParser: false,
    },
};

async function getRawBody(req) {
    const chunks = [];
    for await (const chunk of req) {
        chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
    }
    return Buffer.concat(chunks).toString('utf8');
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const password = process.env.TOPGG_AUTH;
    const discord_url = process.env.DISCORD_WEBHOOK_URL;
    let rawBody;

    try {
        console.log(req);
        rawBody = await getRawBody(req);
        const signatureHeader = req.headers['x-topgg-signature'];
        let timestamp, signature;
        signatureHeader.split(',').forEach(part => {
            if (part.startsWith('t=')) timestamp = part.substring(2);
            if (part.startsWith('v1=')) signature = part.substring(3);
        });
        const message = `${timestamp}.${rawBody}`;
        const expectedSignature = crypto.createHmac('sha256', password).update(message).digest('hex');

        if (signature !== expectedSignature) {
            console.error('Webhook signature verification failed');
            return res.status(401).json({ error: 'Invalid signature' });
        }
        console.log("Webhook verification success!")
    } catch (err) {
        return res.status(400);
    }
    const body = JSON.parse(rawBody);

    console.log(body);

    if (body.type === 'vote.create') {
        await fetch(discord_url, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                content: `TECHNO: ${body.data.user.platform_id}; UNBELIEVABLE: ${body.data.user.name};` //for logs
            })
        });
    }

    return res.status(200).json({ success: true });
}   