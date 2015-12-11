/*
 Third party
 */

$(function() {
    console.log('in common.js! ');
})

$(document).ready(function() {

    // Ajax send mail
    $(".order").submit(function () {
        ajax(this);
	});

});

function ajax(ob) {
	var msg;
	var processor;
	var result;

	var result = $(".result");

	processor = "./libs/send.php";

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
		result.addClass("is-show");
		result.children(".mess").addClass("animated zoomInDown is-show").fadeIn('slow');

		/*setTimeout(function () {
			$.fancybox.close();
			result.addClass("animated zoomInDown is-show").fadeIn('slow');
		}, 500);*/

		setTimeout(function () {
			result.removeClass("is-show");
			result.children(".mess").removeClass("animated zoomInDown is-show").fadeOut('slow');
		}, 5000);
	});
	return false;
}
