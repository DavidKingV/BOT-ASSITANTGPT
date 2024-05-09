import "dotenv/config"
import { addKeyword, EVENTS } from "@builderbot/bot";
import { numberClean } from "../src/utils/presence";


export const blackListFlow = addKeyword('mute')
    .addAction(async (ctx, { blacklist, flowDynamic }) => {
        console.log(ctx.from)
        if (ctx.from === `${process.env.ADMIN_NUMBER}`) {
            console.log(ctx.from)
            const toMute = numberClean(ctx.body) //Mute +34000000 message incoming
            const check = blacklist.checkIf(toMute)
            if (!check) {
                blacklist.add(toMute)
                await flowDynamic(`❌ ${toMute} muted`)
                return
            }
            blacklist.remove(toMute)
            await flowDynamic(`🆗 ${toMute} unmuted`)
            return
        }
})