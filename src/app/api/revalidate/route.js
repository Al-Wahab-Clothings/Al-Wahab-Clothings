export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const secret = req.query.secret;

            // Verify secret token
            if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
                return res.status(401).json({ message: 'Invalid token' });
            }

            const { _type, slug } = req.body;

            // Revalidate specific pages
            if (_type === 'product' && slug) {
                await res.revalidate(`/product/${slug.current}`);
            } else {
                await res.revalidate('/'); // Revalidate the homepage or other pages
            }

            return res.json({ revalidated: true });
        } catch (err) {
            return res.status(500).json({ error: 'Failed to revalidate' });
        }
    }
    return res.status(405).json({ message: 'Method not allowed' });
}  