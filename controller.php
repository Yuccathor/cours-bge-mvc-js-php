<?php
require_once('dao.users.class.php');
require_once('dao.posts.class.php');
require_once('dao.comments.class.php');

$receivedata = json_decode(file_get_contents('php://input'));
$action = $receivedata->action;
switch ($action) {
  case 'login': // to do verifier quel login et mdp sont bons si ils sont bon renvoyer un message
    // the class of my Dao
    $dao_user = new Dao_users;
    // using the variables declared in my Dao for username and pwd
    $username = security($receivedata->login); //login valeur id dans le formulaire js
    $pwd = $receivedata->pwd;
    // call the function of my Dao
    //count vaut 1 ou 0 (true or false)
    $data = $dao_user->check_login($username); // a rééxpliquer
    if (password_verify($pwd, $data['pwd'])) {
      if ($data["id_role"] == 1) {
        $count = 1;
      } else {
        $count = 2;
      }
    } else {
      $count = 0;
    }
    echo json_encode($count);

    break;


  case 'inscription':
    $dao_user = new Dao_users;
    $username = security($receivedata->login);
    $email = security($receivedata->email);
    $pwd = security($receivedata->pwd);
    $pwd = password_hash($pwd, PASSWORD_DEFAULT);
    $count = $dao_user->insertion($username, $email, $pwd);
    echo json_encode($count);
    break;

  case 'allPosts':
    $dao_posts = new Dao_posts();
    $data = $dao_posts->allposts();
    // var_dump($data);
    echo json_encode($data);
    break;

  case 'allComments':
    $dao_comments = new Dao_comments();
    $data = $dao_comments->allComments($receivedata->id);
    // var_dump($data);
    echo json_encode($data);

    break;

  default:

    break;
}

function security($val)
{
  $val = trim($val); //supp les blancs
  $val = stripslashes($val); //supp les backslash
  $val = htmlspecialchars($val); //supp charactère html
  return $val;
}
