export default function handler(req, res) {
    if (req.method === 'GET') {
        const initialMessage = "Привет! Я Настя, как я могу помочь?";
        res.status(200).json({ message: initialMessage });
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method Not Allowed`);
    }
}
