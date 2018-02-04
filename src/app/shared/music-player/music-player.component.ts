import { Component, OnInit, Input, ViewChild, AfterContentInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.css']
})
export class MusicPlayerComponent implements OnInit, AfterContentInit {
  @Input() song: { thumbUrl: string, musicUrl: string, lrcUrl: string };
  @ViewChild('audio') audio;

  process: number;
  currentTime: Date;
  duration: Date;
  audioEl: HTMLAudioElement;
  constructor(public http: HttpClient) {

  }

  ngOnInit() {

  }
  ngAfterContentInit() {
    this.audioEl = this.audio.nativeElement;

  }

  play() {
    console.log('play');
    setInterval(() => {
      this.process = (this.audioEl.currentTime / this.audioEl.duration);
      this.currentTime = new Date(this.audioEl.currentTime * 1000);
      this.duration = new Date(this.audioEl.duration * 1000);
      console.log(this.audioEl.currentTime, this.audioEl.duration, this.process);
    }, 100)
  }


}
