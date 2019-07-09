/*
 Third party
 */

$(function(){
    console.log('in plugins.js! ');
})

$(document).ready(function() {

    $(".fancybox").fancybox({
		maxWidth: '100%',
		maxHeight: '100%',
		fitToView: false,
		autoSize: true,
		closeClick: false,
		margin: 0,
        padding: 0,
		closeBtn: false
	});
    
    $(".fancybox").click(function () {
        $("#form-order").find("#from_section").val($(this).attr("section"));
    });
    
    $(".scrollTo").click(function () {
        jQuery.scrollTo($(this).attr('href'), 800, {
			offset: 0
		});
		return false;
	});

});
