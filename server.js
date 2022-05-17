import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import stocksRoutes from './routes/stocks.js'

const app = express()
dotenv.config()

app.use(bodyParser.json({limit: '30mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}))
app.use(cors())


const PORT = process.env.PORT || 5000

mongoose.connect(process.env.CONNECTION_URL
  , {
	useNewUrlParser: true,
	useUnifiedTopology: true,
  })
  .then(() => {
	app.listen(PORT, () => console.log('Server running on port ', PORT))
	console.log('DB IS CONNECTED')
  })
  .catch(err => {
	console.log('error in connecting database ====>>>', err)
  })
app.use(express.urlencoded());
app.use('/stocks', stocksRoutes)
app.use(express.static("./client/build"));
// app.get('*', function (req, res) {
//   res.sendFile('index.html', {root: `./client/build`});
// })