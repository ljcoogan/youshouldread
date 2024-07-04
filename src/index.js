import express from 'express'

const app = express()

app.get('/', (req, res) => {
    res.send('Hello, world!')
})

app.listen(process.env.PORT, () => {
    console.log(`App started on port ${process.env.PORT}`)
})