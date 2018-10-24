//----------------------------------------------------------------------------------------
// Dev stuff !CHANGE!

let Page   = require('./../modules/Pager.js'),
	Bundle = require('./../modules/Bundle.js');


let cheerio   = require('cheerio'),
	zipFolder = require('zip-folder'),
	rimraf	  = require('rimraf'),
	mkdirp	  = require('mkdirp');

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

async function upload(files, type){

	let pageFile = files.page;
	let assetsFiles = files.assets;
	
	await pageFile.mv(`${__dirname}/../input/${type}/${pageFile.name}`, function(err) {
		if (err){
		    console.log(err);
		}
		        
	});

	await assetsFiles.forEach(function(item, i, arr) {
		item.mv(`${__dirname}/../input/${type}/assets/${item.name}`, function(err) {
			if (err){
			    console.log(err);
			}
		})
	});
}

module.exports = (app) => {
	app.get('/', async (req, res) => {
		res.render('index');
	})

	app.post('/:type', async (req, res) => {
		let type = req.params.type;
		if ( type != 'confirm' ){
			await upload(req.files, type);
		}
		else if ( type == 'confirm' ){
			let Pages = [];
			pagesCfg.forEach(async (item, i, array) => {
				Pages.push(new Page({ Url: item.url, Type: item.type }))
			})

			let bundle = new Bundle({Url: './output/template/index.html'})
			await bundle.settup()
			Pages.forEach( async(item, i, array) => {
				await bundle.inputCode({type: item.Type, Body: item.Body})
				bundle.inputCode({type: 'head', Body: item.Head})
				bundle.inputCode({type: 'css', Body: item.css})
			})
			await bundle.save();
			bundle.replaceNames(Pages);
			bundle.replaceNames(Pages);

			zipFolder('./output/prod', './output/archive.zip', async function(err) {
				    if(err) {
				        console.log('zipped error', err);
				    } else {
				    	res.download('./output/archive.zip');
				        await console.log('zipped success');





				        // remove files
				        await rimraf('./input', function(err){
				        	if ( err ) console.log(err)
				        		 mkdirp('./input', function(err){
						        	if ( err ) console.log(err)
						        		mkdirp('./input/preland', function(err){
								        	if ( err ) console.log(err)
								        		mkdirp('./input/preland/assets', function(err){
										        	if ( err ) console.log(err)
										        });
								        });
						        		mkdirp('./input/land', function(err){
								        	if ( err ) console.log(err)
								        		mkdirp('./input/land/assets', function(err){
										        	if ( err ) console.log(err)
										        });
								        });
								        mkdirp('./input/safepage', function(err){
								        	if ( err ) console.log(err)
								        		mkdirp('./input/safepage/assets', function(err){
										        	if ( err ) console.log(err)
										        });
								        });
						        });
				        });
				        await rimraf('./output/prod', function(err){
				        	if ( err ) console.log(err)
				        		mkdirp('./output/prod', async function(err){
						        	if ( err ) console.log(err)
						        		mkdirp('./output/prod/assets', function(err){
								        	if ( err ) console.log(err)
								    
								        });
						        });
				        });
				       
				              
				     
				    }
				});
		}
		else res.send(200);
	})
}