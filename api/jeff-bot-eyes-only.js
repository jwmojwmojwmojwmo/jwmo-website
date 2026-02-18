export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const password = process.env.TOPGG_AUTH;
    const discord_url = process.env.DISCORD_WEBHOOK_URL;

    // if (password != req.headers.authorization) {

    // }
    console.log(req.headers, req.body);
    if (req.body.type === 'vote.create') {
        await fetch(discord_url, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                content: `TECHNO: ${req.body.data.user.platform_id}; UNBELIEVABLE: ${req.body.data.user.name};`
            })
        });
    }

    return res.status(200).json({ success: true });
    //hi jeff have you eaten
    //have some cheese <>
}   