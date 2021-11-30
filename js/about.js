let contenidor;
let i=0;

let repetir;
function loadAbout(){
    checkLogin();
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    contenidor=document.getElementById("contenidor").children;
    window.setInterval(function(){
        repetir=comprovarSiMostrar();
    }, 50);
    
}

function comprovarSiMostrar(){
    if(i<contenidor.length){
        if(esVisible(contenidor[i])){
            contenidor[i].className = (i%2==0)? "venirEsq":"venirDret";
            contenidor[i].style.visibility = "visible";
            i++;
        }
    }
    else
        clearInterval(repetir);
}

function esVisible(element) {
    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
}