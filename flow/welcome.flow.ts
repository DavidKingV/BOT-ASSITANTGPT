import "dotenv/config"

import { toAsk } from "@builderbot-plugins/openai-assistants"
import { addKeyword, EVENTS } from '@builderbot/bot'
import { connection } from '../src/utils/mysql-database';
import { typing } from "../src/utils/presence";

const ASSISTANT_ID = process.env?.ASSISTANT_ID ?? ''

/*async function saveAppointmentToDatabase(phone: string, body: string, date: string): Promise<void> {
    const query = `INSERT INTO survey (phone, name, date) VALUES (?, ?, ?)`;
    try {
        const [result] = await connection.query(query, [phone, body, date]);
        console.log('Appointment saved successfully:', result);
    } catch (error) {
        console.error('Error saving appointment:', error);
    }
}*/

export const welcomeFlow = addKeyword(EVENTS.WELCOME)
    .addAction(async (ctx, { flowDynamic, state, provider }) => {
        console.log(ctx.from)
        /*saveAppointmentToDatabase(ctx.from, ctx.body, new Date().toISOString())*/
        //await typing(ctx, provider)
        await provider.vendor.sendPresenceUpdate('composing', ctx.key.remoteJid)
        const response = await toAsk(ASSISTANT_ID, ctx.body, state)
        const chunks = response.split(/(?<!\d)\.\s+/g);
        for (const chunk of chunks) {
            await flowDynamic([{ body: chunk.trim() }]);
        }
    })