window.jQuery = require("jquery");
window.$ = require("jquery");

$(document).ready( init );

function init() {

    var home = [59.332339, 18.066893];

    // var googleLayer = new L.Google('ROADMAP');
    var mymap = L.map('map').setView(home, 16);//.addLayer(googleLayer);;


    L.tileLayer("http://a.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>',
    }).addTo(mymap);


    var marker = L.marker(home).addTo(mymap);
    marker.bindPopup("<b>Epicenter</b>");

    var myIcon = L.icon({
        iconUrl: 'images/wiki_marker_small.png',
        iconRetinaUrl: 'images/wiki_marker.png',
        iconSize: [38, 50],
        iconAnchor: [15, 48],
        popupAnchor: [0, -40]
    });
    callWiki(home, 1000, function(data){
        for(var i in data){
            let marker = L.marker([data[i].lat, data[i].lon], {
                icon: myIcon
            }).addTo(mymap);
            marker.bindPopup(`<div><img src="images/wikilogo.png" style="height: 25px; width: 25px; vertical-align: middle; margin: 6px;"><a href=${data[i].link}><b>${data[i].title}</b></a></div>`);
        }
    });

}



function callWiki( location, distance, callback ){
    let wikiurl = "https://en.wikipedia.org/w/api.php?action=query&list=geosearch&";
    let params =`gsradius=${distance}&gscoord=${location[0]}|${location[1]}&format=json&gslimit=100`;

	$.ajax({
		url: wikiurl + params,
        dataType: 'jsonp',
		type: 'GET',
		success: function( response ){
            callback(parseWikiResponse( response ));
        },
		error: ((e)=>{ console.log(e);})
	});
}

function parseWikiResponse(response){

    var result = [];
    if(response.query){
        let data = response.query.geosearch;
        for(let i in data){
            let link = `https://en.wikipedia.org/?curid=${data[i].pageid}`
            let currentResult = $.extend({ link: link}, data[i], true);
            result.push( currentResult );
        }
    } else {
        console.log(response);
    }
    return result;
}
