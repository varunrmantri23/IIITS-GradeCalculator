export default async function handler(req, res) {
    const HF_TOKEN = process.env.HF_TOKEN; // Access env securely

    if (!HF_TOKEN) {
        return res.status(500).json({ error: "Server misconfigured" });
    }

    const { mode, record, stats } = req.body;

    const API_URL = `https://api-inference.huggingface.co/models/${process.env.MODEL_NAME}`;

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${HF_TOKEN}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                inputs: PROMPTS[mode](record, stats),
                parameters: {
                    max_new_tokens: 1024,
                    temperature: 0.9,
                    return_full_text: false,
                },
            }),
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error("API Error:", error);
        res.status(500).json({ error: "Server error" });
    }
}
