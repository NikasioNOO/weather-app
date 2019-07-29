console.log("Init")
const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./Utils/geocode');
const forecast = require('./Utils/forecast');

const app = express();

const pathDirectoryPublic = path.join(__dirname, '../public');
const pathViews = path.join(__dirname, '../templates/views')
const pathTemplates = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs');
app.set('views', pathViews);

app.use(express.static(pathDirectoryPublic));
hbs.registerPartials(pathTemplates);

app.get('', (req, res) => {
    //res.send("<h1>Hello Express</h1>");
    res.render('weather',
        {
            title: 'Weather',
            name: 'Nicolas Ortiz'
        })
});

// app.get('/weather', (req, res) => {
//     //res.send("<h1>Hello Express</h1>");
//     res.render('weather',
//         {
//             title: 'Wheather',
//             name: 'Nicolas Ortiz'
//         })
// });


app.get('/help', (req, res) => {
    // res.send({
    //     Name:'Nicolas',
    //     LastName:'Ortiz'
    // });

    res.render('help',
        {
            title: 'Help',
            name: 'Nicolas Ortiz',
            helpText: 'This page is useful'
        })
});

app.get('/about', (req, res) => {
    res.render('index',
        {
            title: 'Help',
            name: 'Nicolas Ortiz'
        })
});

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'you must provide an address'
        })
    }
    debugger;

    geocode.geocodeAdress(req.query.address, (error, {lat,lng, location} = {}) => {
        if (error) { 
            return res.send({
                error: error
            })
        }

        forecast.forecast(lat, lng, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }

            console.log(location)
            console.log(forecastData)
            res.send({
                forecastData,
                location
            })
        })
    });

    // res.send({
    //     Location: 'Córdoba Argentina',
    //     Weather: '20° C Cloudy',
    //     address: req.query.address
    // });
});

app.get('/help/*', (req, res) => {
    res.render('404page', {
        errorMsg: 'Help article not found',
        title: '404',
        name: 'Nicolas Ortiz'
    })
});

app.get('*', (req, res) => {
    res.render('404page', {
        errorMsg: 'Page not found',
        title: '404',
        name: 'Nicolas Ortiz'
    })
});



app.listen(3000, () => {
    console.log('Server is up on port 3000')
})