const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/02059c316380092b7f47d09a6f48e513/${latitude},${longitude}?units=si`;

    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find location!', undefined);
        } else {
            console.log(body.daily);
            callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability * 10}% chance of rain. The high today is ${body.daily.data[0].temperatureHigh} degrees with a low of ${body.daily.data[0].temperatureLow} degrees.`);
        }
    });
};

module.exports = forecast;