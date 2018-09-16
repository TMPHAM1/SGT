<?php
$query = "SELECT * from `students`";
//write a query that selects all the students from the database, all the data from each row
$result = mysqli_query($conn, $query);
//send the query to the database, store the result of the query into $result


//check if $result is empty.  
if(empty($result)) {
	//if it is, add 'database error' to errors
	$error	 = mysqli_error($conn);
	$output['error'][] = $error;
}
//else: 
	else {
		if(mysqli_num_rows($result) > 0) {//check if any data came back
		$output['success'] = true; 		//if it did, change output success to true
		while ($row = mysqli_fetch_assoc($result))	{	//do a while loop to collect all the data 
		$output['data'][]=$row;//add each row of data to the $output['data'] array
		}
		
		}
		else {
			$output['error'][] = 'no data';	//if not, add to the errors: 'no data'
	}
	
	}

		
			


?>