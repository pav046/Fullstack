const express = require('express')
const userRouter = require('./routes/author_routes')
const bookRouter = require('./routes/book_routes')
const PORT = process.env.PORT || 8080
const app = express()
const cors = require("cors")

app.use(cors())
app.use(express.json())
app.use('/api', userRouter)
app.use('/api', bookRouter)
app.listen(PORT, () => console.log(`server srarted: (PORT ${PORT})`))
