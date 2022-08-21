const axios = require('axios');
const cheerio = require('cheerio');
const rateSchema = require("../models/rate");

let dieciochoUSD = {};
let dieciochoARS = {};
let dieciochoBRL = {};
let dieciochoEUR = {};
const dieciochoUrl = 'https://www.cambio18.com/';

const dieciochoQuotes = async() => {
    const {data} = await axios.get(dieciochoUrl);
    const $ = cheerio.load(data);
    $('#wrapper').each(function () {
        $('div.clearfix.control-page-smallHeader > div.vc_row.wpb_row.vc_row-fluid.vc_custom_1489540209555.vc_column-gap-20.vc_row-o-content-middle.vc_row-flex > div:nth-child(1) > div > div > div > div > table > tbody > tr > th:nth-child(2) > table > tbody').each(function () {
            const source = "Cambio18";
            const url = dieciochoUrl;
            const currency = "USD";
            const buy = $('tbody > tr:nth-child(2) > td:nth-child(2)', this).text();
            const sell = $('tbody > tr:nth-child(3) > td:nth-child(2)', this).text();
            const timestamp = new Date();
            dieciochoUSD = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
        $('#wrapper > div.clearfix.control-page-smallHeader > div.vc_row.wpb_row.vc_row-fluid.vc_custom_1489540209555.vc_column-gap-20.vc_row-o-content-middle.vc_row-flex > div:nth-child(4) > div > div > div > div > table > tbody > tr > th:nth-child(2) > table > tbody').each(function () {
            const source = "Cambio18";
            const url = dieciochoUrl;
            const currency = "ARS";
            const buy = $('tbody > tr:nth-child(2) > td:nth-child(2)', this).text();
            const sell = $('tbody > tr:nth-child(3) > td:nth-child(2)', this).text();
            const timestamp = new Date();
            dieciochoARS = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
        $('#wrapper > div.clearfix.control-page-smallHeader > div.vc_row.wpb_row.vc_row-fluid.vc_custom_1489540209555.vc_column-gap-20.vc_row-o-content-middle.vc_row-flex > div:nth-child(3) > div > div > div > div > table > tbody > tr > th:nth-child(2) > table > tbody').each(function () {
            const source = "Cambio18";
            const url = dieciochoUrl;
            const currency = "BRL";
            const buy = $('tbody > tr:nth-child(2) > td:nth-child(2)', this).text();
            const sell = $('tbody > tr:nth-child(3) > td:nth-child(2)', this).text();
            const timestamp = new Date();
            dieciochoBRL = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
        $('#wrapper > div.clearfix.control-page-smallHeader > div.vc_row.wpb_row.vc_row-fluid.vc_custom_1489540209555.vc_column-gap-20.vc_row-o-content-middle.vc_row-flex > div:nth-child(2) > div > div > div > div > table > tbody > tr > th:nth-child(2) > table > tbody').each(function () {
            const source = "Cambio18";
            const url = dieciochoUrl;
            const currency = "EUR";
            const buy = $('tbody > tr:nth-child(2) > td:nth-child(2)', this).text();
            const sell = $('tbody > tr:nth-child(3) > td:nth-child(2)', this).text();
            const timestamp = new Date();
            dieciochoEUR = ({
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
    let dieciochoDocUSD = new rateSchema(dieciochoUSD);
    dieciochoDocUSD.save(function(err) {
        if (err) return console.log(Date() + " " + err);
        console.log(Date() + " Document dieciochoDocUSD inserted successfully!");
    });
    let dieciochoDocARS = new rateSchema(dieciochoARS);
    dieciochoDocARS.save(function(err) {
        if (err) return console.log(Date() + " " + err);
        console.log(Date() + " Document dieciochoDocARS inserted successfully!");
    });
    let dieciochoDocBRL = new rateSchema(dieciochoBRL);
    dieciochoDocBRL.save(function(err) {
        if (err) return console.log(Date() + " " + err);
        console.log(Date() + " Document dieciochoDocBRL inserted successfully!");
    });
    let dieciochoDocEUR = new rateSchema(dieciochoEUR);
    dieciochoDocEUR.save(function(err) {
        if (err) return console.log(Date() + " " + err);
        console.log(Date() + " Document dieciochoDocEUR inserted successfully!");
    });
    dieciochoUSD = {};
    dieciochoARS = {};
    dieciochoBRL = {};
    dieciochoEUR = {};
}

module.exports = {dieciochoQuotes};