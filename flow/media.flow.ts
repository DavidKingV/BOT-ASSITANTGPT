import { addKeyword, EVENTS } from "@builderbot/bot";

export const mediaFlow = addKeyword(EVENTS.MEDIA)
    .addAnswer('Información recibida, procesando...')
    .addAction(async (ctx, { flowDynamic }) => {
        await flowDynamic([{ 
            body: 'La infromación sera revisada por un agente humano en breve 🕒',
            delay: 2000
        }])
    })

export const documentFlow = addKeyword(EVENTS.DOCUMENT)
    .addAnswer('Documento recibido, procesando...')
    .addAction(async (ctx, { flowDynamic }) => {
        await flowDynamic([{ 
            body: 'El documento sera revisado por un agente humano en breve 🕒',
            delay: 2000
        }])
    })

/*export const voiceNoteFlow = addKeyword(EVENTS.VOICE_NOTE)
    .addAnswer('Give me a second to hear you!', async (ctx, { provider }) => {
    const localPath = await provider.saveFile(ctx, {path:'...'})
    console.log(localPath)
  })*/