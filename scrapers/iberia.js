const axios = require('axios');
const cheerio = require('cheerio');
const rateSchema = require("../models/rate");

let iberiaUSD = {};
let iberiaARS = {};
let iberiaBRL = {};
let iberiaEUR = {};
const iberiaUrl = 'https://www.cambioiberia.com/';

const iberiaQuotes = async() => {
    const {data} = await axios.get(iberiaUrl);
    const $ = cheerio.load(data);
    $('ul.cotizaciones').each(function () {
        $('li:contains("Dólar")').each(function () {
            const source = "Iberia";
            const url = iberiaUrl;
            const currency = "USD";
            const buy = $('li > div:nth-child(3)', this).text();
            const sell = $('li > div:nth-child(4)', this).text();
            const timestamp = new Date();
            iberiaUSD = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
        $('.cotizaciones li:contains("Argentino")').each(function () {
            const source = "Iberia";
            const url = iberiaUrl;
            const currency = $('div:contains("Argentino")', this).text().replace("Argentino", "ARS");
            const buy = $('li > div:nth-child(3)', this).text();
            const sell = $('li > div:nth-child(4)', this).text();
            const timestamp = new Date();
            iberiaARS = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
        $('.cotizaciones li:contains("Real")').each(function () {
            const source = "Iberia";
            const url = iberiaUrl;
            const currency = $('div:contains("Real")', this).text().replace("Real", "BRL");
            const buy = $('li > div:nth-child(3)', this).text();
            const sell = $('li > div:nth-child(4)', this).text();
            const timestamp = new Date();
            iberiaBRL = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
        $('.cotizaciones li:contains("Euro")').each(function () {
            const source = "Iberia";
            const url = iberiaUrl;
            const currency = $('div:contains("Euro")', this).text().replace("Euro", "EUR");
            const buy = $('li > div:nth-child(3)', this).text();
            const sell = $('li > div:nth-child(4)', this).text();
            const timestamp = new Date();
            iberiaEUR = ({
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
    let iberiaDocUSD = new rateSchema(iberiaUSD);
    iberiaDocUSD.save(function(err) {
        if (err) return console.log(Date() + " " + err);
        console.log(Date() + " Document iberiaDocUSD inserted successfully!");
    });
    let iberiaDocARS = new rateSchema(iberiaARS);
    iberiaDocARS.save(function(err) {
        if (err) return console.log(Date() + " " + err);
        console.log(Date() + " Document iberiaDocARS inserted successfully!");
    });
    let iberiaDocBRL = new rateSchema(iberiaBRL);
    iberiaDocBRL.save(function(err) {
        if (err) return console.log(Date() + " " + err);
        console.log(Date() + " Document iberiaDocBRL inserted successfully!");
    });
    let iberiaDocEUR = new rateSchema(iberiaEUR);
    iberiaDocEUR.save(function(err) {
        if (err) return console.log(Date() + " " + err);
        console.log(Date() + " Document iberiaDocEUR inserted successfully!");
    });
    iberiaUSD = {};
    iberiaARS = {};
    iberiaBRL = {};
    iberiaEUR = {};
}

module.exports = {iberiaQuotes};