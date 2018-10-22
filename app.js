let	express    = require('express'),
	requireFu  = require('require-fu'),
	bodyParser = require('body-parser'),
	pug        = require('pug'),
	fileUpload = require('express-fileupload'),
	path	   = require('path');




const app = express();


app.set('view engine', 'pug');

app.use(fileUpload());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(path.join(__dirname, "client")));


const port = 3000;

requireFu(__dirname + '/routes')(app);

app.listen(port, () => console.log(`Bundler | Server started on port ${port}`));