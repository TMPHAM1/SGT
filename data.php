<?php
require('mysql_connect.php');
// echo($_GET);
if(empty($_GET["action"])){
	exit('no action specified');
}
foreach ($_GET as $key=>$value) {
	$_GET["$key"] = mysqli_real_escape_string($conn, addslashes(htmlentities($value)));
}


//require the mysql_connect.php file.  Make sure your properly configured it!


$output = [
	'success'=> false, //we assume we will fail
	'errors'=>[]

];

switch( $_GET["action"]
/*do a comparison switch on the get superglobal action*/){
	case 'readAll':
		include('read.php');//include the php file 'read.php'
		break;
	case 'insert':
		include('insert.php');//include the php file insert.php
		break;
	case 'delete':
		include('delete.php');//include the php file delete.php
		break;
	case 'update':
		include('update.php');//include the update.php file;
		break;
}

//convert the $output variable to json, store the result in $outputJSON
$outputJSON = json_encode($output);

print($outputJSON);
//end

?>