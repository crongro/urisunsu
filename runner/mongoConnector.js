var mongodb = require('mongodb');

//sample_db = new mongodb.Db('sample' ,new mongodb.Server('127.0.0.1' , 27017 , {}), {});
//urisunsudb = new mongodb.Db('urisunsudb' ,new mongodb.Server('127.0.0.1' , 27017 , {auto_reconnect: true}), {});
var oServerInfo = {
	ip : '127.0.0.1',
	port : 27017,
	otherInfo : {auto_reconnect : true}
}

var DB_NAME = 'urisunsudb'

console.log("called mongoConnector !!!");

(function() { 

	//start exports
	exports.funtest = function() {
		console.log("call funtest complete !!! ");
	};

	exports.insertSchedule = function(jsonResult) {

//		var urisunsudb = new mongodb.Db('urisunsudb' ,new mongodb.Server('127.0.0.1' , 27017 , {auto_reconnect: true}), {});
		var urisunsudb = new mongodb.Db(DB_NAME ,new mongodb.Server(oServerInfo.ip , oServerInfo.port, oServerInfo.otherInfo), {});

		urisunsudb.open(function (err,db) {

			db.collection('matchSchedule' , function(err, collection) {

				var doc = jsonResult;
				collection.insert(doc, function() {
					db.close();
					console.log("insert ok")
				});
			});
		})
	}

	exports.removeSchedule = function() {

		var urisunsudb = new mongodb.Db(DB_NAME ,new mongodb.Server(oServerInfo.ip , oServerInfo.port, oServerInfo.otherInfo), {});

		urisunsudb.open(function (err,db) {

			db.collection('matchSchedule' , function(err, collection) {
				collection.remove();
				db.close();
				console.log("remove ok")
			});
		})
	}

	exports.removeAllSchedule = function() {
		dbConnector('matchTest', function(db,col) {
			col.remove();
			db.close();
		})
	}

	exports.findPlayerNames = function(clubName1,clubName2, jsonResult, callbackFn) {
                console.log("====================");
                console.log("  start findPlayernames of " , clubName1);
		/*
		dbConnector('playerInfo' , function(db, collection) {
				collection.findOne({"club" : clubName} , function(err, item) {
					console.log(item.name);
					db.close();
				})
		})
		*/
		var urisunsudb = new mongodb.Db(DB_NAME ,new mongodb.Server(oServerInfo.ip , oServerInfo.port, oServerInfo.otherInfo), {});

		urisunsudb.open(function (err,urisunsudb) {
			urisunsudb.collection('playerInfo' , function(err, collection) {

                                /*
				collection.findOne({club: clubName1}, function(err,item){

					var name = "";

					//urisunsudb.close();
					if(item) name = item.name;

					//find 'name2'
					collection.findOne({club: clubName2}, function(err,item){

						urisunsudb.close();
						if(item && name) name = name + "," + item.name;
						else if(item && !name) name = item.name;

						if (name) jsonResult['name'] = name;
						callbackFn(jsonResult);
					});
				});
                                */


                                //한팀에 여러명이 있는 경우가 있어서 findone -> find함수로 리팩토링


                                function findNames(clubName, preName) {
                                    collection.find({club: clubName}).toArray(function(err,items){
                                            
                                            var sName = items.map(function(v,i,o) {
                                                return v.name;
                                            }).join(",");


                                            if(clubName === clubName1) {
                                                findNames(clubName2, sName);
                                            } else {
                                                if(preName && sName) sName = preName+sName;
                                                else if (preName && !sName) sName = preName;
                                                //두 번째 연결이면, DB연결 끊고
                                                urisunsudb.close();
                                                if(sName) jsonResult['name'] = sName;
                                                callbackFn(jsonResult);
                                            }
                                    });
                                }

                                findNames(clubName1);


			});
		});
	}

	function dbConnector (collectionName , fAction) {
		urisunsudb.open(function (err,urisunsudb) {
			urisunsudb.collection(collectionName , function(err, collection) {
				fAction(urisunsudb,collection);
			});
		});
	}


	function dbtest () {
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
;
			collection.findOne({dummyIndex : 4}, function(err,item){
				console.log(item.matchClubs, item.matchDate);
				db.close();
			})
			*/
			collection.remove();
			});
		});
	}
})();
