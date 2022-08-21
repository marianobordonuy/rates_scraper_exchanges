const axios = require('axios');
const cheerio = require('cheerio');
const rateSchema = require("../models/rate");

let minasUSD = {};
let minasARS = {};
let minasBRL = {};
let minasEUR = {};
const minasUrl = 'https://cambiominas.com.uy/';

const minasQuotes = async() => {
    const {data} = await axios.get(minasUrl);
    const $ = cheerio.load(data);
    $('body').each(function () {
        $('body').each(function () {
            const source = "Minas";
            const url = minasUrl;
            const currency = "USD";
            const buy = $('#home-corporate > div > div > div:nth-child(4) > div > div > div > div.vc_row.wpb_row.vc_inner.vc_row-fluid.vc_row-o-equal-height.vc_row-o-content-top.vc_row-flex > div:nth-child(1) > div > div > div.wpb_raw_code.wpb_content_element.wpb_raw_html.vc_custom_1592014937560 > div > div:nth-child(1) > div:nth-child(2) > h4', this).text();
            const sell = $('#home-corporate > div > div > div:nth-child(4) > div > div > div > div.vc_row.wpb_row.vc_inner.vc_row-fluid.vc_row-o-equal-height.vc_row-o-content-top.vc_row-flex > div:nth-child(1) > div > div > div.wpb_raw_code.wpb_content_element.wpb_raw_html.vc_custom_1592014937560 > div > div:nth-child(1) > div:nth-child(4) > h4', this).text();
            const timestamp = new Date();
            minasUSD = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
        $('body').each(function () {
            const source = "Minas";
            const url = minasUrl;
            const currency = "ARS";
            const buy = $('#home-corporate > div > div > div:nth-child(4) > div > div > div > div.vc_row.wpb_row.vc_inner.vc_row-fluid.vc_row-o-equal-height.vc_row-o-content-top.vc_row-flex > div:nth-child(1) > div > div > div.wpb_raw_code.wpb_content_element.wpb_raw_html.vc_custom_1592014937560 > div > div:nth-child(5) > div:nth-child(2) > h4', this).text();
            const sell = $('#home-corporate > div > div > div:nth-child(4) > div > div > div > div.vc_row.wpb_row.vc_inner.vc_row-fluid.vc_row-o-equal-height.vc_row-o-content-top.vc_row-flex > div:nth-child(1) > div > div > div.wpb_raw_code.wpb_content_element.wpb_raw_html.vc_custom_1592014937560 > div > div:nth-child(5) > div:nth-child(4) > h4', this).text();
            const timestamp = new Date();
            minasARS = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
        $('body').each(function () {
            const source = "Minas";
            const url = minasUrl;
            const currency = "BRL";
            const buy = $('#home-corporate > div > div > div:nth-child(4) > div > div > div > div.vc_row.wpb_row.vc_inner.vc_row-fluid.vc_row-o-equal-height.vc_row-o-content-top.vc_row-flex > div:nth-child(1) > div > div > div.wpb_raw_code.wpb_content_element.wpb_raw_html.vc_custom_1592014937560 > div > div:nth-child(7) > div:nth-child(2) > h4', this).text();
            const sell = $('#home-corporate > div > div > div:nth-child(4) > div > div > div > div.vc_row.wpb_row.vc_inner.vc_row-fluid.vc_row-o-equal-height.vc_row-o-content-top.vc_row-flex > div:nth-child(1) > div > div > div.wpb_raw_code.wpb_content_element.wpb_raw_html.vc_custom_1592014937560 > div > div:nth-child(7) > div:nth-child(4) > h4', this).text();
            const timestamp = new Date();
            minasBRL = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
        $('body').each(function () {
            const source = "Minas";
            const url = minasUrl;
            const currency = "EUR";
            const buy = $('#home-corporate > div > div > div:nth-child(4) > div > div > div > div.vc_row.wpb_row.vc_inner.vc_row-fluid.vc_row-o-equal-height.vc_row-o-content-top.vc_row-flex > div:nth-child(1) > div > div > div.wpb_raw_code.wpb_content_element.wpb_raw_html.vc_custom_1592014937560 > div > div:nth-child(9) > div:nth-child(2) > h4', this).text();
            const sell = $('#home-corporate > div > div > div:nth-child(4) > div > div > div > div.vc_row.wpb_row.vc_inner.vc_row-fluid.vc_row-o-equal-height.vc_row-o-content-top.vc_row-flex > div:nth-child(1) > div > div > div.wpb_raw_code.wpb_content_element.wpb_raw_html.vc_custom_1592014937560 > div > div:nth-child(9) > div:nth-child(4) > h4', this).text();
            const timestamp = new Date();
            minasEUR = ({
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
    let minasDocUSD = new rateSchema(minasUSD);
    minasDocUSD.save(function(err) {
        if (err) return console.log(Date() + " " + err);
        console.log(Date() + " Document minasDocUSD inserted successfully!");
    });
    let minasDocARS = new rateSchema(minasARS);
    minasDocARS.save(function(err) {
        if (err) return console.log(Date() + " " + err);
        console.log(Date() + " Document minasDocARS inserted successfully!");
    });
    let minasDocBRL = new rateSchema(minasBRL);
    minasDocBRL.save(function(err) {
        if (err) return console.log(Date() + " " + err);
        console.log(Date() + " Document minasDocBRL inserted successfully!");
    });
    let minasDocEUR = new rateSchema(minasEUR);
    minasDocEUR.save(function(err) {
        if (err) return console.log(Date() + " " + err);
        console.log(Date() + " Document minasDocEUR inserted successfully!");
    });
    minasUSD = {};
    minasARS = {};
    minasBRL = {};
    minasEUR = {};
}

module.exports = {minasQuotes};