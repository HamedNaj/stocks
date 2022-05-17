import {updateStocks} from "../helpers/updateStocks.js";
import Stocks from '../database/stocks.js'
import StocksLogs from "../database/stocks_logs.js";
import {agent} from '../helpers/agent.js'

export const searchStocks = async (req, res) => {
  // const test = await Stocks.find({
	// '_id': { $in: ['626e6482fb05330500d6021d']}})
  const test = await Stocks.find({assetId:453})
}

searchStocks()
