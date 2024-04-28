import { addKeyword, EVENTS } from "@builderbot/bot";

export const cancelappointmentFlow = addKeyword(['CANCELAR', 'CANCELAR CITA'])    
    .addAnswer(
        'Por favor indicame tu nombre completo 🙌',
        {
            capture: true,
        },
        async (ctx, { state }) => {
            await state.update({ name: ctx.body })
        }
    )
    .addAction(async (ctx, { state, flowDynamic }) => {
            const myState = state.getMyState()
            await flowDynamic([{ 
                body: `Muchas gracias por avisar, ${myState.name} 🙌. Tu cita ha sido cancelada ❌. Si deseas reprogramarla, por favor házmelo saber 😃.`,
                delay: 2000 
            }])
            return
         
    })