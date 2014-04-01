'use strict';
var neo4j = require('node-neo4j'),
db = new neo4j('http://localhost:7474');



exports.getCustomers = function(req, res) {
  db.cypherQuery("MATCH (c:scrumCustomer) RETURN c", function(err, result){
    if(err) throw err;
    res.json(result.data);
});
  };

exports.addMail = function(req,res) {
    var data = req.body;
        
      console.log('addMail');
      console.log(data);
   db.cypherQuery("START n=NODE(" + data.customerId + ") CREATE (t:scrumPhone "+data.data+"), CREATE (n)-[ANSWERS_TO {use:"+data.use+"}]->(t)",function(err,result){
        if(err)throw err;
        res.json(result.data);
    });
};

  exports.updateMail = function(req,res) {
    var data = req.body;
        
      console.log('updateMail');
      console.log(data);
    db.cypherQuery("START n=NODE(" + data.id + ") SET n="+data.data,function(err,result){
        if(err)throw err;
        res.json(result.data);
    });
};

    exports.deleteMail = function(req,res) {
    var data = req.body;
        
      console.log('deletemail');
      console.log(data);
    db.cypherQuery("START n=NODE(" + data.id + ") match (n)-[r]-() delete n,r",function(err,result){
        if(err)throw err;
        res.json(result.data);
    });
};
