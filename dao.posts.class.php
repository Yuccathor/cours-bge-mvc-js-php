<?php
require_once('cnx.class.php');
class Dao_posts{
  const HOST = 'mysql:host=localhost;dbname=miniblog';
  const LOGIN = 'root';
  const PASSWORD = '';

  public function allposts(){
    $cnx = new Dbcnx(self::HOST,self::LOGIN,self::PASSWORD);
    $connected = $cnx->openConnection();
    $query = 'SELECT id_article ,content, created_at, is_moderated, title, username, comments_nb 
    FROM posts 
    INNER JOIN users on posts.id_user = users.id 
    LEFT JOIN (
      SELECT comments.id_articles, COUNT(*) AS comments_nb
      FROM comments
      GROUP BY comments.id_articles
    ) comments ON posts.id_article = comments.id_articles';
    $req = $connected -> prepare($query);
    $req -> execute();
    $data = $req -> fetchAll();
    // var_dump($data);
    return $data;
  }
}
?>