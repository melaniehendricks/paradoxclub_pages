
/* ============================
	VARIABLES
==============================*/

const express = require('express'),
	app = express(),
	https =  require('https'),
	fs = require('fs'),
	process =  require('process'),
	path = require('path'),
	favicon = require('serve-favicon'),
	winston = require('winston');						// logging

require('winston-daily-rotate-file');						// logging
const { combine, timestamp, printf, colorize, align } = winston.format;		// logging

// SSL keys
const options = {
	key: fs.readFileSync("/etc/letsencrypt/live/paradoxclub.org/privkey.pem"),
	cert: fs.readFileSync("/etc/letsencrypt/live/paradoxclub.org/fullchain.pem")
};


// create server, pass in SSL keys, express instance
// listen on port 443 
https.createServer(options, app).listen(443, () => {
	console.log('server is running on port 443');
});


/* ==================================
	HTTP REQUESTS & LOGGING
  =================================== */

// does not load if request is for IP address, only if request is for paradoxclub.org
app.use('*', function(req, res, next) {
	// if host is defined AND == magnet.paradoxclub.org, load 
	if(req.headers.host && req.headers.host.toLowerCase() == 'magnet.paradoxclub.org'){
		next();
	} else {
		res.status(418).send('<h3>418 I\'m a <a href="https://www.rfc-editor.org/rfc/rfc2324#section-2.3.2" target="_blank">teapot</a></h3>');
	}
});


// if log file DNE, make it and change user/group owner to pi (1000)
if(fs.existsSync('/var/log/http')) {
	console.log('path exists');
	let user = process.getuid();
	console.log('user: ', user);
} else {
	fs.mkdir('/var/log/http', (err) => {
		console.log('path created');
		return console.log('error: ', err);
	});
	fs.chown('/var/log/http', 1000, 1000, (err) => {
		console.log('owner changed');
		return console.log('error: ', err);
	});
}
let user = process.getuid();
console.log('user: ', user);



// daily rotating log file
const fileRotateTransport = new winston.transports.DailyRotateFile({
	filename: '%DATE%.log',
	dirname: '/var/log/http',
	datePattern: 'YYYY-MM-DD',
	frequency: '24h',
//	maxSize: '100m',
	maxFiles: '10',
});


// logger that prints timestamp + message info to rotating log file defined above
const logger = winston.createLogger({
	levels: winston.config.npm.levels,
	level: 'http',
	format: combine(
		colorize({all: true}),
		timestamp({
			format: 'YYYY-MM-DD hh:mm:ss:SSS A'
		}),
		align(),
		printf((http) => `[${http.timestamp}] \n${http.message}`)
	),
	transports: [fileRotateTransport],		// transport data to rotating log file
});


// create data and pass to logger.http.message
app.use('*', function(req, res, next) {
	let data = req.ip + '\n';					// IP
	data += req.method + '\n';					// method
	data += req.originalUrl + '\n';					// original URL
	Object.entries(req.headers).forEach(([key,value]) => {
		data += key + ': ' + value + '\n';			// headers [key:value]
	});
	data += '\n';
	logger.http(data);

	// w/o next(), static files will not be executed
	next();
});



// change from root to pi after logging is finished (/var/log is owned by root)
try {
	process.setgid('pi');
} catch(err) {
	console.log(`Failed to set gid: ${err}`);
}
process.setuid('pi');




/* ========================
   	PAGES
   ======================== */

// ** serves static files in /media  and /projects
app.use(express.static(path.join(__dirname, 'web-data/')));
app.use(express.static(path.join(__dirname, 'web-data/' ,'projects/')));

// serve favicon
app.use(favicon(path.join(__dirname, 'web-data/photos', 'favicon.ico')));

app.get('/', (req, res) => {
	// serve index.html
	res.sendFile(path.join(__dirname, '/web-data/index.html'));
});


// load about page
app.get('/about', (req, res) => {
	res.status(200).send('<h1>About</h1>');
});


// load weather monitor
app.get('/weathermon', (req, res) => {
	res.status(200).send('<h1>Weather Monitor</h1>');
});

// ============ PHOTOS ===========

// maze photo path 
app.get('/media/marina-reich-maze.jpg', (req, res) => {
	res.sendFile(path.join(__dirname, '/web-data/media/marina-reich-maze.jpg'));
});


// ==============================


// JSON for Projects
app.get('/projects.json', (req, res) => {
	res.sendFile(path.join(__dirname, '/web-data/projects.json'));

// LINE BELOW IS USED FOR TESTING ON LOCAL HOST 
	res.setHeader("Access-Control-Allow-Origin", "*");
});


// ======== PROJECTS =============

// book list
app.get('/projects/booklist', (req, res) => {
	res.sendFile(path.join(__dirname, 'web-data/projects/1booklist/build','index.html'));
	res.setHeader("Access-Control-Allow-Origin", "*");
});



// ===============================


// robots
app.get('/robots.txt', (req, res) => {
	res.sendFile(path.join(__dirname, '/web-data/robots.txt'));
});

// Resource Not Found
app.all('*', (req, res) => {
	res.status(404).sendFile(path.join(__dirname, '/web-data/lost.html'));
});






