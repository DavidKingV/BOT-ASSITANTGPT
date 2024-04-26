import * as https from 'https';

export function enviarMensajeFacebook(ctx: any) {
    const url = 'https://graph.facebook.com/v19.0/103246079200463/messages';

    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": "525532176490",
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
            'Authorization': 'Bearer EAALpzKqlqWYBAOnZCupNT0OlTlIZBaTvcIumax5jDnWpa35bfkn2EKIoqLjO6aaeEOT0nhgaVUZBOlcnSiuiVV8x9hA5u1ATVPoplbOlCAaNNwDZCSMqigDTxmpTXJnaGEiE03QRv3E0ZBKgBuRkeBFbFRTFy8YtYQBr8ZByZBB8btcro4QmInhhmzVAIVFiKtZBLxIhzSFhNgZDZD',
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
