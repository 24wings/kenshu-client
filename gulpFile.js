var fs = require("fs");
var path = require("path");
var gulp = require("gulp");
let docPath = path.resolve(__dirname, "src/docs/");
gulp.task("default", []);
gulp.watch("src/**/*.*", () => {
  console.log("change");
});
