import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'

const app = express()

// Routes
app.get('/', (req, res) => {
    res.json({ msg: 'Initiated!'})
})

//middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())
app.use(morgan('dev'))
app.use(cookieParser())

// Server listening
const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log('Serve is running on port: ', PORT)
})
