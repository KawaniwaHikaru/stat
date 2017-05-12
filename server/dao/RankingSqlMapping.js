// CRUD SQL template
var ranking = {
    insert: 'INSERT INTO ranking(date, site, keyword, google, googleBaseRank, yahoo, bing, ' +
    'global_monthly_searchs, regional_monthly_searchs ) ' +
    'VALUES(?,?,?,?,?,?,?,?,?)',
    // update:'update ranking set name=?, age=? where id=?',
    delete: 'delete from ranking where id=?',
    queryById: 'select * from ranking where id=?',
    queryAverage: 'SELECT `date`, ' +
    'avg(google) as google, ' +
    'avg(googleBaseRank) as googleBaseRank, ' +
    'avg(yahoo) as yahoo , ' +
    'avg(bing) as bing ' +
    'FROM ranking ' +
    'WHERE `date` between ? and ? ' +
    'GROUP BY `date`;',
    queryWeightAverage: 'SELECT `date`, ' +
    'avg(global_monthly_searchs) / max(global_monthly_searchs) as weighted, ' +
    'avg(google) as google, ' +
    'avg(googleBaseRank) as googleBaseRank, ' +
    'avg(yahoo) as yahoo , ' +
    'avg(bing) as bing ' +
    'FROM ranking ' +
    'WHERE `date` between ? and ? ' +
    'GROUP BY `date`;'
};

module.exports = ranking;