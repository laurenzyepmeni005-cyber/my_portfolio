<?php
require 'vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(_DIR_);
$dotenv->load();

$key = $_ENV['SUPABASE_SERVICE_ROLE_KEY'];
$url = $_ENV['SUPABASE_URL'] . "/rest/v1/akiba";


$data = [
     "Name" => $_POST [ "Name"],
     "Email" => $_POST [ "Email"],
     "Phone" => $_POST [ "Phone"],
     "Message" => $_POST [ "Message"],
     "Subject" => $_POST [ "Subject"],
     
];


$options = [
    "http" => [
        "header" => "content-Type : application/json\r\n" .
                    "apikey: $key\r\n" .
                    "Authorization : Bearer $key\r\n",
        "method"=> "POST",
        "content"=> json_encode ($data)            
    ]
];


$context = stream_context_create($options);
$result = file_get_contents($url, false, $context);

echo " successfully send message." ;