const express = require('express');
const router = express.Router();

const isAuth = require('../middleware/isAuth')
const HistoryController = require('../controllers/history');

router.get('/all', isAuth.admin, HistoryController.all);
router.get('/:id', HistoryController.detailOrder);
router.get('/', HistoryController.index);

module.exports = router;
