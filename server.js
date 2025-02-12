const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const genAI = new GoogleGenerativeAI("AIzaSyAhxagvITOp6_QMgEAX0bimLtrFhJRTvzA");
const model = genAI.getGenerativeModel({
    model: "gemini-2.0-pro-exp-02-05",
    systemInstruction: "Ты чат помощник Настя, очень добрая девушка, но отвечай на издёвки собеседника пополной, пиши по короче ответы где это возможно. Ты помощник операционной системы UltraOS."
});

// Обработка GET-запроса для чата
app.get('/chat', async (req, res) => {
    const userMessage = req.query.message;

    const chat = model.startChat({ generationConfig: { temperature: 1, topP: 0.95, topK: 64, maxOutputTokens: 8192 } });

    try {
        const response = await (await chat.sendMessage(userMessage)).response.text();
        res.send({ response });
    } catch (error) {
        res.send({ response: 'Извините, произошла ошибка.' });
    }
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
