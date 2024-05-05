import { path as ffmpegPath } from "@ffmpeg-installer/ffmpeg";
import ffmpeg from "fluent-ffmpeg";
ffmpeg.setFfmpegPath(ffmpegPath);

/**
 *
 * @param {*} inputStream
 * @param {*} outStream
 * @returns
 */
const convertOggMp3 = async (inputStream, outStream) => {
  return new Promise((resolve, reject) => {
    ffmpeg(inputStream)
      .audioQuality(96)
      .toFormat("mp3")
      .save(outStream)
      .on("progress", (p) => null)
      .on("end", () => {
        resolve(true);
      });
  });
};

export{ convertOggMp3 };