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

walk('/media/sf_Ingress/Order/Julio/', function(filePath, stat) {
    console.log(filePath);
    fs.stat(filePath, function(err, stats){
  if(err){
    console.error(err);
  }
  else{
    //comprobamos si es un directorio
    console.log("Es un directorio? =>", stats.isDirectory());
    //comprobamos si es un fichero
    console.log("Es un fichero? =>", stats.isFile());
    //obtenemos el tamaño en bytes del fichero
    console.log("Tamaño fichero =>", stats.size);
    //comprobamos si el fichero es un enlace simbolico
    console.log("Es un enlace simbolico? =>", stats.isSymbolicLink());
    //imprimimos toda la información del objeto stats
    console.dir(stats);
  }
});
    
    
});
