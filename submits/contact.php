<?php

// Just to be on the safe side - I'll strip out HTML tags
// (scripting code may mess with some email clients)
$Name = $_POST['Name'];
$Email = $_POST['Email'];
$Contact = $_POST['Contact'];
$Address = $_POST['Address'];
$Message = $_POST['Message'];



// setup variables
$sendto = "info@sumitproductions.com";
$subject = "Contact Form";
$message = "Name: $Name\n
Email: $Email\n
Contact: $Contact\n
Address: $Address\n
Message: $Message";

// send email
mail($sendto, $subject, $message, "From: $Email");
header( "Location: http://sumitproductions.com/thanks.html" );

?>
