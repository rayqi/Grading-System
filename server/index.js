const path = require('path')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 8080
const app = express()
module.exports = app

// logging middleware
app.use(morgan('dev'))

//set the default views to html folder <- what is this?
// app.set('views', path.join(__dirname, 'html'))

// body parsing middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


//routes
app.use('/api', require('./api'))
app.get('/', (req, res) => {
    console.log('home page here')
    res.render('index')
})

// app.get('/grades', (req, res) => {
//     console.log('grades page')
//     res.render('grades')
// })

app.get('/students/:id', (req, res) => {
    console.log('ID in routes index', req.params.id)
    res.render('single')
})

// static file-serving middleware and runs the css
// Set the folder for css & java scripts
app.use(express.static(path.join(__dirname, '..', 'public')))
// app.use(express.static(path.join(__dirname, 'node_modules')))

//need to set up and specify default engine, no extension was provided
app.engine('html', require('ejs').renderFile);
//set view engine to ejs
app.set('view engine', 'html');

//sends views/index.html
app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views/index.html'))
})

// error handling endware
app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
})

app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`))
