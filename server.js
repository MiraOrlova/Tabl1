var fs=require('fs');

var express=require('express');
var bodyParser = require('body-parser')
var app=express();
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/',function(req,res){
	res.sendFile(__dirname+'/users.html');
})
   

app.get('/getusers',function(req,res){
	fs.readFile('data.json','utf-8',
		function(err,data){
		//console.log(data);
		res.send(data);
	})
})

app.post('/delete',function(req,res){
	//console.log(req.body);
	fs.readFile('data.json','utf-8',
		function(err,data){
		var mas=JSON.parse(data);
		mas.splice(req.body.index,1);
		var masjson=JSON.stringify(mas);
		fs.writeFile('data.json',masjson);
	})
	res.send('Delete user!');
})


app.post('/addusers',function(req,res){
	console.log(req.body);
	fs.readFile('data.json','utf-8',
		function(err,data){
		var mas=JSON.parse(data);
		mas.push(req.body);
		var masjson=JSON.stringify(mas);
		fs.writeFile('data.json',masjson);
	})
	res.send('Add user!');
})


app.post('/updateusers',function(req,res){
	console.log(req.body);
	var index=req.body.rowIndex;
	delete req.body.rowIndex;
	console.log(req.body);
	fs.readFile('data.json','utf-8',
		function(err,data){
		var mas=JSON.parse(data);
		mas.splice(index,1,req.body);
		var masjson=JSON.stringify(mas);
		fs.writeFile('data.json',masjson);
	})
	res.send('Update user!');
})





app.listen(process.env.PORT||8080);
console.log('Run server!');
