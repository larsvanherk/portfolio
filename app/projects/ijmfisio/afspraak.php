<!DOCTYPE html>
<html lang="nl">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width">
    <link rel="shortcut icon" href="resource/favicon.ico">

    <title>
        Afspraak | Fysiotherapie I.J.M. van Herk
    </title>

    <link rel="stylesheet" type="text/css" href="indexstyle.css">
    <link rel="stylesheet" type="text/css" href="formstyle.css">

</head>

<body>
    <h1 class="headtext">FYSIOTHERAPIE I.J.M. VAN HERK</h1>
    <div class="head zigzag"></div>

    <div class="main">
        <nav>
            <div class="navb">
                <a href="index.html">Home</a>
            </div>


            <div class="navb">
                <a href="teamspec.html">Team &amp; specialisatie</a>
            </div>


            <div class="navb">
                <a href="tarieven.html">Tarieven</a>
            </div>


            <div class="navb">
                <a href="contact.html">Contact</a>
            </div>


            <div class="navb selected">
                <a href="afspraak.html">Afspraak</a>
            </div>
        </nav>
        <h1>Bericht verzenden...</h1>
        <hr>
        <br>
        <?php
            $name = $_POST['name'];
            $email = $_POST['email'];
            $message = $_POST['message'];
            $from = 'Van: FysioIJM'; 
            $to = 'noemail@none.com';
            $subject = 'E-mail via website';
                    
            $body = "Van: $name\n E-mailadres: $email\n Bericht:\n $message";
                        
            if ($_POST['submit']) {              
                if (mail ($to, $subject, $body, $from)) { 
                    echo 'Uw bericht werd verzonden!<br><br><a class="back" href="afspraak.html">Terug</a>';
                } else { 
                    echo 'Er is iets misgegaan... Uw bericht werd niet verzonden.<br><br><a class="back" href="afspraak.html">Terug</a>'; 
                }
            } 
        ?>
    </div>
</body>

</html>