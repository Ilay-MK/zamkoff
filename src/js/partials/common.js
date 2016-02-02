/*
 Third party
 */

$(function() {
    console.log('in common.js! ');
})

$(document).ready(function() {

    // Ajax send mail
    /*$(".order").submit(function () {
        ajax(this);
	});
    */
    // Подмена значения из какого блока кликают
    $(".fancybox").click(function () {
        /*alert($(this).attr("section"));*/
        $("#form-order").find("#from_section").val($(this).attr("section"));
    });

});

function ajax(ob) {
	var msg;
	var processor;
	var result;

	var result = $(".result");

	processor = "./libs/mail.php";

	$.ajax({
		type: "POST",
		url: processor,
		data: $(ob).serialize(),
		error: function (xhr, str) {
			setTimeout(function () {
				$(result).html(xhr, str);
				$(result).animate({
					opacity: 1,
					height: 'toggle'
				}, 1000, function () {});
			}, 700);
		}
	}).done(function () {
		$(ob).find("[type='text']").val("");
		$(ob).trigger("reset");
		result.addClass("show");
		result.children(".mess").addClass("animated zoomInDown show").fadeIn('slow');

		setTimeout(function () {
			$.fancybox.close();
			result.addClass("animated zoomInDown show").fadeIn('slow');
		}, 500);

		setTimeout(function () {
			result.removeClass("show");
			result.children(".mess").removeClass("animated zoomInDown show").fadeOut('slow');
		}, 5000);
        
	});
	return false;
}

// create social networking pop-ups
(function() {
	// link selector and pop-up window size
	var Config = {
		Link: "a.share",
		Width: 500,
		Height: 500
	};

	// add handler links
	var slink = document.querySelectorAll(Config.Link);
	for (var a = 0; a < slink.length; a++) {
		slink[a].onclick = PopupHandler;
	}

	// create popup
	function PopupHandler(e) {
		/*var temp;
		for(var p in e) {
			temp += p + "; ";
		}
		alert(temp);
		alert(e.currentTarget);*/
			
		e = (e ? e : window.event);
		
		/*var t = (e.target ? e.target : e.srcElement);*/
		var t = e.currentTarget;
		
		// popup position
		var
			px = Math.floor(((screen.availWidth || 1024) - Config.Width) / 2),
			py = Math.floor(((screen.availHeight || 700) - Config.Height) / 2);

		/*alert(t.href);*/
		// open popup
		var popup = window.open(t.href, "social", 
			"width="+Config.Width+",height="+Config.Height+
			",left="+px+",top="+py+
			",location=0,menubar=0,toolbar=0,status=0,scrollbars=1,resizable=1");
		if (popup) {
			popup.focus();
			if (e.preventDefault) e.preventDefault();
			e.returnValue = false;
		}

		return !!popup;
	}

}());