//----------------------------------------------------------------------------------------
// Dev stuff !CHANGE!

let Page   = require('./../modules/Pager.js'),
	Bundle = require('./../modules/Bundle.js');


let cheerio = require('cheerio');

let pagesCfg = [
	{
		type: 'preland',
		url: './input/preland/index.html'
	},
	{
		type: 'land',
		url: './input/land/index.html'
	},
	{
		type: 'safepage',
		url: './input/safepage/index.html'
	}
]

module.exports = (app) => {
	app.get('/', async (req, res) => {
		let Pages = [];
		pagesCfg.forEach(async (item, i, array) => {
			Pages.push(new Page({ Url: item.url, Type: item.type }))
		})

		let bundle = new Bundle({Url: './output/template/index.html'})
		await bundle.settup()
		Pages.forEach( async(item, i, array) => {
			await bundle.inputCode({type: item.Type, Body: item.Body})
		})
		bundle.save();
	})
}