(function(){



//chercher le type d'utilisateur
    // console.log(localeStorage.userType);
    //afficher les posts
    let topPost = null; //top post ou tous les post
    let varsearch = false;
    chargement();
    document.querySelector('#topPost').addEventListener('click', topPostFct);
    document.querySelector('#allPosts').addEventListener('click', allPostFct);
    document.querySelector('.iconesearch').addEventListener('click', research);

    function allPostFct(){
        topPost = null;
        varsearch = false;
        chargement();
    }
    
    function topPostFct(){
        topPost = 1;
        varsearch = false;
        chargement();
    }

    function research(){
        if (document.querySelector('#search').value !=""){
        topPost = null;
        varsearch = true;
        chargement();
        }  
    }
    //aller chercher les data (bdd / json)
    function chargement(){
        fetch('./posts.json')
        .then(response => response.json())
        .then(data => affichage(data))
        .catch (error => console.log(error));
    }
    //afficher les FormData

    function affichage(data) {
        document.querySelector('#postContainer').innerHTML = "";

        console.log(topPost);
        let i=0;
        let ok = true;
        
        for (elt of data){
            if (varsearch) {
                if (elt.username == document.querySelector('#search').value){
                    ok=true;
                }
                else{ok=false;}
            }


            // console.log(elt);
            if (ok) {
                let html ="<article class='article'>";
                
                html += "<header>";
                html += "<h1>" + elt.title + "</h1>";
                html += "</header>";

                html += "<div class='post'>";
                html += '<img src="img/images.jpg" alt="img"/>';
                html += '<p class="content">' + elt.content + '</p>';
                html += '</div>';

                html += '<footer class="postFooter">';
                html += '<div class"author">';
                html += '<p>' + elt.username +' | le ' + elt.created_at + '</p>';
                html += '</div>';
                html += '<div class="commentsView">';
                html += '<img id="id' +elt.id_articles + '"class="oeil hand" src="img/eye.svg" alt="see"/>';
                html += '<span>' + elt.nb_comments + 'commentaires </span>';
                html += '</div>';

                html += '</footer>';

                html += '</article>';
                html += '<aside id="article' + elt.id_articles + '">';

                html += '</aside>';
                //afficher la variable dans le dom
                document.querySelector('#postContainer').innerHTML+=html;
                i++;
                if(i == topPost){
                    break;
                }
            }
    }
    let eyes = document.querySelectorAll('.commentsView img');
    // console.log(eyes);
    for ( let eye of eyes) {

        eye.addEventListener('click', commentsMgnt);
        
    }
}
function commentsMgnt(e){
    let id = e.target.id.slice(2);
    // console.log(id);
    fetch('./comment.json')
    .then(response => response.json())
    .then(data => affichageComments(data,id))
    .catch (error => console.log(error));
}

function affichageComments(data,id) {
    // console.log(data);
    // console.log(id);
    if (document.querySelector('#article' + id).innerHTML == "") {
        for(let elt of data){
            let html = '<div class="comments">';
            html += '<p class="dateAuthor">le ' +elt.created_at+ ' | ' +elt.username + '</p>';
            html += '<p class="textComments">' + elt.content + '</p>';
            html += '</div>';
            document.querySelector('#article' + id).innerHTML += html;
        }

    } else {
        document.querySelector('#article' + id).innerHTML = "";
    }
    }
//pose d'un ecouteur sur l'image oeil
    //chercher les commentaires associes au post
    //afficher les commentaires
})();