const express = require('express')
const compression = require('compression')
const path = require('path')

const app = express()

const PORT = process.env.PORT || 4000

app.use(compression())

app.use('/js', express.static(path.join(__dirname, '../dist', './js')))
app.use('/css', express.static(path.join(__dirname, '../dist', './css')))
app.use('/', express.static(path.join(__dirname, '../dist')))
app.get('*', (_, res) => res.sendFile(path.join(__dirname, '../dist', 'index.html')))

app.listen(PORT, () => {
  console.log(`Storefront listening at http://localhost:${PORT}`)
})
