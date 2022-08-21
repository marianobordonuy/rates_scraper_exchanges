const axios = require('axios');
const cheerio = require('cheerio');
const rateSchema = require("../models/rate");

let valUSD = {};
let valARS = {};
let valBRL = {};
let valEUR = {};
const valUrl = 'http://www2.valsf.com.uy/mvdexchange/apizarradeldia.aspx';

const valQuotes = async() => {
    const {data} = await axios.get(valUrl);
    const $ = cheerio.load(data);
    $('.tablacotizaciones').each(function () {
        $('.backcotizacion').each(function () {
            const source = "Val";
            const url = valUrl;
            const currency = "USD";
            const buy = $('table > tbody > tr:nth-child(1) > td > table > tbody > tr > td.celdacompra', this).text();
            const sell = $('table > tbody > tr:nth-child(1) > td > table > tbody > tr > td.celdaventa', this).text();
            const timestamp = new Date();
            valUSD = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
        $('.backcotizacion').each(function () {
            const source = "Val";
            const url = valUrl;
            const currency = "ARS";
            const buy = $('table > tbody > tr:nth-child(2) > td > table > tbody > tr > td.celdacompra', this).text();
            const sell = $('table > tbody > tr:nth-child(2) > td > table > tbody > tr > td.celdaventa', this).text();
            const timestamp = new Date();
            valARS = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
        $('.backcotizacion').each(function () {
            const source = "Val";
            const url = valUrl;
            const currency = "BRL";
            const buy = $('table > tbody > tr:nth-child(3) > td > table > tbody > tr > td.celdacompra', this).text();
            const sell = $('table > tbody > tr:nth-child(3) > td > table > tbody > tr > td.celdaventa', this).text();
            const timestamp = new Date();
            valBRL = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
        $('.backcotizacion').each(function () {
            const source = "Val";
            const url = valUrl;
            const currency = "EUR";
            const buy = $('table > tbody > tr:nth-child(4) > td > table > tbody > tr > td.celdacompra', this).text();
            const sell = $('table > tbody > tr:nth-child(4) > td > table > tbody > tr > td.celdaventa', this).text();
            const timestamp = new Date();
            valEUR = ({
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
    let valDocUSD = new rateSchema(valUSD);
    valDocUSD.save(function(err) {
        if (err) return console.log(Date() + " " + err);
        console.log(Date() + " Document valDocUSD inserted successfully!");
    });
    let valDocARS = new rateSchema(valARS);
    valDocARS.save(function(err) {
        if (err) return console.log(Date() + " " + err);
        console.log(Date() + " Document valDocARS inserted successfully!");
    });
    let valDocBRL = new rateSchema(valBRL);
    valDocBRL.save(function(err) {
        if (err) return console.log(Date() + " " + err);
        console.log(Date() + " Document valDocBRL inserted successfully!");
    });
    let valDocEUR = new rateSchema(valEUR);
    valDocEUR.save(function(err) {
        if (err) return console.log(Date() + " " + err);
        console.log(Date() + " Document valDocEUR inserted successfully!");
    });
    valUSD = {};
    valARS = {};
    valBRL = {};
    valEUR = {};
}

module.exports = {valQuotes};