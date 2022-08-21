const axios = require('axios');
const cheerio = require('cheerio');
const rateSchema = require("../models/rate");

let aspenUSD = {};
let aspenARS = {};
let aspenBRL = {};
let aspenEUR = {};
const aspenUrl = 'https://www.aspen.com.uy/sitio/';

const aspenQuotes = async() => {
    const {data} = await axios.get(aspenUrl);
    const $ = cheerio.load(data);
    //Scrap data from website
    $('.md-cotizaciones').each(function () {
        $('.md-cotizaciones .bd:contains("DÓLAR")').each(function () {
            const source = "Aspen";
            const url = aspenUrl;
            const currency = $('.moneda:contains("DÓLAR")', this).text().replace("DÓLAR", "USD");
            const buy = $('.bd .valor', this).first().text();
            const sell = $('.bd .valor', this).next().text();
            const timestamp = new Date();
            aspenUSD = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
        $('.md-cotizaciones .bd:contains("ARGENTINO")').each(function () {
            const source = "Aspen";
            const url = aspenUrl;
            const currency = $('.moneda:contains("ARGENTINO")', this).text().replace("ARGENTINO", "ARS");
            const buy = $('.bd .valor', this).first().text();
            const sell = $('.bd .valor', this).next().text();
            const timestamp = new Date();
            aspenARS = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
        $('.md-cotizaciones .bd:contains("REAL")').each(function () {
            const source = "Aspen";
            const url = aspenUrl;
            const currency = $('.moneda:contains("REAL")', this).text().replace("REAL", "BRL");
            const buy = $('.bd .valor', this).first().text();
            const sell = $('.bd .valor', this).next().text();
            const timestamp = new Date();
            aspenBRL = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
        $('.md-cotizaciones .bd:contains("EURO")').each(function () {
            const source = "Aspen";
            const url = aspenUrl;
            const currency = $('.moneda:contains("EURO")', this).text().replace("EURO", "EUR");
            const buy = $('.bd .valor', this).first().text();
            const sell = $('.bd .valor', this).next().text();
            const timestamp = new Date();
            aspenEUR = ({
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
    let aspenDocUSD = new rateSchema(aspenUSD);
    aspenDocUSD.save(function(err) {
        if (err) return console.log(Date() + " " + err);
        console.log(Date() + " Document aspenDocUSD inserted successfully!");
    });
    let aspenDocARS = new rateSchema(aspenARS);
    aspenDocARS.save(function(err) {
        if (err) return console.log(Date() + " " + err);
        console.log(Date() + " Document aspenDocARS inserted successfully!");
    });
    let aspenDocBRL = new rateSchema(aspenBRL);
    aspenDocBRL.save(function(err) {
        if (err) return console.log(Date() + " " + err);
        console.log(Date() + " Document aspenDocBRL inserted successfully!");
    });
    let aspenDocEUR = new rateSchema(aspenEUR);
    aspenDocEUR.save(function(err) {
        if (err) return console.log(Date() + " " + err);
        console.log(Date() + " Document aspenDocEUR inserted successfully!");
    });
    aspenUSD = {};
    aspenARS = {};
    aspenBRL = {};
    aspenEUR = {};
}

module.exports = {aspenQuotes};