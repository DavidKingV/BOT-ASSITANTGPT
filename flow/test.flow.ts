import { addKeyword, EVENTS } from "@builderbot/bot";
import { enqueueMessage } from '../src/utils/fast-entires';

export const testFlow = addKeyword(['test', 'testing'])
.addAction(async (_, { flowDynamic }) => {
          return flowDynamic('Hi! how can I help you?');
      })
      .addAction({ capture: true }, async (ctx, { flowDynamic, state }) => {
        console.log('ctx.body', ctx.message.conversation)
            const body = await enqueueMessage(ctx.message.conversation)
          await state.update({ name: body})
          return flowDynamic(`The user said: ${ctx.body}`);
      })

    
