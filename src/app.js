// require('dotenv').config()
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();

// define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', { title: 'Weather', 
name: 'David Wightman'})
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About Me', 
name: 'David Wightman'})
})

app.get('/help', (req, res) => {
    res.render('help', { message: 'Some helpful example Message',
title: 'Help',
name: 'David Wightman'})
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'you must provide an address'
        })
    }

    geocode(req.query.address, (error, { longitude, latitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            
            console.log(location)
            console.log(forecastData)

            res.send({forecast: forecastData,
                location: location,
                address: req.query.address })
        })
    })

})

app.get('/products', (req, res)=>{
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', { message: 'Looks like you are looking for help. Well, you have reached a unknown path',
        title: 'Error',
        name: 'David Wightman'})
})

app.get('*', (req, res) => {
    res.render('error', { message: 'message not found',
        title: 'Error',
        name: 'David Wightman'})
})

app.listen(3000, () => {
    console.log('server is up on port 3000')
})