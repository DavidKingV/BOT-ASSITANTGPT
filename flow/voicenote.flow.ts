import "dotenv/config"

import { addKeyword, EVENTS } from '@builderbot/bot'
import { handlerAI } from '../src/utils'
import { toAsk } from "@builderbot-plugins/openai-assistants"
import { textToVoice } from "../services/elevenlabs";

const ASSISTANT_ID = process.env?.ASSISTANT_ID ?? ''

export const flowVoiceNote = addKeyword(EVENTS.VOICE_NOTE).addAction(
    async (ctx, {flowDynamic, state, provider}) => {
    await flowDynamic("¡Dame un momento, para escucharte! 🎙️");
    const text = await handlerAI(ctx);
    console.log(text);
    /*const response = await toAsk(ASSISTANT_ID, text, ctxFn.state);
    await ctxFn.flowDynamic([{ body: response }]);*/
    await provider.vendor.sendPresenceUpdate('recording', ctx.key.remoteJid)
    const response = await toAsk(ASSISTANT_ID, text, state);
    const path = await textToVoice(response);
    await flowDynamic([{ body: "escucha", media: path }]);
    }
);