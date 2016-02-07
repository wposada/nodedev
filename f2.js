files.forEach(function (v,k){
  // require routes
  require('./routes/'+v);
});
