export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const password = process.env.TOPGG_AUTH;
    const discord_url = process.env.DISCORD_WEBHOOK_URL;

    if (!password) {
        return res.status(500).json({ error: 'Wrong password' });
    }

    const data = req.body;
    console.log(req.headers.authorization, req.body);

    await fetch(discord_url, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: "HI!"
    });

    return res.status(200).json({ success: true });
}