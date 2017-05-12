var express = require('express');
var router = express.Router();
const rankingDAO = require('../dao/RankingDao');

router.get('/avg', function(req, res, next) {
  rankingDAO.queryRange(req, res, next);

});

router.get('/weighted', function(req, res, next) {
  // rankingDAO.queryRange(req, res, next);
  rankingDAO.queryWeightedRange(req, res, next);
});


module.exports = router;
