<?php

require "./DB.class.php";
$message = null;
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
        $email = trim($_POST["email"]);
        $password = trim($_POST["password"]);
        //conect to database
        $DB = new dataBase("admins");
        $exits = $DB->verify($email);
        if ($exits == 0){
            $message = "Invalid Credentials E.";
        } else {
            $user = $DB->getAdmin($email);
            if (!password_verify($password, $user["password"])){
                $message = "Invalid Credentials. P";
            } else {
                unset($user["password"]);
                $_SESSION["user"] = $user;
                $message = 'Welcome '.$user['name'].'!';
                // Return response as JSON format
                $response = array(
                    'status' => true,
                    'msg' => $message
                );
                echo json_encode($response);
                return;
            }
        }
        // Return response as JSON format
    }
    // Return response as JSON format
    $response = array(
        'status' => false,
        'msg' => $message
    );
    echo json_encode($response);
    return;
} else if (isset($_POST["register"])) {
    if (empty($_POST["name"]) || empty($_POST["email"]) || empty($_POST["password"])){
        $message = "Please fill all the fields.";
    } else if (!filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)){
        $message = "Please enter a valid email.";
    } else if (strlen($_POST["password"]) < 8) {
        $message = "Password can not be less to 8 characters.";
    } else {
        //get values
        $name = trim($_POST["name"]);
        $email = trim($_POST["email"]);
        $password = trim($_POST["password"]);
        //encript password
        $hasPassword = password_hash($password, PASSWORD_BCRYPT);
        //conect to database
        $DB = new dataBase("admins");
        $exits = $DB->verify($email);
        if ($exits == 0) {
            $DB->insertAdmin($name, $email, $hasPassword);
            $user = $DB->getAdmin($email);
            session_start();
            unset($user["password"]);
            $_SESSION["user"] = $user;
            $status = "success";
            $message = 'Your account has been registered successfully, Welcome '.$user['name'].'!';
            $response = array(
                'status' => true,
                'msg' => $message
            );
            echo json_encode($response);
            return;
        } else{
            $message = "Email already registered, please use another email.".$name." ".$email." ".$password;
        }
    }
    // Return response as JSON format
    $response = array(
        'status' => false,
        'msg' => $message
    );
    echo json_encode($response);
    return;
} else if (isset($_GET['logout'])){
    session_start();
    $redirectURL = "./index.php";

    // Remove session data 
    unset($_SESSION['user']); 
    session_destroy(); 
     
    // Store logout status into the SESSION 
    /* $sessData['status']['type'] = 'success'; 
    $sessData['status']['msg'] = 'You have logout successfully!'; 
    $_SESSION['sessData'] = $sessData;  */
     
    // Redirect to the home page 
    header("Location: $redirectURL"); 
}