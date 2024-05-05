import { addKeyword, EVENTS } from "@builderbot/bot";
import { enqueueMessage } from '../src/utils/fast-entires';
import { idleFlow, reset, start, stop, } from '../src/utils/idle-custom'

export const questionFlow = addKeyword("test")
    .addAction(async (ctx, { gotoFlow }) => start(ctx, gotoFlow, 10000))
    .addAnswer(
        [
            "This is a test of the Home idle, if you do not respond within 10 seconds I will end the flow.",
            "Give me your name",
        ],
        { capture: true },
        async (ctx, { gotoFlow, state }) => {
            reset(ctx, gotoFlow, 10000);
            await state.update({ name: ctx.body });
        }
    )
    .addAnswer(
        "Give me your last name",
        { capture: true },
        async (ctx, { gotoFlow, state }) => {
            reset(ctx, gotoFlow, 10000);
            await state.update({ lastName: ctx.body });
        }
    )
    .addAnswer("Finally, answer this simple question by typing the number between [1, 2].",
        { capture: true },
        async (ctx, { gotoFlow, endFlow, fallBack }) => {
            reset(ctx, gotoFlow, 10000);
            switch (ctx.body) {
                case "1":
                    stop(ctx);
                    return endFlow(`Nice 1`);
                case "2":
                    stop(ctx);
                    return endFlow(`Ok 2`);
                default:
                    return fallBack(`I only accept *numbers* that are between [1, 2].`);
            }
        }
    );

    
