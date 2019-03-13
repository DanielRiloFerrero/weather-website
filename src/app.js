const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs'); // We are using handlebars templates
app.set('views', viewsPath); // We are defining the path of templates
hbs.registerPartials(partialsPath); // We are defining the path for partials

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Dani'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        img: 'robot',
        name: 'Dani'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Help text',
        title: 'Help',
        name: 'Dani'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        });
    }

    geocode(req.query.address, (err, { latitude, longitude, location } = {}) => {
        if (err) {
            return res.send({err});
        } 
        
        forecast(latitude, longitude, (err, forcastData) => {
            if (err) {
                return res.send(err);
            }

            res.send({
                forecast: forcastData,
                location,
                address: req.query.address
            });
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }
    
    res.send({
        products: []
    })

});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Not Found!',
        errorMessage: 'Help article not found',
        name: 'Dani'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Not Found!',
        errorMessage: 'Page not found',
        name: 'Dani'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});