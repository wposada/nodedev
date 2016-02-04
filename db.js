var mysql = require('mysql');
var connection = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: 'bitnami',
   database: 'cake',
   port: 3306
});
connection.connect(function(error){
   if(error){
      throw error;
   }else{
      console.log('Conexion correcta.');
   }
});

var query = connection.query('INSERT INTO guardians2 (agent, captured, faction,lat,lng) VALUES ("wiil",111,"RES",11,22)', [10], function(error, result){
      if(error){
         throw error;
      }else{
         var resultado = result;
      }
   }
);
connection.end();
