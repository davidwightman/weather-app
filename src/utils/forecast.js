const request = require('request');

const forcast = (longitude, latitude, callback) => {
    const url = `https://api.darksky.net/forecast/${process.env.DARK_SKY_KEY}/${latitude},${longitude}?units=us`

    request({url, json: true}, (error, response)=>{
        const { currently } = response.body
        if (error) {
            callback('uable to connect to weather service')
        } else if (response.body.error) {
            callback('uable to find location')
        }else {
            callback(undefined, `it is currently ${currently.temperature} there is ${currently.precipProbability}% chance of rain`)
        }
    });
}

module.exports = forcast;