import {findMainVariable, getCompanyBuyStats, getResAndSups, getSignalType} from './util.js'
import Stocks from '../database/stocks.js'
import StocksLogs from '../database/stocks_logs.js'
import {agent} from "./agent.js";

export const stockUpdater = async (stocks) => {
  for (let stock of stocks) {
	try {
	  const buyers = await agent.get(`https://rahavard365.com/asset/${stock.assetId}`)
	  const buyerHtml = buyers.text
	  const companyButStats = findMainVariable(buyerHtml, 'layoutModel')
	  const {
		companySellerCount,
		companySellVolume,
		companyBuyVolume,
		companyBuyerCount
	  } = getCompanyBuyStats(companyButStats)
	  const indicators = await agent.get(`https://rahavard365.com/asset/${stock.assetId}/indicator`)
	  const html = indicators.text
	  const mainVariable = findMainVariable(html, 'layoutModel')
	  const category = mainVariable.asset.category.parent.short_name

	  if (!mainVariable) throw new Error('layout model did not found')
	  const {pivot, r1, r2, r3, s1, s2, s3} = getResAndSups(mainVariable, 'PivotPointFibonacci(30)')
	  // if (!r1 || !s1) throw new Error('resistance did not found')
	  const [buyIndicators, neutralIndicators, sellIndicators] = mainVariable.technical_sum_List
	  if (buyIndicators  === undefined || sellIndicators === undefined) throw new Error('indicators did not found')
	  const {close_price: closedPrice, close_price_change_percent: changedPercent} = mainVariable.trade
	  const today = new Date().toISOString().slice(0, 10)
	  const signalType = getSignalType({buyIndicators, neutralIndicators, sellIndicators})
	  const companyBuyAmount = parseInt(companyBuyVolume) * parseInt(closedPrice)
	  const companySellAmount = parseInt(companySellVolume) * parseInt(closedPrice)
	  const data = {
		name: stock.name,
		assetId: stock.assetId,
		buyIndicators,
		neutralIndicators,
		sellIndicators,
		closedPrice,
		changedPercent,
		companyBuyAmount,
		companySellAmount,
		pivot,
		r1:r1 || '0',
		r2:r2 || '0',
		r3:r3 || '0',
		s1:s1 || '0',
		s2:s2 || '0',
		s3:s3 || '0',
		companySellerCount,
		companySellVolume,
		companyBuyerCount,
		companyBuyVolume,
		signalType,
		category
	  }
	  await Stocks.findByIdAndUpdate(stock._id, {
		...data,
		lastUpdate: today,
	  }, {new: true})
	  await StocksLogs.updateOne({date: today, assetId: stock.assetId}, {
		...data, date: today
	  }, {upsert: true})
	} catch (e) {
	  console.log('ERROR IN UPDATING STOCK : ', stock.name, e.message)
	}
  }
  return {}
}