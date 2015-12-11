<?php require("mailer.php"); ?>
<?php

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
		$subject = $title;

		$mes = array
		(
			"name" 			=> $name,
			"phone"			=> $phone,
			"from_section" 	=> $from_section
		);

        sendMail($mes);
	} else {
		echo "<p class='bg-danger text-danger'>Произошла ошибка! Заполните правильно все поля!!!</p>";
	}
?>
