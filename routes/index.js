
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.hellojisu = function(req, res){
  res.render('hello', { title: 'Hello , jisu' });
};

exports.urisunsu = function(db) {
    return function(req, res) {
        var collection = db.get('matchSchedule'); //collection name
        collection.find({},{},function(e,docs){
                console.log("docs - > " + docs.name);
                res.render('urisunsu', {
                    "matchList" : docs
                    });
                });
    };
}
