import * as https from 'https';

export function enviarMensajeFacebook(ctx: any) {
    const url = `https://graph.facebook.com/v19.0/${process.env.PHONE_ID}/messages`;

    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": `${process.env.TO_WHATSAPP}`,
        "type": "template",
        "template": {
            "name": "bot_noti",
            "language": {
                "code": "es_MX"
            },
            "components": [
                {
                    "type": "body",
                    "parameters": [
                        {
                            "type": "text",
                            "text": `Mute +${ctx.from}`
                        }
                    ]
                }
            ]
        }
    });

    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.TOKE_WHATSAPP}`,
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    };

    const req = https.request(url, options, (res) => {
        let responseData = '';

        res.on('data', (chunk) => {
            responseData += chunk;
        });

        res.on('end', () => {
            console.log(responseData);
        });
    });

    req.on('error', (error) => {
        console.error(error);
    });

    req.write(data);
    req.end();
}
