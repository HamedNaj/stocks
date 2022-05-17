import express from 'express'
import {getStocks, updateStocks , addStock, getStockHistory,getStockBySignal,searchStocks} from "../controllers/stocks.js";

const router = express.Router()

router.get('/', getStocks)
router.get('/:signalType', getStockBySignal)
router.get('/history/:assetId', getStockHistory)
router.get('/search/:keyword', searchStocks)
router.post('/update', updateStocks)
router.post('/add', addStock)

export default router