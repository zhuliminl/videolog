var express = require('express');
var router = express.Router();
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
  path: 'out.csv',
  header: [
    {id: 'clientType', title: '客户端'},
    {id: 'videoName', title: '视频名称'},
    {id: 'videoSize', title: '视频大小'},
    {id: 'videoDuration', title: '视频时间'},
    {id: 'videoBitrate', title: '码率'},
    {id: 'loadTime', title: '加载时间'},
    {id: 'testTime', title: '测试日期'},
  ]
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/videolog', function(req, res, next) {
  const { query = {} } = req

  const testTime = new Date().toLocaleTimeString()
  const data = [
    {...query,
    testTime
    },
  ];

  csvWriter
    .writeRecords(data)
    .then(()=> console.log('The CSV file was written successfully'));


  return res.json(query)
});

module.exports = router;
