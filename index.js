import fs from "node:fs";
import { pipeline, Readable } from "node:stream";
import path from "node:path";

import { LogFormatTransformStream } from "./logger/log-format-stream.js";
import EventEmitter from "./emitter.js";
import levels from "./logger/levels.js";

const logPath = "logs/app.log";
if (!fs.existsSync(path.dirname(logPath))) {
  fs.mkdirSync(path.dirname(logPath), {
    recursive: true,
  });
}

const emitter = new EventEmitter();
const readStream = new Readable({ read() {} });
const writeStream = fs.createWriteStream(logPath);
const transformStream = new LogFormatTransformStream();

pipeline(readStream, transformStream, writeStream, err => {
  console.log(err);
});

emitter.on(levels.INFO, msg => {
  readStream.push(JSON.stringify({ type: levels.INFO, message: msg }));
});

emitter.on(levels.WARNING, msg => {
  readStream.push(JSON.stringify({ type: levels.WARNING, message: msg }));
});

emitter.on(levels.ERROR, msg => {
  readStream.push(JSON.stringify({ type: levels.ERROR, message: msg }));
});

emitter.emit(levels.INFO, "Info message");
emitter.emit(levels.WARNING, "Warning message");
emitter.emit(levels.ERROR, "Error message");
