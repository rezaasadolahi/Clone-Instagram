const express = require('express')
const app = express()
require('dotenv').config({ path: './config.env' })
const cors = require('cors')
//* MongoDB
const ConnectMongo = require('./Server/Database/connect')


ConnectMongo()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


//* routers
app.use('/', require('./Server/Routers/routes'))



let PORT = process.env.PORT || 6071
app.listen(PORT, () => console.log(`http://localhost:${PORT}`)).on('error', (e) => console.log('Error happened: ', e.message))