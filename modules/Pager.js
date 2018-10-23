let cheerio = require('cheerio'),
	fs		= require('fs');

class Page{
	constructor(data){
		this.Url = data.Url;
		this.Type = data.Type;
		this.Code = null;
		this.Body = null;
		this.Head = null;
		this.css = null;
		this.settup();
		this.settupCss();
	}

	settup(){
		let $ = cheerio.load(fs.readFileSync(this.Url));
		this.Code = $;
		this.Body = $('body').html();
		this.Head = $('head').html();

	}

	async settupCss(){
		let styles = '';
		await fs.readdirSync(`${__dirname}/../input/${this.Type}/assets/`).forEach(async file => {
		    let type      = file.substr(file.indexOf(".") + 1),
		        instaName = file.split('.')[0];

		    	if ( type == 'css' ){
		    		let style = await fs.readFileSync(`${__dirname}/../input/${this.Type}/assets/${file}`);
		    		style = style.toString();
		    		styles = styles + style;
		    	}
		})
		this.css = styles;
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