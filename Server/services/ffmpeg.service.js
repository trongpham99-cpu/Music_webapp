const multer = require("multer");
const ffmpeg = require("fluent-ffmpeg");
var fs = require("fs");
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
ffmpeg.setFfmpegPath(ffmpegPath);

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/audios");
  },

  filename: async function (req, file, cb) {
    const mimeType = file.mimetype.split("/");
    const fileType = mimeType[1];
    const fileName = file.originalname + "." + fileType;
    const name = file.originalname;
    cb(null, name);
    let id = name.split(".")[0];

    const dir = `public/audios/${id}`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    await cutAudio(name, id)

  },
});

function cutAudio(name, id) {
  return new Promise((resolve, rejects) => {
    const infs = new ffmpeg();
    infs
      .addInput(`public/audios/${name}`)
      .outputOptions([
        "-profile:v main",
        "-ar 48000",
        "-b:a 128k",
        "-keyint_min 48",
        "-sc_threshold 0",
        "-b:v 2800k",
        "-maxrate 2996k",
        "-bufsize 4200k",
        "-hls_time 10",
        `-hls_segment_filename public/audios/${id}/${id}%03d.ts`,
        "-hls_playlist_type vod",
        "-f hls",
      ])
      .output(`public/audios/${id}/${id}.m3u8`)
      .on("start", function (commandLine) {
        console.log("Spawned Ffmpeg with command: " + commandLine);
      })
      .on("error", function (err, stdout, stderr) {
        console.log('An error occurred: ' + err.message, err, stderr);
      })
      .on("progress", function (progress) {
        console.log('Processing: ' + progress.percent + '% done')
      })
      .on("end", function (err, stdout, stderr) {
        console.log("Finished processing!" /*, err, stdout, stderr*/);
        resolve(true);
      })
      .run();
  });
}

var upload = multer({ storage: storage }).single("track");

module.exports = upload;
