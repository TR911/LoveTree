const express = require('express')

const path = require('path')

const app = express()

app.listen(80, () => {
    console.log('server running...');
})


app.use('/public', express.static('./public'))


app.get('/', (req, res) => {

    //res.sendFile(path.join(__dirname, 'index.html'))

    res.send("server running ok")
})






