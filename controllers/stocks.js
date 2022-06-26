import {stockUpdater} from "../helpers/updateStocks.js";
import Stocks from '../database/stocks.js'
import StocksLogs from "../database/stocks_logs.js";
import {agent} from '../helpers/agent.js'
import _ from 'lodash'

export const searchStocks = async (req, res) => {
  const {keyword} = req.params
  try {
	const searchResult = await agent.get(`https://rahavard365.com/api/search/items/real?keyword=${encodeURI(keyword)}`)
	const searchResultInJson = JSON.parse(searchResult.text).data.search_result
	const result = searchResultInJson.filter(res=> {return res.trade_symbol === keyword})
	res.status(200).json(result)
  } catch (e) {
	res.status(404).json({message: e.message})
  }
}

export const getStocks = async (req, res) => {

  try {
	const stocks = await Stocks.find(req.query)
	const categories = _.groupBy(stocks,'category')
	const categoryGroupBy = []
	Object.keys(categories).forEach(c=>{
	  categoryGroupBy.push({name:c,count:categories[c].length})
	})
	const result = {data: stocks}
	if (!req.query.category) result.categoryGroupBy = categoryGroupBy
	res.status(200).json(result)
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
export const changeActive = async (req, res) => {
  const {id,active} = req.body
  try {
	const available = await Stocks.findById(id)
	if (!available) {
	  res.status(404).json({errorMessage: 'not found'})
	  return
	}
	await Stocks.findByIdAndUpdate(id, {
	  active
	})
	res.status(204).json({})

  } catch (e) {
	res.status(404).json({message: e.message})
  }
}