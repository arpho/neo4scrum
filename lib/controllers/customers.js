'use strict';
var neo4j = require('node-neo4j'),
db = new neo4j('http://localhost:7474');

async = require('async');

exports.getCustomers = function(req, res) {
  db.cypherQuery("MATCH (c:scrumCustomer) RETURN c", function(err, result){
    if(err) throw err;
    res.json(result.data)
});
  }

exports.getCustomer = function(req, res) {
    var customerId = req.params.customerId.substring(1);
    async.parallel([
        function(callback) { //get the customer
            var  query = "START n=NODE("+customerId+") RETURN n";
            db.cypherQuery(query, function(err,result) {
                                                            if(err) callback(err); 
                                                            else     callback(null,result);
                                                        })
        },
        function(callback) { //get the telephones
            var query = "START n=NODE("+customerId+") MATCH (n)-[r:ANSWERS_TO]-(t) RETURN t,r";
            db.cypherQuery(query, function(err,result) {
                if(err) callbak(err); // async termina
                else {
                    var telephones = [];
                    for (var i=0, i<result.t.length;i++){
                        
                        telephones.push({number:result.t[i],use:result.r[i].use,note:result.t[i].note})
                    }
                    callback(null,telephones);
                }
            })
        }
    ])
 /* db.cypherQuery(query, function(err, result){
    if(err) throw err;
    res.json(result.data)
});*/
  }
