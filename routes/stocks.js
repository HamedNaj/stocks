import express from 'express'
import {getStocks, updateStocks , addStock, getStockHistory,searchStocks,changeActive} from "../controllers/stocks.js";

const router = express.Router()

router.get('/', getStocks)
router.get('/history/:assetId', getStockHistory)
router.get('/search/:keyword', searchStocks)
router.post('/update', updateStocks)
router.post('/add', addStock)
router.post('/change_active', changeActive)

export default router