const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode= require('./utils/geocode')
const forecase = require('./utils/forecast')


const app = express();


//Define path for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and view location
app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//Set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req, res) => {
    res.render('index', {
        title:'Weather',
        name: 'Ashish'
    })
})

app.get('/about',(req, res) => {
    res.render('about', {
        title:'About me',
        name: 'Ashish'
    })
})

app.get('/help',(req, res) => {
    res.render('help', {
        helpText:'About me some help text',
        title: 'Help',
        name: 'Ashish'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({error})
        }
        forecase(latitude, longitude, (error, forcastData) =>{
            if(error) {
                return res.send({error})
            }

            res.send({
                forecast: forcastData,
                location: location,
                address: req.query.address
            })

        })
    })
    
})

app.get('/help/*',(req, res)=>{
    res.render('404',{
        title: '404',
        name: 'Ashish',
        errorMessage:'Help article not found'
    })
})

app.get('*',(req, res)=>{
    res.render('404',{
        title: '404',
        name: 'Ashish',
        errorMessage:' Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})