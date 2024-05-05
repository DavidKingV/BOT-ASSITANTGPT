// whisper.js
import "dotenv/config"
import { OpenAI } from 'openai';
import fs from "fs"; // Add the missing import statement for the fs module


/**
 *
 * @param {*} path url mp3
 */
const voiceToText = async (path) => {
    if (!fs.existsSync(path)) {
      throw new Error("No se encuentra el archivo");
    }
  
    try {
      const configuration = {
        apiKey: process.env.OPENAI_API_KEY,
    }
      const openai = new OpenAI(configuration);
      const resp = await openai.audio.transcriptions.create({ 
        file: fs.createReadStream(path),
        model:"whisper-1"
      });
  
      return resp.text;
    } catch (err) {
      console.log(err)
      return "ERROR";
    }
  };
  
  export { voiceToText };