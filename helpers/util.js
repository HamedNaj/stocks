import _ from 'lodash'
import cheerio from "cheerio";

export const getCompanyBuyStats = (values) => {
  const {
	person_company: {
	  company_buyer_count: companyBuyerCount,
	  company_buy_volume: companyBuyVolume,
	  company_seller_count: companySellerCount,
	  company_sell_volume: companySellVolume
	}
  } = values
  return {companySellerCount, companySellVolume, companyBuyVolume, companyBuyerCount}
}
export const getResAndSups = (layoutModel, method) => {
  const values = _.find(layoutModel.pivot_indicators, (val) => {
	return val.short_name_en === method
  })?.values
  const pivot = _.find(values, val => {
	return val.name === 'pivot'
  }).value
  const r1 = _.find(values, val => {
	return val.name === 'r1'
  }).value
  const s1 = _.find(values, val => {
	return val.name === 's1'
  }).value
  const r2 = _.find(values, val => {
	return val.name === 'r2'
  }).value
  const s2 = _.find(values, val => {
	return val.name === 's2'
  }).value
  const r3 = _.find(values, val => {
	return val.name === 'r3'
  }).value
  const s3 = _.find(values, val => {
	return val.name === 's3'
  }).value
  return {pivot, r1, r2, r3, s1, s2, s3}
}
export const findMainVariable = (html, variable) => {
  const $ = cheerio.load(html)
  let scripts = $('script').filter(function () {
	return ($(this).html().indexOf(`var ${variable} =`) > -1);
  });
  let layoutModel = JSON.parse($(scripts[0]).html().trim().split(`var ${variable} = `)[1].replace(';', '').split('\n')[0])
  return layoutModel
}
export const getSignalType = ({buyIndicators, sellIndicators, neutralIndicators}) => {
	const sum = parseInt(buyIndicators) + parseInt(sellIndicators) + parseInt(neutralIndicators)
	if (buyIndicators/sum > 0.50) return 'buy'
	if (sellIndicators/sum > 0.50) return 'sell'
  return 'neutral'
}