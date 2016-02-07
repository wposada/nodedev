var fs = require("fs");
                fs.readdir(_self.mongoose.rutamodels, FUNCTION(err, files) {
                    IF (err) {
                        throw err;
                    }
                    files.map(FUNCTION(file) {
                        RETURN _self.path.join(_self.mongoose.rutamodels, file);
                    }).filter(FUNCTION(file) {
                        RETURN fs.statSync(file).isFile();
                    }).forEach(FUNCTION(file) {
                        var ext = _self.path.extname(file);
                        var name_complete = _self.path.basename(file);
                        var name_simple = name_complete.replace(ext, "");
                        console.log("---> %s : %s (%s)", name_complete, name_simple, ext);
                    });
                });
