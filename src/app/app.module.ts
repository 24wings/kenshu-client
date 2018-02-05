import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgZorroAntdModule } from "ng-zorro-antd";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { MarkdownModule } from "angular2-markdown";

import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MusicPlayerComponent } from "./shared/music-player/music-player.component";

// service
import { LrcParserService } from "./service/lrc-parser.service";

@NgModule({
  declarations: [AppComponent, MusicPlayerComponent],
  imports: [
    MarkdownModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserModule,
    NgZorroAntdModule.forRoot(),
    HttpModule,
    FormsModule,
    RouterModule.forRoot([])
  ],
  providers: [LrcParserService],
  bootstrap: [AppComponent]
})
export class AppModule {}
