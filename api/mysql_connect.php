<?php
  $conn = mysqli_init();
  // $conn->ssl_set(NULL, NULL,  $_ENV["SSL_CERT"], NULL, NULL);
  $conn->ssl_set(NULL, NULL,  "./cacert.pem", NULL, NULL);
   //$conn->real_connect($_ENV["DB_HOST"], $_ENV["DB_USERNAME"], $_ENV["DB_PASSWORD"], $_ENV["DB_NAME"]);
  //$conn->real_connect('aws.connect.psdb.cloud', 'uo1vlpst6fkcey01ohum', 'pscale_pw_CWAL2Tx8kQw8LrrLwIy9Hr01H2mxWgftDRaVsdLzSgu', "student_grade_table");
?>