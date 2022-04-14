
function load(){
    if(localStorage.getItem("cookies") == null && window.location.search.indexOf("nopop") == -1){
        showCookies();
    }
}
function tancar(){
    localStorage.setItem("cookies", "true");
    document.getElementById("cookies").remove();
}

function showCookies(){
    document.getElementsByTagName("body")[0].innerHTML += '<div id="cookies"> <div id="here"> <h1>Gestor de cookies</h1> <!-- Rounded switch --> <div> <label class="switch"> <input type="checkbox" checked="true"> <span class="slider round"></span> </label> <span style="width: 10px;"></span> <h3>Cookies essencials</h3> </div> <p>Permeten el correcte funcionament de la pagina web i el seu contingut <a href="politica-cookies.html?nopop=true">+info</a></p> <div> <label class="switch"> <input type="checkbox" checked="true"> <span class="slider round"></span> </label> <span style="width: 10px;"></span> <h3>Cookies de personalització</h3> </div> <p>Guarden les característiques generals de la configuració de l’usuari <a href="politica-cookies.html?nopop=true">+info</a></p> <div> <label class="switch"> <input type="checkbox" checked="true"> <span class="slider round"></span> </label> <span style="width: 10px;"></span> <h3>Cookies de analítica i rendiment</h3> </div> <p>Permeten estudiar i millorar la plana web i millorar la experiència de usuari <a href="politica-cookies.html?nopop=true">+info</a></p> <div> <label class="switch"> <input type="checkbox"> <span class="slider round"></span> </label> <span style="width: 10px;"></span> <h3>Cookies de publicitat personalitzada</h3> </div> <p>Recullen informació de la activitat de navegació per oferir publicitat rellevant <a href="politica-cookies.html?nopop=true">+info</a></p> </div>';
    var button = document.createElement("button");
    button.innerText="Desar preferències";
    button.setAttribute("onclick", "tancar()");

    document.getElementById("here").appendChild(button);
}

