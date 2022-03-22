<?php
require_once('cnx.class.php');
class Dao_comments{
  const HOST = 'mysql:host=localhost;dbname=miniblog';
  const LOGIN = 'root';
  const PASSWORD = '';

  public function allComments($id_article){
    // var_dump($id_article);
    $cnx = new Dbcnx(self::HOST,self::LOGIN,self::PASSWORD);
    $connected = $cnx->openConnection();
    $query = 'SELECT comments.id ,content, created_at, is_moderated, username FROM comments INNER JOIN users WHERE (comments.id_user = users.id AND id_articles =:id_articles)';
    $req = $connected -> prepare($query);
    $req -> bindValue(':id_articles', $id_article);
    $req -> execute();
    $data = $req -> fetchAll();
    // var_dump($data);
    return $data;
  }
}
?>