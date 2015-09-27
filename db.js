var mysql = require('mysql');
var connection = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: 'm+0j0M3=.6Si',
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

var query = connection.query('INSERT INTO portals (name, lat, lng) VALUES (1, 2, 3) ON DUPLICATE KEY UPDATE name=67, lat=5,lng=?', [10], function(error, result){
      if(error){
         throw error;
      }else{
         var resultado = result;
      }
   }
);
connection.end();
