<?php
require_once('cnx.class.php');
class Dao_users{
  const HOST = 'mysql:host=localhost;dbname=miniblog';
  const LOGIN = 'root';
  const PASSWORD = '';

  public function check_login($username){
    $cnx = new Dbcnx(self::HOST,self::LOGIN,self::PASSWORD);
    $connected = $cnx->openConnection();
    $query = 'SELECT * FROM users WHERE username=:username';
    $req = $connected -> prepare($query);
    $req -> bindValue(':username', $username);
    $req -> execute();
    $data = $req -> fetch();
    return $data;
  }

  public function insertion($username, $email, $pwd){
    $cnx = new Dbcnx(self::HOST,self::LOGIN,self::PASSWORD);
    $connected = $cnx->openConnection();
    $query = 'INSERT INTO users (username, email, pwd, id_role) VALUES(:username, :email, :pwd, :id_role)';
    $req = $connected -> prepare($query);
    $req -> bindValue(':username', $username);
    $req -> bindValue(':email', $email);
    $req -> bindValue(':pwd',$pwd);
    $req -> bindValue(':id_role',2);
    $req -> execute();
    $count = $req -> rowCount();
    return $count;

  }
}
?>