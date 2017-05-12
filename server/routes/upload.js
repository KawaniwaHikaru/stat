const express = require('express');
const ElasticsearchCSV = require('./elasticsearch-csv');
const router = express.Router();
const csv = require('fast-csv');
const fs = require('fs');


router.post('/', function (req, res) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let csvFile = req.files.csvFile;

    // Use the mv() method to place the file somewhere on your server
    csvFile.mv('./tmp.csv', function (err) {
        if (err)
            return res.status(500).send(err);

        // fs.createReadStream("./tmp.csv",  {encoding: 'utf-16le'})
        //     .pipe(csv({headers: true, delimiter: "\t"}))
        //     .on("data", function(data){
        //         console.log(data);
        //     })
        //     .on("end", function(){
        //         res.status(200).json("{'result':'ok'}");
        //     });

        const esCSV = new ElasticsearchCSV({
            es: {index: 'stats', type: 'rank', host: 'elasticsearch:9200'},
            csv: {filePath: './tmp.csv', headers: true, delimiter: "\t"}
        });

        esCSV.import()
            .then(function (response) {
                // Elasticsearch response for the bulk insert
                res.json('ok');
                // res.status(204).end()
            }, function (err) {
                // throw error
                throw err;
            });

    });
});

module.exports = router;
