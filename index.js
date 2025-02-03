import Logger from "./logger/logger.js";
import levels from "./logger/levels.js";
import EventEmitter from "./emitter.js";

const logger = new Logger();
const emitter = new EventEmitter();

process.on("uncaughtException", err => {
  console.log("uncaughted Exception", err.message);

  process.exit(1);
});

process.on("unhandledRejection", err => {
  console.log("unhandled Rejection", err.message);

  process.exit(1);
});

emitter.on(levels.INFO, msg => {
  process.nextTick(() => {
    logger.info(msg);
  });
});

emitter.on(levels.WARNING, msg => {
  process.nextTick(() => {
    logger.warning(msg);
  });
});

emitter.on(levels.ERROR, msg => {
  process.nextTick(() => {
    logger.error(msg);
  });
});

emitter.emit(levels.INFO, "Info message");
emitter.emit(levels.WARNING, "Warning message");
emitter.emit(levels.ERROR, "Error message");

// const buffer = Buffer.from("Hello World")
// const base64 = buffer.toString('base64')

// const decode = Buffer.from(base64, 'base64')
// console.log(decode.toString('utf8'))
// console.log(decode.toString('hex'))
// console.log(decode.toString(''))
// console.log(buffer)

// const buffer = Buffer.alloc(8)

// buffer.write("Hello")
// console.log(buffer.toString('utf8'))
