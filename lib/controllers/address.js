'use strict';
var neo4j = require('node-neo4j'),
db = new neo4j('http://localhost:7474');





exports.addAddress = function(req,res) {
    var data = req.body;
        
      console.log('addAddress');
      console.log(data);
    db.cyperQuery("START n=NODE(" + data.customerId + ") CREATE (t:scrumPhone "+data.data+"), CREATE (n)-[LIVES_IN {use:"+data.use+"}]->(t)",function(err,result){
        if(err)throw err;
        res.json(result.data);
    });
};

  exports.updateAddress = function(req,res) {
    var data = req.body;
        
      console.log('updateAddress');
      console.log(data);
    db.cyperQuery("START n=NODE(" + data.mailId + ") SET n="+data.data,function(err,result){
        if(err)throw err;
        res.json(result.data);
    });
};

    exports.deleteAddress = function(req,res) {
    var data = req.body;
        
      console.log('deleteTelephone');
      console.log(data);
    db.cyperQuery("START n=NODE(" + data.mailId + ") match (n)-[r]-() delete n,r",function(err,result){
        if(err)throw err;
        res.json(result.data);
    });
};
