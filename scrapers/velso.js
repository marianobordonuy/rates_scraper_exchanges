const axios = require('axios');
const cheerio = require('cheerio');
const rateSchema = require("../models/rate");

let velsoUSD = {};
let velsoARS = {};
let velsoBRL = {};
let velsoEUR = {};
const velsoUrl = 'https://cambiovelso.com.uy/';

const velsoQuotes = async() => {
    const {data} = await axios.get(velsoUrl);
    const $ = cheerio.load(data);
    $('table.tablepress').each(function () {
        $('tr.row-2').each(function () {
            const source = "Velso";
            const url = velsoUrl;
            const currency = "USD";
            const buy = $('td.column-2', this).text();
            const sell = $('td.column-3', this).text();
            const timestamp = new Date();
            velsoUSD = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
        $('tr.row-5').each(function () {
            const source = "Velso";
            const url = velsoUrl;
            const currency = "ARS";
            const buy = $('td.column-2', this).text();
            const sell = $('td.column-3', this).text();
            const timestamp = new Date();
            velsoARS = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
        $('tr.row-4').each(function () {
            const source = "Velso";
            const url = velsoUrl;
            const currency = "ARS";
            const buy = $('td.column-2', this).text();
            const sell = $('td.column-3', this).text();
            const timestamp = new Date();
            velsoBRL = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
        $('tr.row-3').each(function () {
            const source = "Velso";
            const url = velsoUrl;
            const currency = "ARS";
            const buy = $('td.column-2', this).text();
            const sell = $('td.column-3', this).text();
            const timestamp = new Date();
            velsoEUR = ({
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
    let velsoDocUSD = new rateSchema(velsoUSD);
    velsoDocUSD.save(function(err) {
        if (err) {
            return console.log(Date() + " " + err);
        } else {
            console.log(Date() + " Document velsoDocUSD inserted successfully on MongoDB!");
        }
    });
    let velsoDocARS = new rateSchema(velsoARS);
    velsoDocARS.save(function(err) {
        if (err) {
            return console.error(Date() + " " + err);
        } else {
            console.log(Date() + " Document velsoDocARS inserted successfully on MongoDB!");
        }
    });
    let velsoDocBRL = new rateSchema(velsoBRL);
    velsoDocBRL.save(function(err) {
        if (err) {
            return console.log(Date() + " " + err);
        } else {
            console.log(Date() + " Document velsoDocBRL inserted successfully on MongoDB!");
        }
    });
    let velsoDocEUR = new rateSchema(velsoEUR);
    velsoDocEUR.save(function(err) {
        if (err) {
            return console.log(Date() + " " + err);
        } else {
            console.log(Date() + " Document velsoDocEUR inserted successfully on MongoDB!");
        }
    });
    velsoUSD = {};
    velsoARS = {};
    velsoBRL = {};
    velsoEUR = {};
}

module.exports = {velsoQuotes};