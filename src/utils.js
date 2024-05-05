import { downloadMediaMessage } from "@adiwajshing/baileys";

import fs from 'node:fs/promises';
import { convertOggMp3 } from '../services/convert';
import { voiceToText } from '../services/whisper';

const handlerAI = async (ctx) => {
    /**
     * se requiere agregar una carpeta llamada voice en la raiz del proyecto
     */
    const buffer = await downloadMediaMessage(ctx, "buffer");
    const pathTmpOgg = `${process.cwd()}/voice/voice-note-${Date.now()}.ogg`;
    const pathTmpMp3 = `${process.cwd()}/voice/voice-note-${Date.now()}.mp3`;
    await fs.writeFile(pathTmpOgg, buffer);
    await convertOggMp3(pathTmpOgg, pathTmpMp3);
    const text = await voiceToText(pathTmpMp3);
    return text; //el habla1!!
    /**
     * OMITIR
     */
};

export { handlerAI };