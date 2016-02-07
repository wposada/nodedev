
function listardir ( path, callback){
     // the callback gets ( err, files) where files is an array of file names
     if( typeof callback !== 'function' ) return
     var
      result = []
      , files = [ path.replace( /\/\s*$/, '' ) ]
     function traverseFiles (){
      if( files.length ) {
       var name = files.shift()
       fs.stat(name, function( err, stats){
        if( err ){
         if( err.errno == 34 ) traverseFiles()
    // in case there's broken symbolic links or a bad path
    // skip file instead of sending error
         else callback(err)
        }
        else if ( stats.isDirectory() ) fs.readdir( name, function( err, files2 ){
         if( err ) callback(err)
         else {
          files = files2
           .map( function( file ){ return name + '/' + file } )
           .concat( files )
          traverseFiles()
         }
        })
        else{
         result.push(name)
         traverseFiles()
        }
       })
      }
      else callback( null, result )
     }
     traverseFiles()
    }
listardir("/media/sf_Ingress/Order/Junio/file_0630.txt","");
