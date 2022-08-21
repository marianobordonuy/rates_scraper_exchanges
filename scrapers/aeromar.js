const axios = require('axios');
const cheerio = require('cheerio');
const rateSchema = require("../models/rate");

let aeromarUSD = {};
let aeromarARS = {};
let aeromarBRL = {};
let aeromarEUR = {};
const aeromarUrl = 'http://www.aeromar.com.uy/';

const aeromarQuotes = async() => {
    const {data} = await axios.get(aeromarUrl);
    const $ = cheerio.load(data);
    $('.mod-cotizacion').each(function () {
        $('.mod-cotizacion').each(function () {
            const source = "Aeromar";
            const url = aeromarUrl;
            const currency = "USD";
            const buy = $('div.row > div.col-xs-4:nth-child(2) > p:nth-child(2)', this).text();
            const sell = $('div.row > div.col-xs-4:nth-child(3) > p:nth-child(2)', this).text();
            const timestamp = new Date();
            aeromarUSD = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
        $('.mod-cotizacion').each(function () {
            const source = "Aeromar";
            const url = aeromarUrl;
            const currency = "ARS";
            const buy = $('div.row > div.col-xs-4:nth-child(2) > p:nth-child(3)', this).text();
            const sell = $('div.row > div.col-xs-4:nth-child(3) > p:nth-child(3)', this).text();
            const timestamp = new Date();
            aeromarARS = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
        $('.mod-cotizacion').each(function () {
            const source = "Aeromar";
            const url = aeromarUrl;
            const currency = "BRL";
            const buy = $('div.row > div.col-xs-4:nth-child(2) > p:nth-child(4)', this).text();
            const sell = $('div.row > div.col-xs-4:nth-child(3) > p:nth-child(4)', this).text();
            const timestamp = new Date();
            aeromarBRL = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
        $('.mod-cotizacion').each(function () {
            const source = "Aeromar";
            const url = aeromarUrl;
            const currency = "EUR";
            const buy = $('div.row > div.col-xs-4:nth-child(2) > p:nth-child(5)', this).text();
            const sell = $('div.row > div.col-xs-4:nth-child(3) > p:nth-child(5)', this).text();
            const timestamp = new Date();
            aeromarEUR = ({
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
    let aeromarDocUSD = new rateSchema(aeromarUSD);
    aeromarDocUSD.save(function(err) {
        if (err) return console.log(Date() + " " + err);
        console.log(Date() + " Document aeromarDocUSD inserted successfully!");
    });
    let aeromarDocARS = new rateSchema(aeromarARS);
    aeromarDocARS.save(function(err) {
        if (err) return console.log(Date() + " " + err);
        console.log(Date() + " Document aeromarDocARS inserted successfully!");
    });
    let aeromarDocBRL = new rateSchema(aeromarBRL);
    aeromarDocBRL.save(function(err) {
        if (err) return console.log(Date() + " " + err);
        console.log(Date() + " Document aeromarDocBRL inserted successfully!");
    });
    let aeromarDocEUR = new rateSchema(aeromarEUR);
    aeromarDocEUR.save(function(err) {
        if (err) return console.log(Date() + " " + err);
        console.log(Date() + " Document aeromarDocEUR inserted successfully!");
    });
    aeromarUSD = {};
    aeromarARS = {};
    aeromarBRL = {};
    aeromarEUR = {};
}

module.exports = {aeromarQuotes};