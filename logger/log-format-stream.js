import { Transform } from "node:stream";
import formatMessage from "./formatter.js";

export class LogFormatTransformStream extends Transform {
  constructor() {
    super();
  }

  _transform(ch, encoding, callback) {
    const data = JSON.parse(ch);
    const formattedMessage = formatMessage(data?.type, data?.message);

    this.push(`${formattedMessage}\n`);
    callback();
  }
}
