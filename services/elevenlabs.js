import fs from "fs";
import "dotenv/config"
/**
 *
 * @param {*} voiceId clone voice hRRRsrMZ83zHZhv1EGYS
 * @returns
 */
const textToVoice = async (text,voiceId = process.env.ELEVEN_LABS_VOICE_ID) => {
  const EVENT_TOKEN = process.env.EVENT_TOKEN ?? "";
  const URL = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;

  const header = new Headers();
  header.append("accept", "audio/mpeg");
  header.append("xi-api-key", process.env.ELEVEN_LABS_API_KEY);
  header.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    text,
    model_id: "eleven_multilingual_v1",
    voice_settings: {
      stability: 1,
      similarity_boost: 0.8,
    },
  });

  const requestOptions = {
    method: "POST",
    headers: header,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(URL, requestOptions);
  const buffer = await response.arrayBuffer();
  const pathFile = `${process.cwd()}/tmp/${Date.now()}-auido.mp3`;
  fs.writeFileSync(pathFile, Buffer.from(buffer));
  
  return pathFile;
};

export{ textToVoice };