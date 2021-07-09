const axios = require('axios');
const delay = require('delay');
const Path = require('path')

var cheerio = require("cheerio");
var fs = require('fs').promises;
var fsN = require('fs')
var truyen;

const step = 50;
const test = async () => {

    const data = await fs.readFile('./truyen/truyen.json', 'utf8');

    truyen = JSON.parse(Buffer.from(data).toString());

    console.log(truyen.length);
    let a = []
    for (let i = 0; i < truyen.length; i++) {
        if (parseInt(truyen[i].lastChap)) {
            await axios.get(`${truyen[i].url}`).then(function (response, body) {
                $ = cheerio.load(response.data);
                var ds = $('div.book img').attr("src")
                truyen[i] = {
                    ...truyen[i],
                    img: `images/${ds.split('/')[ds.split('/').length - 1]}`
                }
            }).catch((err) => {
                console.log(err.message);
            });
        }
    }
    return truyen
}

test().then((val) => {
    fsN.writeFile('./truyen/truyen.json', JSON.stringify(val), () => { })
})

async function downloadImage(url, name) {
    const path = Path.resolve(__dirname, '../images', name)
    const writer = fsN.createWriteStream(path)

    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream'
    })

    response.data.pipe(writer)

    return new Promise((resolve, reject) => {
        writer.on('finish', resolve)
        writer.on('error', reject)
    })
}

