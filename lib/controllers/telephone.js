'use strict';
var neo4j = require('node-neo4j'),
db = new neo4j('http://localhost:7474');



exports.getCustomers = function(req, res) {
  db.cypherQuery("MATCH (c:scrumCustomer) RETURN c", function(err, result){
    if(err) throw err;
    res.json(result.data);
});
  };

exports.addTelephone = function(req,res) {
    var data = req.body;
      console.log('addTelephone');
      console.log(data);
    db.cyperQuery("START n=NODE(" + data.customerId + ") CREATE (t:scrumPhone "+data.data+"), CREATE (n)-[ANSWERS_TO {use:"+data.use+"}]->(t)",function(err,result){
        if(err)throw err;
        res.json(result.data);
    });
};

  exports.updateTelephone = function(req,res) {
    var data = req.body;
      console.log('updateTelephone');
      console.log(data);
    db.cyperQuery("START n=NODE(" + data.id + ") SET n="+data.data,function(err,result){
        if(err)throw err;
        res.json(result.data);
    });
};

    exports.deleteTelephone = function(req,res) {
    var data = req.body;
        
      console.log('deleteTelephone');
      console.log(data);
    db.cyperQuery("START n=NODE(" + data.id + ") match (n)-[r]-() delete n,r",function(err,result){
        if(err)throw err;
        res.json(result.data);
    });
};
