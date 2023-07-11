const express = require('express')
const routes = require('./src/routes')
const app = express()
const port = 8000

app.set('views', './src/views')
app.set('view engine', 'ejs')

app.use(routes)

app.listen(port, () => {
    console.log('Esta funcionando http://localhost:'+port)
})