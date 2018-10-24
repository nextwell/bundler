let Page    = require('./Pager.js')
    fsc     = require("fs-cheerio"),
    replace = require('replace-in-file');


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
			case 'head': {
				this.Code('head').append(page.Body);
				break;
			};
			case 'css': {
					// css in header
				this.Code('head').append(`<style>${page.Body}</style>`);
				break;
			};
		}
	}
	settupCss(){
		// do nothing
	}

	async save(){
		await fsc.writeFile('./output/prod/index.html', this.Code);
		console.log("Save!");
	}

	async replaceNames(arr){
		let imagesList = {
		  files: ['./output/prod/*.html'/*, './output/prod/assets/*.js'*/],
		  from: [],
		  to: [],
		};

		arr.forEach((item, i, array) => {
			imagesList.from.push(...item.oldNames);
			imagesList.to.push(...item.newNames);
		})

		await imagesList.from.push(`url(`);
		imagesList.to.push(`url('assets/`);

		let changes = await replace.sync(imagesList);

		console.log(imagesList);

	}




}

module.exports = Bundle;