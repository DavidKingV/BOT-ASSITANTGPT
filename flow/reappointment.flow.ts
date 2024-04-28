import { addKeyword, EVENTS } from "@builderbot/bot";
import { numberClean } from "../src/utils/presence";
import { enviarMensajeFacebook } from "../src/utils/alertaagent";

export const reappointmentFlow = addKeyword(['REAGENDAR', 'REAGENDAR CITA'])    
    .addAnswer(
        'Por favor indicame tu nombre completo 🙌',
        {
            capture: true,
        },
        async (ctx, { flowDynamic, state }) => {
            await state.update({ name: ctx.body })
        }
    )
    .addAnswer(
        'Por favor idicame la fecha y hora en la que desea reagendar su cita 📅',
        {
            capture: true,
        },
        async (ctx, { flowDynamic, state }) => {
            await state.update({ date: ctx.body })
            const myState = state.getMyState()
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