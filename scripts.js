(function () {
  let cnx = document.querySelector(".connexion");
  cnx.addEventListener("click", openPopup);

  function openPopup() {
    // verfier si la pop up est deja ouverte ou non
    console.log(document.querySelector("#popup"));
    if (document.querySelector("#popup") == null) {
      let popup = document.createElement("div");
      popup.id = "popup";
      popup.classList.add("popup");
      document
        .getElementById("container")
        .appendChild(popup);

      let entete = document.createElement("div");
      entete.id = "entete";
      entete.classList.add("entete");
      entete.innerHTML =
        "<button class='permute'>Inscription</button>";
      entete.innerHTML += "<span class='close'>X</span>";

      let corps = document.createElement("div");
      corps.id = "corps";
      corps.classList.add("corps");

      popup.appendChild(entete);
      popup.appendChild(corps);
      formLogin();

      document
        .querySelector(".close")
        .addEventListener("click", () => {
          document.querySelector("#popup").remove();
        });

      document
        .querySelector(".permute")
        .addEventListener("click", (e) => permutation(e));
    } // condition si pop up existe pas
  }

  function permutation(e) {
    if (e.target.innerText == "Inscription") {
      formInscription();
      e.target.innerText = "Connexion";
    } else {
      formLogin();
      e.target.innerText = "Inscription";
    }
  }

  function formInscription() {
    document.querySelector("#corps").innerHTML = "";

    let form = "<form id='forminscription'>";
    form +=
      "<div><label for='login'>Nom d'utilisateur</label></div>";
    form +=
      "<div><input type='text' id='login' name='login'></div>";

    form +=
      "<div><label for='mail'>Adresse mail</label></div>";
    form +=
      "<div><input type='email' id='email' name='email'></div>";

    form +=
      "<div><label for='password'>Mot de passe</label></div>";
    form +=
      "<div><input type='password' id='pwd' name='pwd'></div>";

    form +=
      "<div><label for='password'>Confirmation du mot de passe</label></div>";
    form +=
      "<div><input type='password' id='confirpwd' name='confirmpwd'></div>";

    form +=
      "<div><button type='submit'>Valider</button></div>";
    form += "</form>";

    document.querySelector("#corps").innerHTML = form;
    document
      .querySelector("#forminscription")
      .addEventListener("submit", function (e) {
        e.preventDefault();
        let formdata = Object.fromEntries(
          new FormData(e.target).entries()
        );
        verifInscription(formdata);
      });
  }

  function formLogin() {
    let form = "<form id='formlogin'>";
    form +=
      "<div><label for='login'>Nom d'utilisateur</label></div>";
    form +=
      "<div><input type='text' id='login' name='login'></div>";

    form +=
      "<div><label for='password'>Mot de passe</label></div>";
    form +=
      "<div><input type='password' id='pwd' name='pwd'></div>";

    form +=
      "<div><button type='submit'>Valider</button></div>";
    form += "<div class='error'></div>";
    form += "</form>";

    document.querySelector("#corps").innerHTML = form;
    document
      .querySelector("#formlogin")
      .addEventListener("submit", function (e) {
        e.preventDefault();
        let formdata = Object.fromEntries(
          new FormData(e.target).entries()
        );
        verifLogin(formdata);
      });
  }

  // ///////// LOGIN

  function verifLogin(formdata) {
    let ok = true;
    // to do
    if (ok) {
      sendCnxData(formdata);
    }
  }

  // /////// INSCRIPTION

  function verifInscription(formdata) {
    // verifier le formulaire inscription
    let ok = true;
    if (ok) {
      sendInscriptionData(formdata);
    }
  }

  function sendInscriptionData(formdata) {
    formdata.action = "inscription";
    console.log(formdata);
    let fetchData = {
      method: "POST",
      body: JSON.stringify(formdata),
      header: { "Content-type": "application/json" },
    };
    fetch("controller.php", fetchData)
      .then((response) => response.json())
      .then((response) => successInscription(response))
      .catch((error) => failure(error));
  }

  function sendCnxData(formdata) {
    formdata.action = "login";

    let fetchData = {
      method: "POST",
      body: JSON.stringify(formdata),
      header: { "Content-type": "application/json" },
    };

    fetch("controller.php", fetchData)
      .then((response) => response.json())
      .then((response) => success(response))
      .catch((error) => failure(error));
  }

  function success(response) {
    
    if (response == 1) {
      localStorage.userType = "admin";
      document.querySelector("#popup").remove();
      document.querySelector(".connexion").textContent =
        "Deconnexion";
    }
    if (response == 2) {
      localStorage.userType = "user";
      document.querySelector("#popup").remove();
      document.querySelector(".connexion").textContent =
        "Deconnexion";
    }
  
    if (response == 0) {
      document.querySelector(".error").textContent =
        "login ou mot de passe invalide";
    }
  }

  function failure(error) {
    console.log(error);
  }

  function successInscription(response) {
    console.log(response);
    formLogin();
  }
})();
