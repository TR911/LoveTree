const express = require('express')

const path = require('path')

const app = express()

app.listen(3000, () => {
    console.log('server running...');
})


app.use('/public', express.static('./public'))


app.get('/index', (req, res) => {

    res.sendFile(path.join(__dirname, 'index.html'))

})






