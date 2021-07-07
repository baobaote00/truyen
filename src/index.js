const axios = require('axios');

var cheerio = require("cheerio");
var fs = require('fs');

var i1 = 0;

for (let i = 1000; i < 1500; i++) {
    axios.get("https://truyenfull.vn/nguyen-ton/chuong-" + i).then(function (response, body) {
        $ = cheerio.load(response.data);
        var ds = $(response.data).find("div[class=chapter-c]");
        if (ds.text()) {
            fs.appendFile(`html/chap${i}.html`, ds.text(), function (err) {
                if (err) throw err;
                console.log('Saved!');
            });
        }
    });
}