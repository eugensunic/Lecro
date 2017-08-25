<?php

 header('Access-Control-Allow-Origin: *');
 header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
 header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');

$server ="160.153.16.43";
$user="eusunic";
$pass="mili7788";
$dbname="ikplabpravi";


$conn = new mysqli($server, $user, $pass, $dbname);



if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
else{

  if ($result = $conn->query("SELECT COUNT(TextPodatak.Content)as frendi, Null as UUID, Null AS Major,Null as Minor,Null as TxPower FROM Beacon, TextPodatak
WHERE  TextPodatak.Beacon_Id=Beacon.Id
AND Beacon.Naziv='".$_POST['name']."'
UNION ALL
SELECT COUNT(UrlPodatak.Content)as frendi,Null, Null,Null,Null FROM Beacon, UrlPodatak
WHERE  UrlPodatak.Beacon_Id=Beacon.Id
AND Beacon.Naziv='".$_POST['name']."'
UNION ALL
SELECT COUNT(SlikaPodatak.Content)as frendi,Null, Null,Null,Null FROM Beacon, SlikaPodatak
WHERE  SlikaPodatak.Beacon_Id=Beacon.Id
AND Beacon.Naziv='".$_POST['name']."'
UNION ALL
SELECT COUNT(AudioPodatak.Content)as frendi,Null, Null,Null,Null FROM Beacon, AudioPodatak
WHERE  AudioPodatak.Beacon_Id=Beacon.Id
AND Beacon.Naziv='".$_POST['name']."'
UNION ALL
SELECT COUNT(VideoPodatak.Content)as frendi,Null, Null,Null,Null FROM Beacon, VideoPodatak
WHERE  VideoPodatak.Beacon_Id=Beacon.Id
AND Beacon.Naziv='".$_POST['name']."'
UNION ALL
SELECT Lokacija.Latitude as frendi,Lokacija.Longitude as UUID , Null,Null,Null FROM Beacon, Lokacija
WHERE Lokacija.Id=Beacon.Lokacija_Id
AND Beacon.Naziv='".$_POST['name']."'
UNION ALL 
SELECT Naziv,UUID, Major,Minor,TxPower FROM Beacon WHERE Naziv='".$_POST['name']."'")) 
{

  

    while($row = $result->fetch_array(MYSQL_ASSOC)) 
    {
            $myArray[] = $row;
    }

    echo json_encode($myArray);
 }
}

?>