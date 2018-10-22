let cheerio = require('cheerio'),
	fs		= require('fs');

class Page{
	constructor(data){
		this.Url = data.Url;
		this.Type = data.Type;
		this.Code = null;
		this.Body = null;
		this.Head = null;
		this.settup();
	}

	settup(){
		let $ = cheerio.load(fs.readFileSync(this.Url));
		this.Code = $;
		this.Body = $('body').html();
		this.Head = $('head').html();
	}

	getPage(type){
		return this.Code;
	}

	getBody(){
		return this.Body;
	}
	getHead(){
		return this.Body;
	}

}

module.exports = Page;