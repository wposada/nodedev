htmlToJson=require('html-to-json');
var lineReader = require('line-reader');
var res="";


function prettyJSON(obj) {
    console.log(JSON.stringify(obj, null, 2));
}
function Parseando(html){
//var html='<div class="plext"><!-- false --><div class="pl_timestamp"><div class="pl_timestamp_container"><div class="pl_timestamp_date">2:30PM</div><div class="pl_timestamp_spacer"></div></div></div><div class="pl_content pl_broad"><span class="ENLIGHTENED pl_nudge_player" data-playerstr="@pepitaIluminada" data-isfaction="false">pepitaIluminada</span> linked <span class="pl_portal_name" data-plat="4.591753" data-plng="-74.12433">Piramide De Chichen Itza</span> <span class="pl_portal_address">(Calle 38AS # 34B-1 a 34B-99, Centro Mayor, Chevignon Centro Mayor, Bogotá, Cundinamarca, Colombia)</span> to <span class="pl_portal_name" data-plat="4.592607" data-plng="-74.124022">Colgante Tairona</span> <span class="pl_portal_address">(Calle 38AS # 34D-1 a 34D-33, Centro Mayor, Chevignon Centro Mayor, Bogotá, Cundinamarca, Colombia)</span></div></div>'
//var html='<div class="plext"><!-- false --><div class="pl_timestamp"><div class="pl_timestamp_container"><div class="pl_timestamp_date">10:53AM</div><div class="pl_timestamp_spacer"></div></div></div><div class="pl_content pl_broad"><span class="ENLIGHTENED pl_nudge_player" data-playerstr="@dcrodg" data-isfaction="false">dcrodg</span> captured <span class="pl_portal_name" data-plat="4.656798" data-plng="-74.054469">Arbol De Helm</span> <span class="pl_portal_address">(Carrera 7 # 73-1 a 73-99, Bogotá, Cundinamarca, Colombia)</span></div></div>';

var promise = htmlToJson.parse(html, { 
  'time': function ($doc) {
      return $doc.find('.pl_timestamp_date').text();
    },
  'enlagent': function ($doc) {
      return $doc.find('.ENLIGHTENED').attr('data-playerstr');
    },
  'resagent': function ($doc) {
      return $doc.find('.RESISTANCE').attr('data-playerstr');
    },
  'lats': ['.pl_portal_name', function ($coor) {
    return $coor.attr('data-plat');
  }],
  'lons': ['.pl_portal_name', function ($coor) {
    return $coor.attr('data-plng');
  }],
  'names': ['.pl_portal_name', function ($spa) {
    return $spa.text();
  }],
  'dirs': ['.pl_portal_address', function ($spa) {
    return $spa.text();
  }],
  'txt': [".pl_content", function ($spa) {
    return $spa.not('.pl_portal_name').text();
  }],
  'action': [".pl_content", function ($spa) {
    var txt2=$spa.not('.pl_portal_name').text();
    var actions = txt2.split(" ");
    return actions[1];
  }],
},function (err, result) {
  prettyJSON(result);
  return result;
});

}


// read all lines:
lineReader.eachLine('P1.txt', function(line) {
  res=Parseando(line);
  console.log("res:"+res);
}).then(function () {
  console.log("I'm done!!");
});
