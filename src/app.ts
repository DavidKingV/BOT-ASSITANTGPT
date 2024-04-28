import "dotenv/config"
import { IDatabase, adapterDB } from './mysql-database';
import { createBot, createProvider, createFlow, addKeyword, EVENTS } from '@builderbot/bot'
import { flow } from '../flow'
//import { MemoryDB as Database } from '@builderbot/bot'
import { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import { httpInject } from "@builderbot-plugins/openai-assistants"

const PORT = process.env?.PORT ?? 3008

const main = async () => {
    const adapterFlow = flow
    const adapterProvider = createProvider(Provider)

    const { httpServer } = await createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    httpInject(adapterProvider.server)
    httpServer(+PORT)
}

main() 