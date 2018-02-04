import { Title, DomSanitizer } from "@angular/platform-browser";
import { Component } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";

import { ROUTER_LIST } from "./routes";
import { HttpClient } from "@angular/common/http";
import { SafeHtml } from "@angular/platform-browser";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./style/index.less"]
})
export class AppComponent {
  blogContent: SafeHtml = "";
  routerList = ROUTER_LIST;
  books: { name: string, notes: string[] }[] = [];
  filePath: string = "/docs/readme/readme.md";
  componentList = [];
  searchComponent = null;
  versionList = ["0.5.x", "0.6.x"];
  currentVersion = "0.6.x";
  songs: { musicUrl: string, lrcUrl: string }[] = []
  playingSong: { musicUrl: string, lrcUrl } = { musicUrl: '', lrcUrl: '' };
  constructor(
    private router: Router,
    private title: Title,
    private http: HttpClient,
    public domSafe: DomSanitizer
  ) { }

  navigateToPage(url) {
    if (url) {
      this.router.navigateByUrl(url);
    }
  }

  navigateToVersion(version) {
    if (version !== this.currentVersion) {
      window.location.href = window.location.origin + `/version/` + version;
    } else {
      window.location.href = window.location.origin;
    }
  }

  ngOnInit() {
    // this.routerList.components.forEach(group => {
    // this.componentList = this.componentList.concat([...group.children]);
    // });
    this.http.get('/docs/docs.json').subscribe(rtn => {
      this.books = (rtn as any).data;
    })
    this.http.get('/assets/data/song.json').subscribe(rtn => {
      this.songs = (rtn as any).data;
      this.playingSong = (rtn as any).data[0];
    });
    //export default class \n  { \n async login (){ \n let {phone,password,rePassword} = this.ctx.query;//等价于 \n let phone  = this.ctx.query.phone; \n let password = this.ctx.query.password; \n let rePassword = this.ctx.query.rePassword;}} \n
    // this.router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd) {
    //     const currentDemoComponent = this.componentList.find(
    //       component => `/${component.path}` === this.router.url
    //     );
    //     if (currentDemoComponent) {
    //       this.title.setTitle(
    //         `${currentDemoComponent.zh} ${
    //         currentDemoComponent.label
    //         } - NG-ZORRO`
    //       );
    //     }
    //     const currentIntroComponent = this.routerList.intro.find(
    //       component => `/${component.path}` === this.router.url
    //     );
    //     if (currentIntroComponent) {
    //       this.title.setTitle(`${currentIntroComponent.label} - NG-ZORRO`);
    //     }
    //     if (this.router.url !== "/" + this.searchComponent) {
    //       this.searchComponent = null;
    //     }
    //     window.scrollTo(0, 0);
    //   }
    // });
  }
  showBookContent() {

  }
}
