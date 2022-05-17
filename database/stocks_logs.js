import mongoose from 'mongoose'

const stocksLogsSchema = mongoose.Schema({
  name: {type: String, required: true},
  assetId: {type: String, required: true},
  s1: {type: String, required: false},
  s2: {type: String, required: false},
  s3: {type: String, required: false},
  r1: {type: String, required: false},
  r2: {type: String, required: false},
  r3: {type: String, required: false},
  pivot: {type: String, required: false},
  companySellerCount: {type: String, required: false},
  companySellVolume: {type: String, required: false},
  companyBuyVolume: {type: String, required: false},
  companyBuyerCount: {type: String, required: false},
  buyIndicators: {type: String, required: false},
  neutralIndicators: {type: String, required: false},
  sellIndicators: {type: String, required: false},
  closedPrice: {type: String, required: false},
  changedPercent: {type: String, required: false},
  date: {type: String, required: true},
  signalType: {type: String, required: false},
  id: {type: String},
})

const stocks = mongoose.model('stocks_logs', stocksLogsSchema)
export default stocks