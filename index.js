const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const {getLyrics, getSong} = require('genius-lyrics-api')

const port = 5000 || process.env.PORT

const app = express()

app.use(cors())
app.use(helmet())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.post('/', (req, res) => {
    const {title, artist} = req.body
    getLyrics({
        apiKey: 'VdM7AoKUP7FgS5uY8PAaKzYFD4-K4TJ27FFuUa1bb3mBqQGut9BCpxJyRRSLEaoC',
        title: title,
        artist: artist,
        optimizeQuery: true
    }).then((lyrics) => {
        if(lyrics !== null) {
            return res.status(200).json(lyrics)
        } else {
            return res.status(404).json('404')
        }
    })
    ;
})

app.listen(port, () => {
    console.log(`server is listening to port: ${port}`)
})