var http = require("http");
var fs = require("fs");
const cheerio = require("cheerio");
const request = require("request");

http
  .createServer(function (req, res) {
    res.write("working...");
    res.end();
  })
  .listen(8080);

let sourcecode = "";
let url = "https://ekantipur.com"; //add url here

const getdata = () => {
  request(`${url}`, (error, response, html) => {
    const $ = cheerio.load(html);
    sourcecode += $.root().html();
    paste(sourcecode);
  });
};
getdata();

function paste(sourcecode) {
  fs.writeFile("code.txt", sourcecode, function (err) {
    if (err) throw err;
    console.log("Saved!");
  });
}
