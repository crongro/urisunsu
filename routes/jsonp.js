/*
 * GET users listing.
 */

exports.res = function(req, res){

    //normal json response
    res.json([
            {"nope" : "card"}
          ]
    );

  //res.jsonp({"title" : "jisu"});
};
