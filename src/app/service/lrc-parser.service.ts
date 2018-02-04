import { Injectable } from '@angular/core';

@Injectable()
export class LrcParserService {
  private _regAr = /\[ar:(.+)\]/;
  private _regTi = /\[ti:(.+)\]/;
  private _regAl = /\[al:(.+)\]/;
  private _regBy = /\[by:(.+)\]/;
  private _regOffset = /\[offset:.+\]/;
  private _regTime = /\[\d+:\d+(\.\d+)?\]/g;
  constructor() { }

}
