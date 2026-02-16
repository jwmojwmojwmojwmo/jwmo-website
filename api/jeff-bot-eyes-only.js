export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const password = process.env.TOPGG_AUTH;

    if (!password) {
        return res.status(500).json({ error: 'Wrong password' });
    }

    const test = req.body;
    console.log(test);

    return res.status(200).json({ success: true });
}