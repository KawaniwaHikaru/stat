const express = require('express');
const router = express.Router();
const csv = require('fast-csv');
const fs = require('fs');
const rankingDAO = require('../dao/RankingDao');

router.get('/purge', function (req, res, next) {
    rankingDAO.purge(req,res, next);
    res.status(200);
});

router.post('/upload', function (req, res, next) {

    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let csvFile = req.files.csvFile;

    // Use the mv() method to place the file somewhere on your server
    csvFile.mv('./tmp.csv', function (err) {
        if (err)
            return res.status(500).send(err);

        fs.createReadStream("./tmp.csv", {encoding: 'utf-16le'})
            .pipe(csv({headers: true, delimiter: "\t"}))
            .on("data", function (data) {
                rankingDAO.add(data);
            })
            .on("end", function () {
                res.status(200).json("{'result':'ok'}");
            });

    });
});

module.exports = router;
