const express = require('express'); //引入核心模块
const app = express(); // 实例化一个应用
// 所有的程序操作  都是使用这个应用处理的

const noteNews = require('./static/noteNews.json'); //本地json文件数据
const antiviraNews = require('./static/antiviral.json'); //本地json文件数据
const topic = require('./static/dailyTopic.json');
const eyecatcher = require('./static/eyecatcher.json');
// const noteNewsRoutes = express.Router();
// app.use('/api');
//express 配置结束

module.exports = {
	devServer: {
		before(app) {
			app.get('/news/notice', (req, res) => {
					res.json({
						error: 0,
						data: noteNews
					});
				}),
				app.get('/news/antiviral', (req, res) => {
					res.json({
						error: 0,
						data: antiviraNews
					});
				}),
				app.get('/topic', (req, res) => {
					res.json({
						error: 0,
						data: topic
					});
				}),
				app.get('/eyecatcher', (req, res) => {
					res.json({
						error: 0,
						data: eyecatcher
					});
				})
		},
		open: process.platform === 'darwin',
		host: 'localhost',
		port: 8080,
		https: false,
		hotOnly: false,
		
	}

}
