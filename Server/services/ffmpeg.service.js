const multer = require("multer");
const ffmpeg = require("fluent-ffmpeg");
var fs = require("fs");
const path = require("path");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
ffmpeg.setFfmpegPath(ffmpegPath);

const _dirFiles = path.join(__dirname, "..", "/public/files");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, _dirFiles);
  },

  filename: async function (req, file, cb) {
    const mimeType = file.mimetype.split("/");
    const fileType = mimeType[1];
    const name = file.originalname;

    let id = name.split(".")[0];

    const type = name.split(".")[1];

    cb(null, name);

    if (!fs.existsSync(_dirFiles + `/${id}`) && type == "mp3") {
      fs.mkdirSync(_dirFiles + `/${id}`, { recursive: true });
      await cutAudioFile(name, id);
    }
  },
});

var upload = multer({ storage: storage }).array("files", 2);

function cutAudioFile(name, id) {
  return new Promise((resolve, rejects) => {
    const infs = new ffmpeg();
    infs
      .addInput(_dirFiles + "/" + name)
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
        `-hls_segment_filename ${_dirFiles}/${id}/${id}%03d.ts`,
        "-hls_playlist_type vod",
        "-f hls",
      ])
      .output(`${_dirFiles}/${id}/${id}.m3u8`)
      .on("start", function (commandLine) {
        // console.log("Spawned Ffmpeg with command: " + commandLine);
      })
      .on("error", function (err, stdout, stderr) {
        // console.log("An error occurred: " + err.message, err, stderr);
      })
      .on("progress", function (progress) {
        // console.log("Processing: " + progress.percent + "% done");
      })
      .on("end", function (err, stdout, stderr) {
        console.log("Finished processing!" /*, err, stdout, stderr*/);
        resolve(true);
      })
      .run();
  });
}

module.exports = upload;
