var fs = require('fs');
var dir = '/media/sf_Ingress/Order/Julio/'; // your directory

var files = fs.readdirSync(dir);
files.sort(function(a, b) {
               return fs.statSync(dir + a).mtime.getTime() - 
                      fs.statSync(dir + b).mtime.getTime();
           });
