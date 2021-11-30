function loadCategories(){
    checkLogin();
    let setCaegories = new Set();
    for(var i=0;i<ArrayProductes.length;i++)
        setCaegories.add(ArrayProductes[i].categoria);

    let fastString="";
    let container = document.getElementById("container");
    for (let categoria of setCaegories){
        var div = document.createElement("div");
        div.setAttribute("class","fesClick");
        div.setAttribute("onClick","href('products.html?category="+categoria+"')");
        var titol = document.createElement("h1");
        titol.innerText=categoria;
        div.appendChild(titol);
        container.appendChild(div);
    }
}