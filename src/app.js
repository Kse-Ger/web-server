const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const viewsPath = path.join(__dirname, '../templates/views')
const partials = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partials)

app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ksenija Gera'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Ksenija Gera'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is help page!',
        title: 'Help',
        name: 'Ksenija Gera'
    })
})

app.get('/weather', (req,res) => {

    const city = req.query.city
    const countryCode = req.query.countryCode

    geocode(city, countryCode, (error, { lat, long, location } = {}) => {
        if(error) {
            return res.send({ error }) 
        } else {
            forecast(lat, long, (error, forecastdata) => {
                if (error) {
                    return res.send({ error }) 
                }
                
                res.send({
                    city: location,
                    forecast: forecastdata
                })
            })  
        }
    })  
})

app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide the search term'
        })
    }

    console.log(req.query)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        error: 'Help article not found',
        title: 'Error 404',
        name: 'Ksenija Gera'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        error: 'The page you are looking for does not exist!',
        title: 'Error 404',
        name: 'Ksenija Gera'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})