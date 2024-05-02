import "dotenv/config"
//import { adapterDB } from '../src/utils/mysql-database';
import { MemoryDB as Database } from '@builderbot/bot' //memoryDB
import { createBot, createProvider } from '@builderbot/bot'
import { flow } from '../flow'
import { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import { httpInject } from "@builderbot-plugins/openai-assistants"

const PORT = process.env?.PORT ?? 3008

const main = async () => {
    const adapterFlow = flow
    const adapterProvider = createProvider(Provider)
    const adapterDB = new Database()

    const { httpServer } = await createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    httpInject(adapterProvider.server)
    httpServer(+PORT)
}

main() 