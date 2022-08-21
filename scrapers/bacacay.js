const axios = require('axios');
const cheerio = require('cheerio');
const rateSchema = require("../models/rate");

let bacacayUSD = {};
let bacacayARS = {};
let bacacayBRL = {};
let bacacayEUR = {};
const bacacayUrl = 'https://bacacaysf.com/cotizaciones.php';

const bacacayQuotes = async() => {
    const {data} = await axios.get(bacacayUrl);
    const $ = cheerio.load(data);
    //Scrap data from website
    $('body > div > div.wrap-ser-cliente > div > table > tbody > tr > td:nth-child(1) > table > tbody').each(function () {
        $('tr:contains("Dolar USA"):nth-child(1)').each(function () {
            const source = "Bacacay";
            const url = bacacayUrl;
            const currency = "USD";
            const buy = $('td:nth-child(3)', this).first().text();
            const sell = $('td:nth-child(3)', this).first().next().text();
            const timestamp = new Date();
            bacacayUSD = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
        $('tr:nth-child(4):contains("Peso Argentino")').each(function () {
            const source = "Bacacay";
            const url = bacacayUrl;
            //body > div > div.wrap-ser-cliente > div > table > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(4)
            const currency = "ARS";
            const buy = $('td:nth-child(3)', this).first().text();
            //body > div > div.wrap-ser-cliente > div > table > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(4) > td:nth-child(3)
            const sell = $('td:nth-child(3)', this).first().next().text();
            const timestamp = new Date();
            bacacayARS = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
        $('tr:nth-child(5):contains("Real")').each(function () {
            const source = "Bacacay";
            const url = bacacayUrl;
            const currency = "BRL";
            const buy = $('td:nth-child(3)', this).text();
            const sell = $('td:nth-child(3)', this).first().next().text();
            const timestamp = new Date();
            bacacayBRL = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
        $('tr:nth-child(3):contains("Euro")').each(function () {
            const source = "Bacacay";
            const url = bacacayUrl;
            const currency = "EUR";
            const buy = $('td:nth-child(3)', this).text();
            const sell = $('td:nth-child(3)', this).first().next().text();
            const timestamp = new Date();
            bacacayEUR = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
    })
    //Save data into MongoDB
    let bacacayDocUSD = new rateSchema(bacacayUSD);
    bacacayDocUSD.save(function(err) {
        if (err) return console.log(Date() + " " + err);
        console.log(Date() + " Document bacacayDocUSD inserted successfully!");
    });
    let bacacayDocARS = new rateSchema(bacacayARS);
    bacacayDocARS.save(function(err) {
        if (err) return console.log(Date() + " " + err);
        console.log(Date() + " Document bacacayDocARS inserted successfully!");
    });
    let bacacayDocBRL = new rateSchema(bacacayBRL);
    bacacayDocBRL.save(function(err) {
        if (err) return console.log(Date() + " " + err);
        console.log(Date() + " Document bacacayDocBRL inserted successfully!");
    });
    let bacacayDocEUR = new rateSchema(bacacayEUR);
    bacacayDocEUR.save(function(err) {
        if (err) return console.log(Date() + " " + err);
        console.log(Date() + " Document bacacayDocEUR inserted successfully!");
    });
    bacacayUSD = {};
    bacacayARS = {};
    bacacayBRL = {};
    bacacayEUR = {};
}

module.exports = {bacacayQuotes};