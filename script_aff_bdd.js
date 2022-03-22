(function () {
  //chercher le type d'utilisateur
  // console.log(localeStorage.userType);
  //afficher les posts
  let topPost = null; //top post ou tous les post
  let varsearch = false;
  chargement();
  document
    .querySelector("#topPost")
    .addEventListener("click", topPostFct);
  document
    .querySelector("#allPosts")
    .addEventListener("click", allPostFct);
  document
    .querySelector(".iconesearch")
    .addEventListener("click", research);

  function allPostFct() {
    topPost = null;
    varsearch = false;
    chargement();
  }

  function topPostFct() {
    topPost = 1;
    varsearch = false;
    chargement();
  }

  function research() {
    if (document.querySelector("#search").value != "") {
      topPost = null;
      varsearch = true;
      chargement();
    }
  }
  //aller chercher les data (bdd / json)
  function chargement() {
    let data = {};
    data.action = "allPosts";
    let fetchData = {
      method: "POST",
      body: JSON.stringify(data),
      header: { "Content-type": "application/json" },
    };
    fetch("controller.php", fetchData)
      .then((response) => response.json())
      .then((data) => affichage(data, topPost, varsearch))
      .catch((error) => console.log(error));

    // fetch('./posts.json')
    // .then(response => response.json())
    // .then(data => affichage(data))
    // .catch (error => console.log(error));
  }
  //afficher les FormData

  function affichage(data) {
    console.log(data);
    document.querySelector("#postContainer").innerHTML = "";

    // console.log(topPost);
    let i = 0;
    let ok = true;

    for (elt of data) {
      if (varsearch) {
        if (
          elt.username ==
          document.querySelector("#search").value
        ) {
          ok = true;
        } else {
          ok = false;
        }
      }

      // console.log(elt);
      if (ok) {
        let html =
          '<article class="article" id="post' +
          elt.id_article +
          '">';

        html += "<header>";
        html += "<h1>" + elt.title + "</h1>";
        html += "</header>";

        html += "<div class='post'>";
        html += '<img src="img/images.jpg" alt="img"/>';
        html +=
          '<p class="content">' + elt.content + "</p>";
        html += "</div>";

        html += '<footer class="postFooter">';
        html += '<div class"author">';
        html +=
          "<p>" +
          elt.username +
          " | le " +
          elt.created_at +
          "</p>";
        html += "</div>";
        html += '<div class="commentsView">';
        html +=
          '<img id="id' +
          elt.id_article +
          '"class="oeil hand" src="img/eye.svg" alt="see"/>';
        let comments_nb =
          elt["comments_nb"] == null
            ? "0"
            : elt["comments_nb"];

        html +=
          "<span>" + comments_nb + " commentaires </span>";
        html += "</div>";

        html += "</footer>";

        html += "</article>";
        html +=
          '<aside id="article' + elt.id_article + '">';

        html += "</aside>";
        //afficher la variable dans le dom
        document.querySelector(
          "#postContainer"
        ).innerHTML += html;
        if (localStorage.userType == "user") {
          //creation li supplementaire si connecte dans le menu
          if (document.querySelector("#addpost") != null) {
            document.querySelector("#addpost").remove();
          }
          let postAdd = document.createElement("li");
          postAdd.classList.add("hand");
          postAdd.id = "addpost";
          postAdd.innerHTML =
            'Ajouter un post <img src="./assets/plus.svg" alt="ajout">';
          document
            .querySelector("#toppost")
            .insertAdjacentElement("afterend", postAdd);
          //todo : poser un ecouteur
          document.querySelector(".connexion").textContent =
            "Deconnexion";
          //ajout icones suppr et modif pour les posts
          let icons = document.createElement("p");
          icons.classList.add("actions");
          icons.innerHTML =
            ' <img src="./assets/pen.svg" alt="editer" class="hand" ><img src="./assets/trash.svg" class="hand" alt="supprimer">';
          document
            .querySelector(
              "#post" + elt.id_article + " header"
            )
            .insertAdjacentElement("afterBegin", icons);
          //todo : poser 2 ecouteurs
        }
        i++;
        if (i == topPost) {
          break;
        }
      }
    }
    let eyes = document.querySelectorAll(
      ".commentsView img"
    );
    // console.log(eyes);
    for (let eye of eyes) {
      eye.addEventListener("click", commentsMgnt);
    }
  }
  function commentsMgnt(e) {
    let id = e.target.id.slice(2);
    // console.log(id);
    let data = {};
    data.action = "allComments";
    data.id = id;
    let fetchData = {
      method: "POST",
      body: JSON.stringify(data),
      header: { "Content-type": "application/json" },
    };
    fetch("controller.php", fetchData)
      .then((response) => response.json())
      .then((data) => affichageComments(data, id))
      .catch((error) => console.log(error));
    // console.log(data);
  }

  function affichageComments(data, id) {
    console.log(data);
    console.log(id);
    if (
      document.querySelector("#article" + id).innerHTML ==
      ""
    ) {
      for (let elt of data) {
        let html = '<div class="comments">';
        html +=
          '<p class="dateAuthor">le ' +
          elt.created_at +
          " | " +
          elt.username +
          "</p>";
        html +=
          '<p class="textComments"> ' +
          elt.content +
          "</p>";
        html += "</div>";
        document.querySelector("#article" + id).innerHTML +=
          html;
      }
      console.log(data);
    } else {
      document.querySelector("#article" + id).innerHTML =
        "";
    }
  }
  //pose d'un ecouteur sur l'image oeil
  //chercher les commentaires associes au post
  //afficher les commentaires
})();
