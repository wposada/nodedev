function myparseo(filesr,fechar){

htmlToJson=require('html-to-json');
var lineReader = require('line-reader');
var mysql = require('mysql');
var res="";
var time="";
var enl="";
var res="";
var lat="";
var lng="";
var faction="";
var names="";
var dirs="";
var action="";
var txt="";
var agent="";
var fecha=fechar;
var arch=filesr;
var fechafilecont="";
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

function prettyJSON(obj) {
    console.log(JSON.stringify(obj, null, 2));
}
function Query(){
var query = connection.query('INSERT INTO portals (name, lat, lng) VALUES (1, 2, 3) ON DUPLICATE KEY UPDATE name=67000, lat=5,lng=?', [10], function(error, result){
      if(error){
         throw error;
      }else{
         var resultado = result;
      }
   }
);
}

function Parseando(html){
//var html='<div class="plext"><!-- false --><div class="pl_timestamp"><div class="pl_timestamp_container"><div class="pl_timestamp_date">2:30PM</div><div class="pl_timestamp_spacer"></div></div></div><div class="pl_content pl_broad"><span class="ENLIGHTENED pl_nudge_player" data-playerstr="@pepitaIluminada" data-isfaction="false">pepitaIluminada</span> linked <span class="pl_portal_name" data-plat="4.591753" data-plng="-74.12433">Piramide De Chichen Itza</span> <span class="pl_portal_address">(Calle 38AS # 34B-1 a 34B-99, Centro Mayor, Chevignon Centro Mayor, Bogotá, Cundinamarca, Colombia)</span> to <span class="pl_portal_name" data-plat="4.592607" data-plng="-74.124022">Colgante Tairona</span> <span class="pl_portal_address">(Calle 38AS # 34D-1 a 34D-33, Centro Mayor, Chevignon Centro Mayor, Bogotá, Cundinamarca, Colombia)</span></div></div>'
//var html='<div class="plext"><!-- false --><div class="pl_timestamp">
//<div class="pl_timestamp_container"><div class="pl_timestamp_date">10:53AM</div>
//<div class="pl_timestamp_spacer"></div></div></div>
//<div class="pl_content pl_broad">
//<span class="ENLIGHTENED pl_nudge_player" data-playerstr="@dcrodg" data-isfaction="false">dcrodg</span> captured <span class="pl_portal_name" data-plat="4.656798" data-plng="-74.054469">Arbol De Helm</span> <span class="pl_portal_address">(Carrera 7 # 73-1 a 73-99, Bogotá, Cundinamarca, Colombia)</span></div></div>';
var promise = htmlToJson.parse(html, { 
  'time': function ($doc) {
      time = $doc.find('.pl_timestamp_date').text();
      return time;
    },
  'res': function ($doc) {
      res= $doc.find('.RESISTANCE').text();
      return res;   
    },
  'lats': ['.pl_portal_name', function ($coor) {    
    lat= $coor.attr('data-plat');
    return lat;
  }],
  'lons': ['.pl_portal_name', function ($coor) {
    lng= $coor.attr('data-plng');
    return lng;
  }],
  'names': ['.pl_portal_name', function ($spa) {
    names= $spa.text();
    return names;
  }],
  'dirs': ['.pl_portal_address', function ($spa) {
    dirs= $spa.text();
    return dirs;
  }],
  'agent': [".pl_nudge_player", function ($spa) {
     //txt=$spa.text();
     agent=$spa.text();
    return agent;
  }],
   'txt': [".pl_broad", function ($spa) {
     //txt=$spa.text();
   action=$spa.text();
   action2=action.split(" ");
     txt=action2[1];
     return txt;

    }],
  'action': [".pl_content", function ($spa) {
          action2=$spa.text();
          action2=action2.split(" ");
          
    return action[1];
  }],
},function (err, result) {
//  prettyJSON(result);
//Query();
  return result;
});

}



// read all lines:
lineReader.eachLine(arch, function(line) {
  Parseando(line);
  if(time !=""){
      connection.query('INSERT INTO portals (name, lat, lng,address) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE name=?, lat=?, lng=?, address=?',[names,lat,lng,dirs,names,lat,lng,dirs], function(err, rows, fields) {
      //connection.query('INSERT INTO portals (name, lat, lng) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE name=?, lat=?,lng=?',[names,lat,lng,names,lat,lng], function(err, rows, fields) {
     
     // connection.query('INSERT INTO portals (name, lat, lng) VALUES (?, ?, ?)',[names,lat,lng], function(err, rows, fields) {
         if (err) throw err;
      });
  }
   if( txt=="captured"){
      if(res=="") {faction="ENL";}else{faction="RES";}
      captured=fecha+'_'+time;
      fechafilecont=fecha;
      connection.query('INSERT INTO guardians2 (agent, lat, lng,faction,captured,file) VALUES (?, ?, ?, ?,?,?) ON DUPLICATE KEY UPDATE agent=?, lat=?, lng=?,faction=?,captured=?',[agent,lat,lng,faction,captured,fechafilecont,agent,lat,lng,faction,captured,fechafilecont], function(err, rows, fields) {
      //connection.query('INSERT INTO portals (name, lat, lng) VALUES (?, ?, ?)',[names,lat,lng], function(err, rows, fields) {
         if (err) throw err;
      });
  }
  console.log(time+"-"+names+"-"+agent+"---"+faction+"-"+res+"\n");
}).then(function () {
  console.log("I'm done!!");
  connection.end();
});
}



function walk(currentDirPath, callback) {
    var fs = require('fs'),
        path = require('path');
    fs.readdir(currentDirPath, function (err, files) {
        if (err) {
            throw new Error(err);
        }
        files.forEach(function (name) {
            var filePath = path.join(currentDirPath, name);
            var stat = fs.statSync(filePath);
            if (stat.isFile()) {
                callback(filePath, stat);
            } else if (stat.isDirectory()) {
                walk(filePath, callback);
            }
        });
    });
}

function fechaFile(filePath){
   var fs = require('fs');
   var fecha;
    fs.stat(filePath, function(err, stats){
  if(err){
    console.error(err);
  }
  else{
     farchivo=stats.mtime.toISOString().replace(/T/, ' ').replace(/\..+/, '');
     //farchivo=stats.birthtime;
     console.log("-->"+farchivo);
     myparseo(filePath,farchivo);
    return 1;
  }
});
}

/*walk('/media/sf_Ingress/Order/Prueba/', function(filePath, stat) {
    var fs = require('fs');
    var fechasalida=fechaFile(filePath);
    //console.log(filePath+"-"+fechasalida);
});*/

function walkSync(currentDirPath, callback) {
    var fs = require('fs'),
        path = require('path');
    fs.readdirSync(currentDirPath).forEach(function (name) {
        var filePath = path.join(currentDirPath, name);
        var stat = fs.statSync(filePath);
        if (stat.isFile()) {
            callback(filePath, stat);
        } else if (stat.isDirectory()) {
            walk(filePath, callback);
        }
    });
}

walkSync('/media/sf_Ingress/Order/Prueba/', function(filePath, stat) {
        var fs = require('fs');
    var fechasalida=fechaFile(filePath);
});
