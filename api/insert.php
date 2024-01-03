<?php
$error = '';
 if ($_GET["name"] && $_GET["grade"] && $_GET["course_name"]) {//check if you have all the data you need from the client-side call. 
	$name = $_GET["name"];
	$grade = $_GET["grade"];
	$course = $_GET["course_name"];
 }
else {	//if not, add an appropriate error to errors
 if (empty($_GET["name"])) {
	 $error = "Name is required";
 }
 else if (empty($_GET["grade"])) {
	$error =  " Grade is required";
}
 else if (empty($_GET["course_name"])) {
	$error = " Course is required";
}
echo $error;
exit();
}

 
//write a query that inserts the data into the database.  remember that ID doesn't need to be set as it is auto incrementing
$query = "INSERT INTO `students`(`name`,`grade`,`course_name`) VALUES ('$name', '$grade', '$course')";
$result = mysqli_query($conn, $query);
//send the query to the database, store the result of the query into $result
if (empty($result)) { //check if $result is empty.  
	echo 'Database Error'; 	//if it is, add 'database error' to errors
}
else {//else:
 if (mysqli_affected_rows($conn) === 1)  {//check if the number of affected rows is 1
	$output["success"] = true;//if it did, change output success to true
	$insertID = mysqli_insert_id($conn);	//add 'insertID' to $outut and set the value to the row's insert ID
	$output['id'] = $insertID;
 }
 else {
	echo 'insert error';
 }

}

	
		
		//get the insert ID of the row that was added
		//add 'insertID' to $outut and set the value to the row's insert ID
	//if not, add to the errors: 'insert error'

?>