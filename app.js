const express = require('express')                  
const app = express()
const hotelRouter = require('./routers/hotelRouter')
const authRouter = require('./routers/auth.router')
app.use(express.json()) // data doesn't get added without this line
// const morgan = require('morgan')
// app.use(morgan('dev'))

// app.use(express.static('./public'))

// const logger = (req, res, next) => {
// console.log(`${req.method} ${req.url}`)
// next()
// }
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
// app.use((req, res, next)=>{
//     req.requestedAt = new Date().toISOString()
//     next()
// })
// const user = app.param('id', (req, res, next,val, name)=>{
//     console.log(`the user data: ${value}`)
//     next()
// })
// app.get('/api/v1/users',(req, res)=>{
//     res.send('All user data')
// }) 
// app.get('/api/v1/users',(req, res)=>{
//     res.send('user data with ' + req.params.id)
// })
// app.use(logger)
app.use('/api/v1/hotels', hotelRouter)
app.use('/api/v1/auth', authRouter)

//wildcard routing
app.use((req, res) => { //to catch all unwanted requests
    res.status(404).json({
        status: 'fail',
        message: `the ${req.originalUrl} is not found`
    })
})

//global error handling
app.use((error, req, res, next)=>{
  res.status(error.status.code || 500).json({
    status: error.status,
    message: error.message
  })
  next()
})

module.exports = app 

