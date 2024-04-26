import { addKeyword, EVENTS } from "@builderbot/bot";
import { numberClean } from "../src/utils/presence";
import { enviarMensajeFacebook } from "../src/utils/alertaagent";
import { toAsk, httpInject } from "@builderbot-plugins/openai-assistants"

export const cancelappointmentFlow = addKeyword(['CANCELAR', 'CANCELAR CITA'])    
    .addAnswer(
        'Por favor indicame tu nombre completo 🙌',
        {
            capture: true,
        },
        async (ctx, { flowDynamic, state }) => {
            await state.update({ name: ctx.body })
        }
    )
    .addAction(async (ctx, { state, flowDynamic }) => {
            const myState = state.getMyState()
            await flowDynamic(`Muchas gracias por avisar, ${myState.name} 🙌. Tu cita ha sido cancelada ❌. Si deseas reprogramarla, por favor házmelo saber 😃.`)
            return
         
    })