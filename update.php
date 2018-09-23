<?php

if ($_GET["id"]) {//check if you have all the data you need from the client-side call. 
   $id = $_GET["id"];
}
else {	//if not, add an appropriate error to errors
if (empty($_GET["id"])) {
	$error = "ID information is required";
	exit();
}
}

$name = $_GET["name"];
$course_name = $_GET["course_name"];
$grade = $_GET["grade"];

$query = "UPDATE `students` SET `name` = '$name', `grade`= '$grade', `course_name` = '$course_name' WHERE `id`= $id";
 //write a query that updates the data at the given student ID.  
 print($query);
$result = mysqli_query($conn,$query);
//send the query to the database, store the result of the query into $result

if (empty($result)) {//check if $result is empty.  
	$error = mysqli_error($conn);
		echo $error;
	$output["error"][] = 'database error'; //if it is, add 'database error' to errors
}
else { //else: 
	if (mysqli_affected_rows($conn) === 1) { //check if the number of affected rows is 1.  Please note that if the data updated is EXCACTLY the same as the original data, it will show a result of 0
		$output["success"][] = "true";		//if it did, change output success to true
	}
	else {
		$error = mysqli_error($conn);
		echo $error;
		$output["error"][] = "update error"; //if not, add to the errors: 'update error'
	}
}







	

	

	

?>