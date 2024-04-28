import { addKeyword, EVENTS } from "@builderbot/bot";
import { numberClean } from "../src/utils/presence";
import { enviarMensajeFacebook } from "../src/utils/alertaagent";

export const agentFlow = addKeyword(['AGENTE', 'AGENTE HUMANO'])    
    .addAnswer(
        'Con gusto te transferiré con un agente humano 👨‍💼',
    )
    .addAnswer(
        'Por favor indicame tu nombre completo 🙌',
        {
            capture: true,
        },
        async (ctx, { state }) => {
            await state.update({ name: ctx.body })
        }
    )
    .addAnswer(
        'Ahora indicame sobre que tema deseas hablar con el agente humano 👨‍💼',
        {
            capture: true,
        },
        async (ctx, { state }) => {
            await state.update({ case: ctx.body })
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
                body: `Un agente humano te contactará en breve 🕒`,
                delay: 2000 
            }])
            enviarMensajeFacebook(ctx)
            return
        }
        blacklist.remove(toMute)
        await flowDynamic(`¿Dime como puedo ayudarte? 🤔`)
        return  
    })