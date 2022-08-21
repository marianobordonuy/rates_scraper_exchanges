const PORT = process.env.PORT || 8000
const express = require('express');
const cron = require('node-cron');
const mongoose = require('mongoose');
const http = require("http");
const Aeromar = require('./scrapers/aeromar');
const Aspen = require ('./scrapers/aspen');
const Bacacay = require('./scrapers/bacacay');
const Cambilex = require('./scrapers/cambilex');
const Delta = require('./scrapers/delta');
const Dieciocho =require('./scrapers/dieciocho');
const Gales = require('./scrapers/gales');
const Iberia = require('./scrapers/iberia');
const Maiorano = require ('./scrapers/maiorano');
const Minas = require('./scrapers/minas');
const Val = require('./scrapers/val');
const Varlix = require ('./scrapers/varlix');
const Velso = require('./scrapers/velso');
const rateSchema = require("./models/rate");
const apiResponse = require("./helpers/apiResponse");
const uri = process.env.MONGODB_URI;

const app = express()

app.use(express.urlencoded({extended: true}));
app.use(express.json());

try {
    mongoose.connect(
        uri,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }, function (err) {
            if (err) {
                console.log(Date() + ": " + err);
            } else {
                console.log(Date() + " Connected to MongoDB");
            }
        });
} catch (err) {
    console.error(Date() + " Could not connect: " + err)
}

app.get('/', async (req, res) => {
    return apiResponse.successResponse(res, 'UYU.EXCHANGE API to get the current rates for the UYU (Peso) against other main currencies offered in Punta del Este - Uruguay in USD, ARS, BRL and EUR.' +
        'You can select the exchange and the currency by placing /api/exchange(from list below)/currency(from list below)/)' +
        'Exchanges available: aeromar, aspen, avenida, bacacay, baluma, brimar, cambilex, delta, dieciocho, eurodracma, gales, iberia, indumex, maiorano, minas, sir, val, varlix, velso' +
        'Currencies available: USD, ARS, BRL, EUR')
});

//GET request to provide fuel prices from the database based on fuel type
app.get('/api/get/:sourceId/', async (req, res) => {
    let source = req.params.sourceId;
    let newInstanceRate = await rateSchema.find({request: source}).sort({timestamp: -1}).limit(4);
    try {
        if (newInstanceRate.length > 0) {
            console.log(Date() + " Fuel prices successfully obtained from MongoDB");
            return apiResponse.successResponseWithData(res, "Rates found", newInstanceRate);
        } else {
            console.error(Date() + " Fuel prices not found in MongoDB");
            return apiResponse.notFoundResponse(res, "Rates not found");
        }
    } catch (err) {
        return apiResponse.ErrorResponse(res, err);
    }
})

//POST request to save fuel prices to database
app.post('/api/post/', async (req, res) => {
    const newRate = new rateSchema(req.body);
    let newDocRate = new rateSchema(newRate);
    await newDocRate.save(function(err) {
        if (!err) {
            console.log(Date() + " JSON file successfully stored in MongoDB");
            return apiResponse.successResponse(res, "JSON file successfully stored in MongoDB");
        } else {
            console.error(Date() + " " + err);
            return apiResponse.ErrorResponse(res, err);
        }
    });
})

// Throw 404 if URL not found
app.all("*", function(req, res) {
    console.log(Date() + " Request made resulted in page not found");
    return apiResponse.notFoundResponse(res, "Page not found")
});

// Cron job to run every 15 minutes
cron.schedule('1,16,31,46 10-20 * * 1-5', () => {
    void Aeromar.aeromarQuotes();
}, {
    scheduled: true,
    timezone: "America/Montevideo"
});

//Cron job to refresh the rates every 15 minutes
cron.schedule('30 1,16,31,46 10-20 * * 1-5', () => {
    void Aspen.aspenQuotes();
}, {
    scheduled: true,
    timezone: "America/Montevideo"
});

//Cron job to refresh the rates every 15 minutes
cron.schedule('2,17,32,47 10-20 * * 1-5', () => {
    void Bacacay.bacacayQuotes();
}, {
    scheduled: true,
    timezone: "America/Montevideo"
});

//Cron job to refresh the rates every 15 minutes
cron.schedule('30 2,17,32,47 10-20 * * 1-5', () => {
    void Cambilex.cambilexQuotes();
}, {
    scheduled: true,
    timezone: "America/Montevideo"
});

//Cron job to refresh the rates every 15 minutes
cron.schedule('3,18,33,48 10-20 * * 1-5', () => {
    void Delta.deltaQuotes();
}, {
    scheduled: true,
    timezone: "America/Montevideo"
});

//Cron job to refresh the rates every 15 minutes
cron.schedule('30 3,18,33,48 10-20 * * 1-5', () => {
    void Dieciocho.dieciochoQuotes();
}, {
    scheduled: true,
    timezone: "America/Montevideo"
});

//Cron job to refresh the rates every 15 minutes
cron.schedule('4,19,34,49 10-20 * * 1-5', () => {
    void Gales.galesQuotes();
}, {
    scheduled: true,
    timezone: "America/Montevideo"
});

//Cron job to refresh the rates every 15 minutes
cron.schedule('30 4,19,34,49 10-20 * * 1-5', () => {
    void Iberia.iberiaQuotes();
}, {
    scheduled: true,
    timezone: "America/Montevideo"
});

//Cron job to refresh the rates every 15 minutes
cron.schedule('5,20,35,50 10-20 * * 1-5', () => {
    void Maiorano.maioranoQuotes();
}, {
    scheduled: true,
    timezone: "America/Montevideo"
});

//Cron job to refresh the rates every 15 minutes
cron.schedule('30 5,20,35,50 10-20 * * 1-5', () => {
    void Minas.minasQuotes();
}, {
    scheduled: true,
    timezone: "America/Montevideo"
});

//Cron job to refresh the rates every 15 minutes
cron.schedule('6,21,36,51 10-20 * * 1-5', () => {
    void Val.valQuotes();
}, {
    scheduled: true,
    timezone: "America/Montevideo"
});

//Cron job to refresh the rates every 15 minutes
cron.schedule('30 6,21,36,51 10-20 * * 1-5', () => {
    void Varlix.varlixQuotes();
}, {
    scheduled: true,
    timezone: "America/Montevideo"
});

//Cron job to refresh the rates every 15 minutes
cron.schedule('7,22,37,52 10-20 * * 1-5', () => {
    void Velso.velsoQuotes();
}, {
    scheduled: true,
    timezone: "America/Montevideo"
});

setInterval(function() {
    http.get("http://usd-uy-api.herokuapp.com/run/");
}, 300000); // every 5 minutes (300000)

module.exports = app;

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))