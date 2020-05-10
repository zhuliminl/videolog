var express = require('express');
var router = express.Router();
const querystring = require('querystring');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
  path: 'out.csv',
  header: [
    {id: 'clientType', title: '客户端'},
    {id: 'videoName', title: '视频名称'},
    {id: 'videoHeight', title: '视频高度'},
    {id: 'videoWidth', title: '视频宽度'},
    {id: 'videoBitrate', title: '码率'},
    {id: 'videoSize', title: '视频大小'},
    {id: 'videoDuration', title: '视频时间'},
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
  const {params = ''} = query
  console.log('saul -------params', params)
  const params_obj = querystring.parse(params)
  const {
    width = '',
    height = '',
    bitrate = '',
  } = params_obj

  const data = [
    {
    ...query,
    testTime,
    videoWidth: width,
    videoHeight: height,
    videoBitrate: bitrate,

    },
  ];

  console.log('------------------------------------------------------')
  console.log(data)

  csvWriter
    .writeRecords(data)
    .then(()=> console.log('The CSV file was written successfully'));


  return res.json(query)
});

module.exports = router;
