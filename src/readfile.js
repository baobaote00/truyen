var fsN = require('fs');
var fs = require('fs').promises;
const axios = require('axios');
const delay = require('delay');

var cheerio = require("cheerio");


const test = async () => {

    const data = await fs.readFile('./truyen/truyen.json', 'utf8');

    truyen = JSON.parse(Buffer.from(data).toString());

    console.log(truyen.length);

    for (let i = 0; i < truyen.length; i++) {
        if (parseInt(truyen[i].lastChap)) {
            let iT = 0;
            const path = `txttruyen/${truyen[i].url.split('truyenfull.vn/')[1].split("/")[0]}`;
            fsN.readdir(`${path}`, async (err, files) => {
                for (let i1 = 1; i1 < truyen[i].lastChap; i1++) {
                    if (files.find((f) => f == `chap${i1}.txt`) == undefined) {
                        // await getOne(`${truyen[i].url}/chuong-${i1}`).then((val) => {
                        //     if (val.length != 0) {
                        //         fs.writeFile(`${path}/chap${i1}.txt`, val)
                        //             .then(() => console.log(`Save to ${path}/chap${i1}.txt`));
                        //     }
                        // })
                        iT++;
                    }
                }
                if (iT != 0) {
                    console.log(iT);
                }
            });
        }
    }

}

// test()

const getOne = async (url) => {
    let test1 = ''

    do {
        check = false
        axios.get(`${url}`).then(function (response, body) {
            $ = cheerio.load(response.data);
            var ds = $('div.chapter-c')
            test1 = ds.text();
        }).catch((err) => {
            check = true
            console.log(err.message);
        });
        await delay(5000);
        if (check) {
            console.log(`Error: ${url}`);
        } else if (test1.length == 0) {
            console.log(`Error: length ${url}`);
        }
    } while (check);

    return test1
}

fsN.readdir(`images`, async (err, files) => {
    console.log(files.length);
});