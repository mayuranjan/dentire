import { Transform, TransformCallback } from 'stream';

export class FilterStream extends Transform {
  leftOver = "";
  constructor(private readonly filterFunction: (chunk: string) => boolean, options?: any) {
    super(options);
  }

  _transform(chunk: any, encoding: string, callback: TransformCallback): void {
    let chunkString = chunk.toString(); // Convert chunk to string
    if (this.leftOver !== "") {
      chunkString = "["+this.leftOver.split("{")[1] + chunkString;
      this.leftOver = "";
    }
    let arr = chunkString.split("}");
    this.leftOver = arr.pop();
    let jsonStringData = arr.join("}");
    if (this.filterFunction(jsonStringData + "}]")) {
      this.push(jsonStringData + "}]");
    }
    callback();
  }
}
