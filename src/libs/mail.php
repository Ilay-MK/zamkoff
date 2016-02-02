<?php> 
    $error = false;

    if (!empty($_POST["name"])) {
        $name = substr(htmlspecialchars(trim($_POST["name"])), 0, 50);
	}

    if (!empty($_POST["phone"])) {
        $phone = substr(htmlspecialchars(trim($_POST["phone"])), 0, 50);
	} else { $error = true; }

    if (!empty($_POST["from_section"])) {
        $from_section = substr(htmlspecialchars(trim($_POST["from_section"])), 0, 250);
	}

 	if (!$error) {
        $recepient = "z3550505@gmail.com";
        $sitename = "zamkoff.by";

        $pagetitle = "Новая заявка с сайта \"$sitename\"";
        $message = "Имя: $name \nТелефон: $phone\nКуда кликнул: $from_section";
        mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");        
        
	} else {
		echo "<p class='bg-danger text-danger'>Произошла ошибка! Заполните правильно все поля!!!</p>";
	}
?>
