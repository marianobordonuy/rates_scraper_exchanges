const axios = require('axios');
const cheerio = require('cheerio');
const rateSchema = require("../models/rate");

let cambilexUSD = {};
let cambilexARS = {};
let cambilexBRL = {};
let cambilexEUR = {};
const cambilexUrl = 'https://cambilex.com.uy/';

const cambilexQuotes = async() => {
    const {data} = await axios.get(cambilexUrl);
    const $ = cheerio.load(data);
    $('.cotizaciones').each(function () {
        $('tr.cotizacion:contains("Dolares")').each(function () {
            const source = "Cambilex";
            const url = cambilexUrl;
            const currency = "USD";
            const buy = $('td.compra', this).text();
            const sell = $('td.venta', this).text();
            const timestamp = new Date();
            cambilexUSD = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
        $('tr.cotizacion:contains("Argentinos")').each(function () {
            const source = "Cambilex";
            const url = cambilexUrl;
            const currency = "ARS";
            const buy = $('td.compra', this).text();
            const sell = $('td.venta', this).text();
            const timestamp = new Date();
            cambilexARS = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
        $('tr.cotizacion:contains("Reales")').each(function () {
            const source = "Cambilex";
            const url = cambilexUrl;
            const currency = "BRL";
            const buy = $('td.compra', this).text();
            const sell = $('td.venta', this).text();
            const timestamp = new Date();
            cambilexBRL = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
        $('tr.cotizacion:contains("Euros")').each(function () {
            const source = "Cambilex";
            const url = cambilexUrl;
            const currency = "EUR";
            const buy = $('td.compra', this).text();
            const sell = $('td.venta', this).text();
            const timestamp = new Date();
            cambilexEUR = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
    });
    //Save data into MongoDB
    let cambilexDocUSD = new rateSchema(cambilexUSD);
    cambilexDocUSD.save(function(err) {
        if (err) return console.log(Date() + " " + err);
        console.log(Date() + " Document cambilexDocUSD inserted successfully!");
    });
    let cambilexDocARS = new rateSchema(cambilexARS);
    cambilexDocARS.save(function(err) {
        if (err) return console.log(Date() + " " + err);
        console.log(Date() + " Document cambilexDocARS inserted successfully!");
    });
    let cambilexDocBRL = new rateSchema(cambilexBRL);
    cambilexDocBRL.save(function(err) {
        if (err) return console.log(Date() + " " + err);
        console.log(Date() + " Document cambilexDocBRL inserted successfully!");
    });
    let cambilexDocEUR = new rateSchema(cambilexEUR);
    cambilexDocEUR.save(function(err) {
        if (err) return console.log(Date() + " " + err);
        console.log(Date() + " Document cambilexDocEUR inserted successfully!");
    });
    cambilexUSD = {};
    cambilexARS = {};
    cambilexBRL = {};
    cambilexEUR = {};
}

module.exports = {cambilexQuotes};