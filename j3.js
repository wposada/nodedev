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
    var fs = require('fs');
    console.log(filePath);
    fs.stat(filePath, function(err, stats){
  if(err){
    console.error(err);
  }
  else{
    console.dir(stats.mtime);
  }
});
    
    
});
