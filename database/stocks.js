import mongoose from 'mongoose'

const stocksSchema = mongoose.Schema({
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
  lastUpdate: {type: String, required: false},
  signalType: {type: String, required: false},
  active: {type: Boolean, required: true},
  id: {type: String},
})

const stocks = mongoose.model('stocks', stocksSchema)
export default stocks