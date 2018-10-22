let Page = require('./Pager.js')
    fsc  = require("fs-cheerio");;


class Bundle extends Page{
	constructor(props){
		super(props);
		this.blocks = {
			preland: `.ddh-1`,
			land: `.ddh-2`,
			safepage: `.ddh-3`
		}
		this.Code = null;
	}

	async settup(){
		 this.Code = await fsc.readFile(this.Url);
	}

	inputCode(page){
		switch(page.type){
			case 'preland': {
				this.Code(this.blocks.preland).append(page.Body);
				break;
			};
			case 'land': {
				this.Code(this.blocks.land).append(page.Body);
				break;
			};
			case 'safepage': {
				this.Code(this.blocks.safepage).append(page.Body);
				break;
			};
		}
	}

	async save(){
		await fsc.writeFile('./output/prod/index.html', this.Code);
		console.log("Save!");
	}




}

module.exports = Bundle;