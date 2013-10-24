var express = require('express'),
	date = require('date-extended');


var app = express();

app.set('views',__dirname+'/views');
app.set('view engine','jade');

app.use(app.router);
app.use(express.logger('dev'));

app.get('/',function(req,res) {

	var currentDate = new Date(),
		endDate = new Date(2013,11,20);

	console.log(date.format(currentDate, "EEEE, MMMM dd, yyyy"));
	console.log(date.format(endDate, "EEEE, MMMM dd, yyyy"));

	var dayDiff = date(currentDate).difference(endDate, "day").value(),
		i,
		c=0;

	for(i=0; i < dayDiff; i++) {
		if(!date.isWeekend(currentDate))
			c++;

		currentDate = date.add(currentDate,'day',1);
	}

	res.render('index',{daysLeft: c,currentDate:date.format(currentDate, "EEEE, MMMM dd, yyyy")});
});

app.listen(3000);