<?php
function sendMail($mes)
{
	// example on using PHPMailer with GMAIL
	include("PHPMailer/class.phpmailer.php");
	include("PHPMailer/class.smtp.php"); // note, this is optional - gets called from main class if not already loaded

	$err			  = NULL;
	$mail             = new PHPMailer();

	$mail->IsSMTP();
    $mail->SMTPAuth   = true;                                                      // enable SMTP authentication
    $mail->SMTPSecure = "";                                                        // sets the prefix to the servier
	$mail->Host       = "mail.zae-box.by";                                         // sets GMAIL as the SMTP server
	$mail->Port       = 25;                                                        // set the SMTP port; For mail.hoster.by [465secur][25/2525/587]
	$mail->Username   = "no-reply@zae-box.by";                                     // username
	$mail->Password   = "Ohgee4ai";
	$mail->From       = "no-reply@zae-box.by";                                     // $mes["email"];
    $mail->CharSet	  = "utf-8";
	$mail->FromName   = "Сообщение с сайта | zamkoff.by";                          // $mes["name"]."| domain | ".$type;
	$mail->Subject    = "Поступила новая заявка!";                                 // "Поступил новый ".$type;
	$mail->AltBody    = "This is the body when user views in plain text format";   // Text Body
	$mail->WordWrap   = 50;                                                        // set word wrap
    $mail->Body	      = '
						<div style="font-size: 2em; margin: 5px 0px"">Имя: '.$mes["name"].'</div>
						<div style="font-size: 2em; margin: 5px 0px"">Телефон: '.$mes["phone"].'</div>
                        <div style="color: gray; margin: 20px 0px">'.$mes["from_section"].'</div>
						';
    $titleReplyTo = "Ответ на Вашу заявку с сайта [zamkoff.by]";

	/*$mail->AddReplyTo($mes["email"], $mes["name"]);*/ // "mail@domain","Webmaster"
	//$mail->AddAddress("mail@","О Величайший Мастер");
	$mail->AddAddress("MiKrob09@gmail.com", "Отдел продаж");
	$mail->IsHTML(true); // send as HTML

	if(!$mail->Send()) {
		$tmp =  " - Mailer Error: " . $mail->ErrorInfo;
		echo "<p class='bg-danger text-danger'>Произошла ошибка!</p>"; //.$tmp;
	}
	else{
		echo "<p class='text-success bg-success'>Ваше сообщение принято. Хорошего дня!!</p>"; //Message has been sent
	}
}
?>
