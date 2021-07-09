const axios = require('axios');
const delay = require('delay');

var cheerio = require("cheerio");
var fs = require('fs').promises;
var fsN = require('fs')
var truyen;
let i1 = 0;
const test = async () => {

    const data = await fs.readFile('./truyen/truyen.json', 'utf8');

    truyen = JSON.parse(Buffer.from(data).toString());

    console.log(truyen.length);

    // testAwait(0, 100, "https://truyenfull.vn/hon-trom-55-lan-230420/").then(value => {
    //     console.log(value.length);
    // })

    for (let i = 7; i < truyen.length; i++) {
        if (parseInt(truyen[i].lastChap)) {
            for (let i2 = 1; i2 < parseInt(truyen[i].lastChap); i2 += 100) {
                await testAwait(i2, i2 + 100, truyen[i].url).then(value => {
                    console.log(value.length);
                    value.forEach((val, index) => {
                        const path = `${truyen[i].url.split('truyenfull.vn/')[1].split("/")[0]}`;
                        if (!fsN.existsSync(path)) {
                            fsN.mkdirSync(path, {
                                recursive: true
                            });
                        }
                        fs.writeFile(`${path}/chap${i2 + index}.txt`, val, function (err) {
                            if (err) throw err;
                            console.log('Saved!');
                        }).then(()=>console.log(`${path}/chap${i2 + index}.txt`));
                        ;
                    });
                })
            }
        }
    }
}

test()

const testAwait = async (form, to, url) => {
    let test1 = []
    for (let i2 = form; i2 < to; i2++) {
        axios.get(`${url}chuong-${i2}`).then(function (response, body) {
            $ = cheerio.load(response.data);
            var ds = $('div.chapter-c')
            test1.push(ds.text());
        });
    }
    await delay(13000);
    return test1
}

//get last chapter
// for (let i = 0; i < truyen.length; i++) {
//     if (truyen[i].page) {
//         axios.get(`${truyen[i].url}/trang-${truyen[i].page}`).then(function (response, body) {
//             $ = cheerio.load(response.data);
//             var ds = $('ul.list-chapter li:last-child a')
//             truyen[i] = {
//                 ...truyen[i],
//                 lastChap: ds.attr('href').split('chuong-')[1].split('/')[0]
//             }
//             if (i == truyen.length - 1) {
//                 fs.writeFile(`truyen/truyen.json`, JSON.stringify(truyen), function (err) {
//                     if (err) throw err;
//                     console.log('Saved!');
//                 });
//             }
//         });
//     }
// }

//get page cuối
// axios.get(`${truyen[i].url}/trang-${truyen[i].page}`).then(function (response, body) {
//     $ = cheerio.load(response.data);
//     var ds = $('ul.pagination.pagination-sm li:nth-child(8) a')
//     let text = '';
//     if ((text = ds.text()) == "Cuối »") {
//         truyen[i] = {
//             ...truyen[i],
//             page: ds.attr('href').split('trang-')[1].split('/')[0]
//         };
//     }
//     if (i == truyen.length - 1) {
//         fs.writeFile(`truyen/truyen.json`, JSON.stringify(truyen), function (err) {
//             if (err) throw err;
//             console.log('Saved!');
//         });
//     }
// });

// axios.get(`${truyen[1]}/#list-chapter`).then(function (response, body) {
//     $ = cheerio.load(response.data);
//     var ds = $('ul.pagination.pagination-sm li:nth-child(8)')
    // for (let i = 0; i < li.length; i++) {
    // console.log(ds.text() == "Cuối »");
    // }
    // let text = []

    // for (let i = 0; i < ds.length; i++) {
    //     text.push(ds[i].attribs.href);
    // }

    // fs.appendFile(`truyen/truyen.json`, JSON.stringify(text), function (err) {
    //     if (err) throw err;
    //     console.log('Saved!');
    // });
// });

// for (let i1 = 2; i1 < 6; i1++) {
//     axios.get(`https://truyenfull.vn/danh-sach/truyen-hot/trang-${i1}`).then(function (response, body) {
//         $ = cheerio.load(response.data);
//         var ds = $('h3.truyen-title a')
//         let text = []

//         for (let i = 0; i < ds.length; i++) {
//             text.push(ds[i].attribs.href);
//         }

//         fs.appendFile(`truyen/truyen.json`, JSON.stringify(text), function (err) {
//             if (err) throw err;
//             console.log('Saved!');
//         });
//     });
// }

