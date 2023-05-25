<?php

session_start();
require "./DB.class.php";
$message = null;
$status = "danger";
if (isset($_POST["login"])){
    //validate
    if (empty($_POST["email"]) || empty($_POST["password"])){
        $message = "Please fill all the fields.";
    } else if (!filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)){
        $message = "Please enter a valid email.";
    } else if (strlen($_POST["password"]) < 8) {
        $message = "Password can not be less to 8 characters.";
    } else {
        //get values
        $email = $_POST["email"];
        $password = $_POST["password"];
        //conect to database
        $DB = new dataBase("admins");
        $exits = $DB->verify($email);
        if ($exits == 0){
            $message = "Invalid Credentials.";
        } else {
            $user = $DB->getAdmin($email);
            if (!password_verify($password, $user["password"])){
                $message = "Invalid Credentials.";
            } else {
                unset($user["password"]);
                $_SESSION["user"] = $user;
                $status = "success";
                // Return response as JSON format
                $response = array(
                    'status' => $status,
                    'msg' => $message
                );
                echo json_encode($response);
                return;
            }
        }
    }
    // Return response as JSON format
    $response = array(
        'status' => $status,
        'msg' => $message
    );
    echo json_encode($response);
    return;
} else if (isset($_POST["register"])) {
    if (empty($_POST["name"]) || empty($_POST["email"]) || empty($_POST["password"])){
        $error = "Please fill all the fields.";
    } else if (!filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)){
        $error = "Please enter a valid email.";
    } else if (strlen($_POST["password"]) < 8) {
        $error = "Password can not be less to 8 characters.";
    } else {
        //get values
        $name = $_POST["name"];
        $email = $_POST["email"];
        $password = $_POST["password"];
        //encript password
        $hasPassword = password_hash($password, PASSWORD_BCRYPT);
        //conect to database
        $DB = new dataBase("admins");
        $exits = $DB->verify($email);
        if ($exits == 0) {
            $DB->insertAdmin($name, $email, $hasPassword);
            $DB->getAdmin($email);
            session_start();
            unset($user["password"]);
            $_SESSION["user"] = $user;
            $status = "success";
            $response = array(
                'status' => $status,
                'msg' => $message
            );
            echo json_encode($response);
            return;
        } else{
          $error = "Email already registered, please use another email.";
        }
    }
    // Return response as JSON format
    $response = array(
        'status' => $status,
        'msg' => $message
    );
    echo json_encode($response);
    return;
}