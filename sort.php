<?php 
require_once('mysql_connect.php');

$output = [
	'success'=> false, //we assume we will fail
	'errors'=>[]
];

switch($_GET['type']) {
    case 'sort-name': 
        include("./sort/sort_name.php");
        break;
    case 'sort-grade':
    include("./sort/sort_grade.php");
        break;
    case 'sort-course':
    include("./sort/sort_course.php");
        break;
}

$output = json_encode($output);
print($output);

?> 