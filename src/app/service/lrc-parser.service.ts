import { Injectable } from "@angular/core";

@Injectable()
export class LrcParserService {
  private _regAr = /\[ar:(.+)\]/;
  private _regTi = /\[ti:(.+)\]/;
  private _regAl = /\[al:(.+)\]/;
  private _regBy = /\[by:(.+)\]/;
  private _regOffset = /\[offset:.+\]/;
  private _regTime = /\[\d+:\d+(\.\d+)?\]/g;
  parse(lrcText: string) {
    let author = this._regAr
      .exec(lrcText)[0]
      .replace("[ar:", "")
      .replace("]", "");
    let title = this._regTi
      .exec(lrcText)[0]
      .replace("[ti:", "")
      .replace("]", "");
    let alia = this._regAl
      .exec(lrcText)[0]
      .replace("[al", "")
      .replace("]", "");
    let by = this._regBy.exec(lrcText)[0]
      ? this._regBy
          .exec(lrcText)[0]
          .replace("[by", "")
          .replace("]", "")
      : "";
    let offset = this._regOffset.exec(lrcText)
      ? this._regOffset
          .exec(lrcText)[0]
          .replace("[offset:", "")
          .replace("]", "")
      : "";
    let times = this._regTime.exec(lrcText)[0];
    let timesArr = lrcText.substring(lrcText.indexOf(times) - 1);
    let data = timesArr.split("\n").map(seg => {
      console.log(seg);
      let time = /\[\d+:\d+(\.\d+)?\]/.exec(seg)
        ? /\[\d+:\d+(\.\d+)?\]/
            .exec(seg)[0]
            .replace("[", "")
            .replace("]", "")
        : "";
      let minSeconds = time.split(":");
      let min = minSeconds[0];
      let second = minSeconds[1];
      let dt = new Date(
        <any>parseInt(min) * 60 * 1000 + parseFloat(second) * 1000
      );
      let content = seg.replace(this._regTime, "");
      return { dt, content, active: false };
    });
    data.shift();

    return {
      author,
      title,
      alia,
      by,
      offset,
      data
    };
  }
  sleep(time: number) {
    return new Promise(resolve => setTimeout(() => resolve(time), time));
  }
  constructor() {}
}
