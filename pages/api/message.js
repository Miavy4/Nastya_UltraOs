export default function handler(req, res) {
    if (req.method === 'POST') {
        const { message } = req.body;
        // Здесь можно добавить логику для работы с сообщением
        res.status(200).json({ response: `Вы сказали: ${message}` });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method Not Allowed`);
    }
}
