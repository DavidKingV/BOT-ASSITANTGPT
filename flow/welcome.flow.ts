import "dotenv/config"

import { toAsk } from "@builderbot-plugins/openai-assistants"
import { addKeyword, EVENTS } from '@builderbot/bot'
import { typing } from "../src/utils/presence";

const ASSISTANT_ID = process.env?.ASSISTANT_ID ?? ''

export const welcomeFlow = addKeyword(EVENTS.WELCOME)
    .addAction(async (ctx, { flowDynamic, state, provider }) => {
        console.log(ctx.from)
        await typing(ctx, provider)
        const response = await toAsk(ASSISTANT_ID, ctx.body, state)
        const chunks = response.split(/(?<!\d)\.\s+/g);
        for (const chunk of chunks) {
            await flowDynamic([{ body: chunk.trim() }]);
        }
    })