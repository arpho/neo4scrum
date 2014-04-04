'use strict';
var neo4j = require('node-neo4j'),
db = new neo4j('http://localhost:7474');



exports.getCustomers = function(req, res) {
  db.cypherQuery("MATCH (c:scrumCustomer) RETURN c", function(err, result){
    if(err) throw err;
    res.json(result.data);
});
};

exports.getCustomer = function(req, res) {
    var customerId = req.params.customerId.substring(1);
    var  query = "START user = NODE(" + customerId +") MATCH (user)-[r]-(o) RETURN user,r,o";
    console.log('#################################################'); 
    console.log(query);
            db.cypherQuery(query, function(err,result) {
                                                            if(err) {
                                                            	console.log(err); }
                                                            else{
                                                                res.json(result);
                                                                console.log('found something');
                                                                console.log(result);
                                                                }
                                                      });
};
 /* db.cypherQuery(query, function(err, result){
    if(err) throw err;
    res.json(result.data)
});*/
  
