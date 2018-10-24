let cheerio 		 = require('cheerio'),
	fs				 = require('fs');


function randomise(){
	let time     = new Date(),
		dirTime  = time.getTime(),
		dirStr   =  Math.random()
			                .toString(36)
			    			.slice(2, 2 + Math.max(1, Math.min(15, 25)) )
		return `${dirTime + dirStr}`;
}

class Page{
	constructor(data){
		this.Url = data.Url;
		this.Type = data.Type;
		this.Code = null;
		this.Body = null;
		this.Head = null;
		this.css = null;
		this.oldNames = [];
		this.newNames = [];
		this.settup();
		this.settupFiles();
	}

	settup(){
		let $ = cheerio.load(fs.readFileSync(this.Url));
		this.Code = $;
		this.Body = $('body').html();
		this.Head = $('head').html();

	}

	async settupFiles(){
		let styles = '';

		await fs.readdirSync(`${__dirname}/../input/${this.Type}/assets/`).forEach(async file => {
		    let type      = file.substr(file.indexOf(".") + 1),
		        instaName = file.split('.')[0];

		    	if ( type == 'css' ){
		    		let style = await fs.readFileSync(`${__dirname}/../input/${this.Type}/assets/${file}`);
		    		style = style.toString();
		    		styles = styles + style;
		    	}
		    	else if ( type == 'png' || type == 'jpg'){
		    		let oldName = file;
		    		let newName = `${randomise()}.${type}`;
		    		this.oldNames.push(oldName);
		    		this.newNames.push(newName);
		    		
		    		await fs.rename(`${__dirname}/../input/${this.Type}/assets/${file}`, `${__dirname}/../output/prod/assets/${newName}`, (err) => {
		    		}); 
		    	}
		    	else {
		    		await fs.rename(`${__dirname}/../input/${this.Type}/assets/${file}`, `${__dirname}/../output/prod/assets/${file}`, (err) => {
		    			//if (err) console.log(err)
		    		}); 
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
		return this.Head;
	}

}

module.exports = Page;