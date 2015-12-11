/*
 Third party
 */

/*    //= ../../bower_components/jquery/dist/jquery.min.js*/

//= ../../bower_components/jquery-prettyPhoto/js/jquery.prettyPhoto.js

//= ../../bower_components/bootstrap/dist/js/bootstrap.min.js


$(function(){
    console.log('in main.js! ');
})

function loadStyle(l){
    var a=document.createElement("link");
    a.rel="stylesheet";
    a.type="text/css";
    a.href=l;
    document.getElementsByTagName("head")[0].appendChild(a)
}

function downloadJSAtOnload(l) {
	var element = document.createElement("script");
	element.src = l;
	document.getElementsByTagName("body")[0].appendChild(element)
}

$(document).ready(function () {
    loadStyle('css/main.css');
});

/*
    Custom
 */

//= partials/plugins.js
//= partials/common.js
