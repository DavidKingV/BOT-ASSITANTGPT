import { addKeyword, EVENTS } from "@builderbot/bot";
import { numberClean } from "../src/utils/presence";
import { enviarMensajeFacebook } from "../src/utils/alertaagent";
import { connection } from '../src/mysql-database';
import { enqueueMessage } from '../src/utils/fast-entires';

async function saveAppointmentToDatabase(phone: string, name: string, date: string): Promise<void> {
    const query = `INSERT INTO survey (phone, name, date) VALUES (?, ?, ?)`;
    try {
        const [result] = await connection.query(query, [phone, name, date]);
        console.log('Appointment saved successfully:', result);
    } catch (error) {
        console.error('Error saving appointment:', error);
    }
}

export const appointmentFlow = addKeyword(['AGENDAR', 'AGENDAR CITA'])    
    .addAnswer(
        'Por favor indicame tu nombre completo 🙌',
        { capture: true, }, async (ctx, { state }) => { await state.update({ name: ctx.body })}
    )
    .addAnswer(
        'Por favor idicame la fecha y hora de tu cita 📅',
        { capture: true, }, async (ctx, { state }) => { await state.update({ date: ctx.body })
            const myState = state.getMyState()
            await saveAppointmentToDatabase(ctx.from, myState.name, myState.date);
        }
    )
    .addAction(async (ctx, { blacklist, flowDynamic, state }) => {
        const myState = state.getMyState()
        const toMute = numberClean(`Mute +${ctx.from}`) //Mute +34000000 message incoming
        const check = blacklist.checkIf(toMute)            
        if (!check) {
            blacklist.add(toMute)
            await flowDynamic([{ 
                body: `Gracias, ${myState.name} 🙌`,
                delay: 2000 
            }])
            await flowDynamic([{ 
                body: `Un agente humano confirmará tu cita en breve 🕒`,
                delay: 2000 
            }])

            enviarMensajeFacebook(ctx)
            return
        }
        blacklist.remove(toMute)
        await flowDynamic(`¿Dime como puedo ayudarte? 🤔`)
        return  
    })
    

    
