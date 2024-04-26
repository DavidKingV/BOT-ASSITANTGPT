import { addKeyword, EVENTS } from "@builderbot/bot";
import { numberClean } from "../src/utils/presence";
import { enviarMensajeFacebook } from "../src/utils/alertaagent";
import { toAsk, httpInject } from "@builderbot-plugins/openai-assistants"

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
            await flowDynamic(`Gracias, ${myState.name} 🙌`)
        }
    )
    .addAction(async (ctx, { blacklist, flowDynamic }) => {
        
            console.log(ctx.from)
            const toMute = numberClean(`Mute +${ctx.from}`) //Mute +34000000 message incoming
            const check = blacklist.checkIf(toMute)
            if (!check) {
                blacklist.add(toMute)
                await flowDynamic(`Un agente confirmará tu cita en breve 🕒`)

                enviarMensajeFacebook(ctx)
                return
            }
            blacklist.remove(toMute)
            await flowDynamic(`¿Dime como puedo ayudarte? 🤔`)
            return
         
    })