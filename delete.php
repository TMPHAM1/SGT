<?php
$error = '';
if ($_GET["id"]) {//check if you have all the data you need from the client-side call. 
   $id = $_GET["id"];
}
else {	//if not, add an appropriate error to errors
if (empty($_GET["id"])) {
	$error = "ID information is required";
}
}
$query ="DELETE FROM `student_data` WHERE `id` = '$id'";
//write a query that deletes the student by the given student ID  
$result = mysqli_query($conn,$query);
//send the query to the database, store the result of the query into $result
if (empty($result)) {//check if $result is empty.  
	$output["error"][] = 'database error';//if it is, add 'database error' to errors
	 $error = mysqli_error($conn);
	echo $error;
}
else {//else: 
	if (mysqli_affected_rows($conn) === 1) {//check if the number of affected rows is 1
		$output["success"][] = "true";//if it did, change output success to true
	}
	else {
		$output["error"][] = "delete error";//if not, add to the errors: 'delete error'
	}
}


	
		
		
	

?>
