import { Title, DomSanitizer } from "@angular/platform-browser";
import { Component, AfterContentInit } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";

import { ROUTER_LIST } from "./routes";
import { HttpClient } from "@angular/common/http";
import { SafeHtml } from "@angular/platform-browser";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./style/index.less"]
})
export class AppComponent implements AfterContentInit {
  percent: number = 30;
  password: string = "";
  get auth(): boolean {
    return this.checkAuth();
  }
  errorMsg: string;
  blogContent: SafeHtml = "";
  routerList = ROUTER_LIST;
  books: { name: string; notes: string[] }[] = [];
  filePath: string = "/docs/readme/readme.md";
  componentList = [];
  searchComponent = null;
  versionList = ["0.5.x", "0.6.x"];
  currentVersion = "0.6.x";
  songs: { musicUrl: string; lrcUrl: string }[] = [];
  playingSong: { musicUrl: string; lrcUrl } = { musicUrl: "", lrcUrl: "" };
  diary: { title: string; notes: { title: string; path: string }[] }[] = [];
  constructor(
    private router: Router,
    private title: Title,
    private http: HttpClient,
    public domSafe: DomSanitizer
  ) {}

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
    this.http.get("/docs/docs.json").subscribe(rtn => {
      this.books = (rtn as any).data;
    });
    this.http.get("/assets/data/song.json").subscribe(rtn => {
      this.songs = (rtn as any).data;
      this.playingSong = (rtn as any).data[0];
    });
    this.http
      .get("/docs/diary/diary.json")
      .subscribe(rtn => (this.diary = (rtn as any).data));
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
  women: string = "15994239794fang";
  man: string = "13419597065jie";

  checkAuth(): boolean {
    let password = localStorage.getItem("password");
    if ((password && password == this.women) || password == this.man) {
      return true;
    } else {
      return false;
    }
  }
  loginAuth(password: string) {
    if (password == this.women || password == this.man) {
      localStorage.setItem("password", password);
      return true;
    } else {
      this.errorMsg = "永锁孤心...";
      return false;
    }
  }
  seeDiary(path: string) {
    if (!this.auth) {
      this.isVisible = true;
    } else {
      this.filePath = path;
    }
  }
  showBookContent() {}

  isVisible = false;

  showModal = () => {
    this.isVisible = true;
  };

  handleOk = password => {
    let result = this.loginAuth(password);
    if (result) {
      this.isVisible = false;
    } else {
      this.isVisible = true;
    }
  };

  handleCancel = e => {
    // console.log(e);
    this.isVisible = false;
  };
  ngAfterContentInit() {
    // var image = <HTMLImageElement>document.getElementById("background");
    // function run() {
    //   image.onload = function() {
    //     var engine = new window["RainyDay"]({
    //       image: this
    //     });
    //     engine.rain([[1, 2, 800]]);
    //     engine.rain([[3, 3, 0.88], [5, 5, 0.9], [6, 2, 1]], 100);
    //   };
    //   image.crossOrigin = "anonymous";
    //   image.src = "/assets/lib/img/N7ETzFO.jpg";
    // }
    // window.onload = run;
    // run();
  }
}
