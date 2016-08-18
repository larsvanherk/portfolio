<?php
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    $from = 'Van: ContactMe larsvanherk.com'; 
    $to = 'me@larsvanherk.com';
    $subject = 'ContactMe van '.$name.' op larsvanherk.com';

    $message = "Van: $name\n\n E-mailadres: $email\n\n Bericht:\n\n $message";

    if(!is_null($name) && !is_null($email) && !is_null($message)
       && !empty($name) && !empty($email) && !empty($message)){
        mail($to, $subject, $message);
        echo '<meta http-equiv="refresh" content="0; url=http://www.larsvanherk.com/?mail=sent#contact" />';
    }else{
        echo '<meta http-equiv="refresh" content="0; url=http://www.larsvanherk.com/?mail=nsent#contact" />';
    }
?>