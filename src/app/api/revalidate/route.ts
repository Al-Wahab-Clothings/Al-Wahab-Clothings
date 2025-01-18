import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { slug } = req.body as { slug?: string }; // Ensure slug is typed as optional string

      // Revalidate specific page or entire site
      if (slug) {
        await res.revalidate(`/product/${slug}`);
      } else {
        await res.revalidate('/'); // Revalidate homepage or any other route
      }

      return res.status(200).json({ revalidated: true });
    } catch (err) {
      console.error('Error revalidating:', err);
      return res.status(500).json({ error: 'Error revalidating' });
    }
  }

  // Return method not allowed for other HTTP methods
  return res.status(405).json({ error: 'Method Not Allowed' });
}