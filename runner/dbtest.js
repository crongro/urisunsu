var mongodb = require('mongodb');
db = new mongodb.Db('sample' ,new mongodb.Server('127.0.0.1' , 27017 , {}), {});

db.open(function (err,db) {
	db.collection('matchTest' , function(err, collection) {
		/*
		doc = {
			dummyIndex : 4,
			matchDate  : new Date(2013,7,11,22,50,00),
			matchClubs : 'la다저스 vs 콜로라도',
			player : '류현진,추신수',
		};

		collection.insert(doc, function() {
		});

		collection.findOne({dummyIndex : 4}, function(err,item){
			console.log(item.matchClubs, item.matchDate);
			db.close();
		})
		*/
		
		collection.remove();
		

		/*
		collection.update({name:"jisu"} , {age :44}, function() {
			db.close();
		});
		*/

		/*
		collection.update({name:"jisu"} , {$set:{age :44}}, function() {
			db.close();
		});
		*/

		
		 // Update the document using an update, ensuring creation if it does not exist
		 /*
		collection.update({age:35} , {sex:"woman", name:'fellaini'}, {upsert:true,w:1} , function() {
				
			/*  confirm value
			collection.findOne({name:"fellaini"} , function(err, item) {
				console.log(item.sex);
				console.log(item.name);
				db.close();
			});
		});
		*/

		/*  confirm value
		collection.findOne({name:"hary"} , function(err, item) {
			console.log(item.sex);
			console.log(item.name);
			db.close();
		});
		*/
		
	});
});
		
