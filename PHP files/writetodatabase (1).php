<?php

 header('Access-Control-Allow-Origin: *');
 header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
 header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');
 header('Content-type: text/plain; charset=utf-8');
 
 
$checkbox=$_POST['checkvalue'];
$sql;

$server ="160.153.16.43";
$user="eusunic";
$pass="mili7788";
$dbname="ikplabpravi";

$conn = new mysqli($server, $user, $pass, $dbname);
$conn->set_charset("utf8");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
else{
if ($checkbox=="firstcheck"){
	 $sql ="INSERT INTO `nestoiopetnesto`.`podaci` (`Datum`, `osoba_FK`, `radoviPostupciAktivnost`, `prijedloziPodrska`, `Naslov`, `Url`, `Optuznice`, `radoviPostupciAktivnostEng`, `prijedloziPodrskaEng`, `OptuzniceEng`, `net_tisk`) 
VALUES ('".$_POST['date']."', '".$_POST[osobafk]."', '".$_POST[sentence]."', NULL, '".$_POST['naslov']."', '".$_POST['url']."', NULL, NULL, NULL, NULL, '0')";

}
else if ($checkbox=="secondcheck"){
    $sql ="INSERT INTO `nestoiopetnesto`.`podaci` (`Datum`, `osoba_FK`, `radoviPostupciAktivnost`, `prijedloziPodrska`, `Naslov`, `Url`, `Optuznice`, `radoviPostupciAktivnostEng`, `prijedloziPodrskaEng`, `OptuzniceEng`, `net_tisk`) 
VALUES ('".$_POST['date']."', '".$_POST[osobafk]."', NULL, '".$_POST[sentence]."', '".$_POST['naslov']."', '".$_POST['url']."', NULL, NULL, NULL, NULL, '0')";
}
else {
     $sql ="INSERT INTO `nestoiopetnesto`.`podaci` (`Datum`, `osoba_FK`, `radoviPostupciAktivnost`, `prijedloziPodrska`, `Naslov`, `Url`, `Optuznice`, `radoviPostupciAktivnostEng`, `prijedloziPodrskaEng`, `OptuzniceEng`, `net_tisk`) 
VALUES ('".$_POST['date']."', '".$_POST[osobafk]."', NULL, NULL, '".$_POST['naslov']."', '".$_POST['url']."', '".$_POST[sentence]."', NULL, NULL, NULL, '0')";
}

 if ($conn->query($sql) === TRUE) {
           echo "New record created successfully";
		   echo $checkbox;
         } 
       else {
           echo "Error: " . $sql . "<br>" . $conn->error;
      }
}
$conn->close();

?> 