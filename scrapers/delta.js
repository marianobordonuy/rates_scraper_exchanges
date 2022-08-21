const axios = require('axios');
const cheerio = require('cheerio');
const rateSchema = require("../models/rate");

let deltaUSD = {};
let deltaARS = {};
let deltaBRL = {};
let deltaEUR = {};
const deltaUrl = 'https://www.delta.uy/';

const deltaQuotes = async() => {
    const {data} = await axios.get(deltaUrl);
    const $ = cheerio.load(data);
    $('.mask-container').each(function () {
        $('#IScroll-2').each(function () {
            const source = "Delta";
            const url = deltaUrl;
            const currency = "USD";
            const buy = $('#IScroll-2 > div > div:nth-child(1) > div', this).text();
            const sell = $('#IScroll-2 > div > div:nth-child(2) > div', this).text();
            const timestamp = new Date();
            deltaUSD = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
        $('#IScroll-3').each(function () {
            const source = "Delta";
            const url = deltaUrl;
            const currency = "ARS";
            const buy = $('#IScroll-3 > div > div:nth-child(1) > div', this).text();
            const sell = $('#IScroll-3 > div > div:nth-child(2) > div', this).text();
            const timestamp = new Date();
            deltaARS = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
        $('#IScroll-4').each(function () {
            const source = "Delta";
            const url = deltaUrl;
            const currency = "BRL";
            const buy = $('#IScroll-4 > div > div:nth-child(1) > div', this).text();
            const sell = $('#IScroll-4 > div > div:nth-child(2) > div', this).text();
            const timestamp = new Date();
            deltaBRL = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
        $('#IScroll-5').each(function () {
            const source = "Delta";
            const url = deltaUrl;
            const currency = "EUR";
            const buy = $('#IScroll-5 > div > div:nth-child(1) > div', this).text();
            const sell = $('#IScroll-5 > div > div:nth-child(2) > div', this).text();
            const timestamp = new Date();
            deltaEUR = ({
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
    let deltaDocUSD = new rateSchema(deltaUSD);
    deltaDocUSD.save(function(err) {
        if (err) return console.log(Date() + " " + err);
        console.log(Date() + " Document deltaDocUSD inserted successfully!");
    });
    let deltaDocARS = new rateSchema(deltaARS);
    deltaDocARS.save(function(err) {
        if (err) return console.log(Date() + " " + err);
        console.log(Date() + " Document deltaDocARS inserted successfully!");
    });
    let deltaDocBRL = new rateSchema(deltaBRL);
    deltaDocBRL.save(function(err) {
        if (err) return console.log(Date() + " " + err);
        console.log(Date() + " Document deltaDocBRL inserted successfully!");
    });
    let deltaDocEUR = new rateSchema(deltaEUR);
    deltaDocEUR.save(function(err) {
        if (err) return console.log(Date() + " " + err);
        console.log(Date() + " Document deltaDocEUR inserted successfully!");
    });
    deltaUSD = {};
    deltaARS = {};
    deltaBRL = {};
    deltaEUR = {};
}

module.exports = {deltaQuotes};