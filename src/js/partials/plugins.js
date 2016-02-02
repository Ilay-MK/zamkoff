/*
 Third party
 */

$(function(){
    console.log('in plugins.js! ');
})

$(document).ready(function() {

    // Модальное окно
    /*$("a[rel^='prettyPhoto']").prettyPhoto();*/
    /*$(".fancybox").fancybox();*/
    $(".fancybox").fancybox({
		maxWidth: '100%',
		maxHeight: '100%',
		fitToView: false,
		autoSize: true,
		closeClick: false,
		margin: 0,
        padding: 0,
		closeBtn: false/*,
		afterShow: function () {
			$("#tblPrice button").click(function () {
				var data = $(this).attr("data");
				alert(data);
				$("#inputJobType").val(data);
			});
		}*/
	});
    
    // Скроллинг
    $(".scrollTo").click(function () {
        $.scrollTo($(this).attr('href'), 800, {
			offset: 0
		});
		return false;
	});

});
