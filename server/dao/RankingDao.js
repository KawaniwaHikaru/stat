const mysql = require('mysql');
const $conf = require('../conf/db');
const $sql = require('../dao/RankingSqlMapping');
const $util = require('../util/util');

// connection pool caching with overwrite
let pool = mysql.createPool($util.extend({}, $conf.mysql));

module.exports = {
    add: function (param) {
        pool.getConnection((err, connection) => {

            if (err)
                console.log(err);

            let fields = [
                param[Object.keys(param)[0]],// UTF16 error couldn't get beginning of line properly
                param.Site,
                param.Keyword,
                parseInt(param.Google) || 0,
                parseInt(param['Google Base Rank']) || 0,
                parseInt(param.Yahoo) || 0,
                parseInt(param.Bing) || 0,
                parseInt(param['Global Monthly Searches']) || 0,
                parseInt(param['Regional Monthly Searches']) || 0
            ];

            connection.query($sql.insert, fields, (err, result) => {
                if (err) {
                    console.log(err);
                }

                // returnJson(res, result);
                connection.release();
            });
        });
    },
    queryRange: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            connection.query($sql.queryAverage, ['2000-01-01', '2999-12-31'], function (err, result) {
                if (! err) {
                    res.json(JSON.stringify(result));
                }
                else {
                    res.json(err);
                }
                connection.release();
            });
        });
    },
    queryWeightedRange: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            // console.log($sql.queryWeightAverage);
            connection.query($sql.queryWeightAverage, ['2000-01-01', '2999-12-31'], function (err, result) {
                if (! err) {
                    res.json(JSON.stringify(result));
                }
                else {
                    res.json(err);
                }
                connection.release();
            });
        });
    },
    purge: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            // console.log($sql.queryWeightAverage);
            connection.query($sql.queryWeightAverage, ['2000-01-01', '2999-12-31'], function (err, result) {
                if (! err) {
                    res.json(JSON.stringify(result));
                }
                else {
                    res.json(err);
                }
                connection.release();
            });
        });
    }
};