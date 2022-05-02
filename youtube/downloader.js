const fs = require("fs");
const Innertube = require("youtubei.js");

async function start() {
  const youtube = await new Innertube();

  const search = await youtube.search(
    "5 Minutes to Relax: Rain | Soothing Rain Sounds for Sleep, Relaxation, Meditation, Calm Down"
  );

  const stream = youtube.download(search.videos[0].id, {
    format: "mp4", // Optional, defaults to mp4 and I recommend to leave it as it is unless you know what you're doing
    quality: "360p", // if a video doesn't have a specific quality it'll fall back to 360p, also ignored when type is set to audio
    type: "videoandaudio", // can be “video”, “audio” and “videoandaudio”
  });

  stream.pipe(fs.createWriteStream(`./${search.videos[0].title}.mp4`));

  stream.on("start", () => {
    console.info("[DOWNLOADER]", "Starting download now!");
  });

  stream.on("info", (info) => {
    // { video_details: {..}, selected_format: {..}, formats: {..} }
    console.info(
      "[DOWNLOADER]",
      `Downloading ${info.video_details.title} by ${info.video_details.metadata.channel_name}`
    );
  });

  stream.on("progress", (info) => {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(
      `[DOWNLOADER] Downloaded ${info.percentage}% (${info.downloaded_size}MB) of ${info.size}MB`
    );
  });

  stream.on("end", () => {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    console.info("[DOWNLOADER]", "Done!");
  });

  stream.on("error", (err) => console.error("[ERROR]", err));
}

start();
