<?php
$orderby  = $_GET['sort'];

$query = "SELECT * FROM `students` ORDER BY `course_name` $orderby";
$result = mysqli_query($conn, $query); 

if ($result) {
    if (mysqli_num_rows($result)> 0) {
        $output['success'] = true; 
        while($row = mysqli_fetch_assoc($result)) {
            $output['data'][] = $row;
        }
    }

}
else {
    print("Database Connection Error"); 
}
