let goBack;

function loadParams(){
    var url = new URL(window.location.href);
    goBack = url.searchParams.get("href");//Per tornar on estavem
    if(goBack==null)
    goBack="index.html";
}

function loadParams2(){
    loadParams();
    document.getElementById("regist").href="register.html?href="+encodeURIComponent(goBack);
}

function login(){
    let usr=document.getElementById("usr").value;
    let pass=document.getElementById("pass").value;
    let resultat = obtenirUsuaris()[usr];//Es un diccionari de "usuari:contrasenya"
    if(resultat!=null){
        if(resultat == pass){
            localStorage.setItem("usr",usr);
            window.location=goBack;
        }
        else
            crearPopup("Wrong password", "The inputed password is not correct.", "❌", "red");
    }
    else
        crearPopup("Wrong username", "The user "+usr+" does not exist.", "❌", "red");
}

function register(){
    let usr=document.getElementById("regist").value;
    let pass=document.getElementById("passR").value;
    let pass2=document.getElementById("passR2").value;
    let resultat = obtenirUsuaris()[usr];//Es un diccionari de "usuari:contrasenya"
    if(resultat==null){
        if(pass2 == pass){
            let usrsActu = obtenirUsuaris();
            usrsActu[usr]=pass;
            actualitzarUsuaris(usrsActu);
            window.location="login.html?href="+encodeURIComponent(goBack);
        }
        else
            crearPopup("Passwords unmatching", "Passwords are not matching.", "❌", "red");
    }
    else
        crearPopup("Username taken", "The username "+usr+" does already exist.", "❌", "red");
}