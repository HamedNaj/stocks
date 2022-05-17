import {stockUpdater} from "../helpers/updateStocks.js";
import Stocks from '../database/stocks.js'
import StocksLogs from "../database/stocks_logs.js";
import {agent} from '../helpers/agent.js'

export const searchStocks = async (req, res) => {
  const {keyword} = req.params
  try {
	const searchResult = await agent.get(`https://rahavard365.com/api/search/items/real?keyword=${encodeURI(keyword)}`)
	const searchResultInJson = JSON.parse(searchResult.text).data.search_result
	const result = searchResultInJson.filter(res=> {return res.trade_symbol === keyword})
	/*const result = [{
	  entity_id: "453",
	  entity_type: "asset",
	  exchange: "بورس تهران",
	  title: "فولاد مبارکه اصفهان",
	  trade_symbol: "فولاد",
	  type: "سهام",
	  type_id: "1",
	  unlisted_item: false
	}]*/
	res.status(200).json(result)
  } catch (e) {
	res.status(404).json({message: e.message})
  }
}

export const getStocks = async (req, res) => {
  try {
	const stocks = await Stocks.find()
	res.status(200).json({data: stocks})
  } catch (e) {
	res.status(404).json({message: e.message})
  }
}
export const getStockHistory = async (req, res) => {
  const {assetId} = req.params
  try {
	const stocksLogs = await StocksLogs.find({assetId})
	res.status(200).json({data: stocksLogs})
  } catch (e) {
	res.status(404).json({message: e.message})
  }
}
export const getStockBySignal = async (req, res) => {
  const {signalType} = req.params
  try {
	const stocks = await Stocks.find({signalType})
	res.status(200).json({data: stocks})
  } catch (e) {
	res.status(404).json({message: e.message})
  }
}
export const updateStocks = async (req, res) => {
  const {assetIds} = req.body
  try {
	const stocks = await Stocks.find({'assetId':assetIds})
	await stockUpdater(stocks)
	res.status(204).json({})
  } catch (e) {
	res.status(404).json({message: e.message})
  }
}
export const addStock = async (req, res) => {
  const {trade_symbol: name, entity_id: assetId} = req.body
  try {
	const available = await Stocks.findOne({assetId})
	if (available) res.status(400).json({errorMessage: 'Already in Database'})
	else {
	  const newStock = new Stocks({name, assetId, active: false})
	  await newStock.save()
	  res.status(200).json({newStock})
	}
  } catch (e) {
	res.status(404).json({message: e.message})
  }
}