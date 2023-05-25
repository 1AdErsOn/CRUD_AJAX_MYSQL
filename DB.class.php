<?php
class conexion{
    private $conexion;
    private $configuracion = [
        'driver' => 'mysql',
        'host' => 'localhost',
        'database' => '',//database
        'port' => '3306',
        'username' => 'root',
        'password' => '',
        'charset' => 'set names utf8'
    ];
    public function __construct($dataBase)
    {
        $this->configuracion['database'] = $dataBase;
    }
    public function conectar(){
        try{ 
            $Controlador = $this->configuracion['driver'];
            $Servidor = $this->configuracion['host'];
            $Base_Datos = $this->configuracion['database'];
            $Puerto = $this->configuracion['port'];
            $Usuario = $this->configuracion['username'];
            $Clave = $this->configuracion['password'];
            $Caracteres = $this->configuracion['charset'];
            $url = "{$Controlador}:host={$Servidor}:{$Puerto};"
                ."dbname={$Base_Datos}";
            //se crea la conexion
            $this->conexion = new PDO($url,$Usuario,$Clave);
            //$conn = new PDO("mysql:host=".$dbHost.";dbname=".$dbName, $dbUsername, $dbPassword); 
            $this->conexion -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conexion -> exec($Caracteres);
            return $this->conexion;
        }catch(PDOException $e){ 
            die("Failed to connect with MySQL: " . $e->getMessage()); 
        }
    }

};
class dataBase{
    private $table;
    private $conexion;
    public function __construct($table)
    {
        $this->table = $table;
        $conexion = new conexion("test");
        $this->conexion = $conexion->conectar();
    }
    public function getData(){
        $statement = $this->conexion->prepare("SELECT * FROM {$this->table} ORDER BY id DESC");
        $statement->execute();
        $resp = $statement->fetchAll();
        return $resp;
    }
    public function getUser($id){
        $statement = $this->conexion->prepare("SELECT * FROM {$this->table} WHERE id = :id LIMIT 1");
        $statement->execute([':id' => $id]);
        $resp = $statement->fetch(PDO::FETCH_ASSOC);
        return $resp;
    }
    public function getAdmin($email){
        $statement = $this->conexion->prepare("SELECT * FROM {$this->table} WHERE email = :email");
        $statement->execute([':email' => $email]);
        $resp = $statement->fetch(PDO::FETCH_ASSOC);
        return $resp;
    }
    public function verify($email){
        $statement = $this->conexion->prepare("SELECT * FROM {$this->table} WHERE email = :email");
        $statement->execute([':email' => $email]);
        $resp = $statement->rowCount();
        return $resp;
    }
    public function insert($name, $email, $phone)
    {
        $statement = $this->conexion->prepare("INSERT INTO {$this->table} (name, email, phone) VALUES (:name, :email, :phone)");
        $resp = $statement->execute([
            ':name' => $name,
            ':email' => $email,
            ':phone' => $phone
        ]);
        return $resp;
    }
    public function insertAdmin($name, $email, $pass)
    {
        $statement = $this->conexion->prepare("INSERT INTO {$this->table} (name, email, password) VALUES (:name, :email, :pass)");
        $resp = $statement->execute([
            ':name' => $name,
            ':email' => $email,
            ':pass' => $pass
        ]);
        return $resp;
    }
    public function update($name, $email, $phone, $id)
    {
        $statement = $this->conexion->prepare("UPDATE {$this->table} SET name = :name, email = :email, phone = :phone WHERE id = :id");
        $resp = $statement->execute([
            ':name' => $name,
            ':email' => $email,
            ':phone' => $phone,
            ':id' => $id
        ]);
        return $resp;
    }
    public function delete($id)
    {
        $statement = $this->conexion->prepare("DELETE FROM {$this->table} WHERE id = :id");
        $resp = $statement->execute([':id' => $id]);
        return $resp;
    }
}