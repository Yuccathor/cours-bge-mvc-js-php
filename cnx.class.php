<?php 
class Dbcnx {

// const HOST = 'localhost';
// const LOGIN = 'root';
// const PASSWORD = '';
private $connect = null;
const OPTIONS = array(
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::MYSQL_ATTR_INIT_COMMAND=> 'SET NAMES utf8',
                PDO::ATTR_DEFAULT_FETCH_MODE=>PDO::FETCH_ASSOC);

    public function __construct($host,$login,$password)
    {
       $this->host = $host;
       $this->login = $login;
       $this->password = $password;
    }

    public function openConnection(){
        if($this->connect == null){

            try{
                $this->connect = new PDO($this->host,$this->login,$this->password,self::OPTIONS);
                return $this->connect;

            }
            catch(PDOException $error){
                exit();
            }
        }
    }

    //fin openConnect

    public function closeConnect(){
        $this->connect =null;
    }
}// fin de classe
?>