import {
  Component,
  OnInit,
  Input,
  ViewChild,
  AfterContentInit
} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LrcParserService } from "../../service/lrc-parser.service";

@Component({
  selector: "app-music-player",
  templateUrl: "./music-player.component.html",
  styleUrls: ["./music-player.component.css"]
})
export class MusicPlayerComponent implements OnInit, AfterContentInit {
  playingTexts: string = "";
  _volume: number = 30;
  @Input() song: { thumbUrl: string; musicUrl: string; lrcUrl: string };
  @ViewChild("audio") audio;

  get volume() {
    return this._volume;
  }
  playing: boolean = true;
  set volume(num: number) {
    // this._volume = num * 100;
    this.audioEl.volume = num / 100;
    // console.log(this._volume);

    // console.log(this.audioEl.volume);
  }
  _process: number;
  currentTime: Date;
  duration: Date;
  audioEl: HTMLAudioElement;
  timmer;
  lrcInfo: {
    author: string;
    title: string;
    alia: string;
    by: string;
    offset: string;
    data: { dt: Date; content: string; active: boolean }[];
  } = {
    author: "",
    title: "",
    alia: "",
    by: "",
    offset: "",
    data: []
  };
  stop() {
    this.playing = false;
    this.audioEl.pause();
  }
  playSong() {
    this.playing = true;
    this.audioEl.play();
  }

  get process() {
    return this._process;
  }
  set process(num: number) {
    clearInterval(this.timmer);
    this._process = num;
    // console.log(this._process);
    this.audioEl.currentTime = this.audioEl.duration * num / 100;
    // console.log(this.audioEl.currentTime);
    this.play();
  }
  constructor(public http: HttpClient, public lrc: LrcParserService) {}

  ngOnInit() {}
  ngAfterContentInit() {
    this.audioEl = this.audio.nativeElement;
    this.audioEl.volume = this.volume / 100;
  }

  async play() {
    let lrcText = await this.http
      .get(this.song.lrcUrl, { responseType: "text" })
      .toPromise();

    this.lrcInfo = this.lrc.parse(lrcText);

    // console.log(this.lrcInfo);
    // console.log("play");
    this.timmer = setInterval(() => {
      // console.log(this.audioEl.volume);
      this._process = this.audioEl.currentTime / this.audioEl.duration * 100;
      this.currentTime = new Date(this.audioEl.currentTime * 1000);
      this.duration = new Date(this.audioEl.duration * 1000);
      let data = this.lrcInfo.data.filter(item => {
        if (item.dt.getTime() < this.currentTime.getTime()) {
          // console.log(item.dt.getTime(), this.currentTime.getTime());

          return true;
        } else {
          return false;
        }
      });
      let item = data.pop();
      this.playingTexts = item ? item.content : "";
      // console.log(
      //   this.audioEl.currentTime,
      //   this.audioEl.duration,
      //   this.process
      // );
    }, 100);
  }

  style = {
    float: "left",
    height: "300px",
    marginLeft: "70px"
  };

  seekToTime(time: number) {}
}
