const axios = require('axios');
const cheerio = require('cheerio');
const rateSchema = require("../models/rate");

let maioranoUSD = {};
let maioranoARS = {};
let maioranoBRL = {};
let maioranoEUR = {};
const maioranoUrl = 'http://cambios.instyledm.com/5/cotizaciones.html';

const maioranoQuotes = async() => {
    const {data} = await axios.get(maioranoUrl);
    const $ = cheerio.load(data);
    $('body').each(function () {
        $('body > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(3)').each(function () {
            const source = "Maiorano";
            const url = maioranoUrl;
            const currency = $('td:contains("Dolar")', this).text().replace("Dolar", "USD");
            const buy = $('td:nth-child(3)', this).text();
            const sell = $('td:nth-child(4)', this).text();
            const timestamp = new Date();
            maioranoUSD = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
        $('body > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(5)').each(function () {
            const source = "Maiorano";
            const url = maioranoUrl;
            const currency = $('td:contains("Peso")', this).text().replace("Peso", "ARS");
            const buy = $('td:nth-child(3)', this).text();
            const sell = $('td:nth-child(4)', this).text();
            const timestamp = new Date();
            maioranoARS = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
        $('body > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(7)').each(function () {
            const source = "Maiorano";
            const url = maioranoUrl;
            const currency = $('td:contains("Real")', this).text().replace("Real", "BRL");
            const buy = $('td:nth-child(3)', this).text();
            const sell = $('td:nth-child(4)', this).text();
            const timestamp = new Date();
            maioranoBRL = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
        $('body > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(9)').each(function () {
            const source = "Maiorano";
            const url = maioranoUrl;
            const currency = $('td:contains("Euro")', this).text().replace("Euro", "EUR");
            const buy = $('td:nth-child(3)', this).text();
            const sell = $('td:nth-child(4)', this).text();
            const timestamp = new Date();
            maioranoEUR = ({
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
    let maioranoDocUSD = new rateSchema(maioranoUSD);
    maioranoDocUSD.save(function(err) {
        if (err) return console.log(Date() + " " + err);
        console.log(Date() + " Document maioranoDocUSD inserted successfully!");
    });
    let maioranoDocARS = new rateSchema(maioranoARS);
    maioranoDocARS.save(function(err) {
        if (err) return console.log(Date() + " " + err);
        console.log(Date() + " Document maioranoDocARS inserted successfully!");
    });
    let maioranoDocBRL = new rateSchema(maioranoBRL);
    maioranoDocBRL.save(function(err) {
        if (err) return console.log(Date() + " " + err);
        console.log(Date() + " Document maioranoDocBRL inserted successfully!");
    });
    let maioranoDocEUR = new rateSchema(maioranoEUR);
    maioranoDocEUR.save(function(err) {
        if (err) return console.log(Date() + " " + err);
        console.log(Date() + " Document maioranoDocEUR inserted successfully!");
    });
    maioranoUSD = {};
    maioranoARS = {};
    maioranoBRL = {};
    maioranoEUR = {};
}

module.exports = { maioranoQuotes }