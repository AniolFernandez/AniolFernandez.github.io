let products = [];
let paginesTotals=0;
let paginaActual=0;
let midaPagina=3;
function loadContent(){
    checkLogin();
    var url = new URL(window.location.href);
    let category = url.searchParams.get("category");
    let search = url.searchParams.get("search");
    let keywords;
    if(search!=null){
        keywords = search.split(' ');
        document.getElementById("navegacio").innerHTML='<a href="index.html">Welcome</a> &gt; <a href="browser.html?search='+search+'">Browser</a> &gt; <a href="products.html?search='+search+'" id="local">Products by ['+search+']</a>';
        document.getElementById("prods").className="fesClick";
        document.getElementById("brows").className="fesClick seleccionat";
    }
    if(category!=null){
        document.getElementById("navegacio").innerHTML='<a href="index.html">Welcome</a> &gt; <a href="categories.html">Categories</a> &gt; <a href="categories.html" id="local">Category</a>';
        document.getElementById("prods").className="fesClick";
        document.getElementById("cats").className="fesClick seleccionat";
        var nav = document.getElementById("local");
        nav.href=window.location.href;
        nav.innerText=category;
    }
    
    let clonProductes = Object.create(ArrayProductes);
    for(var i=0;i<clonProductes.length;i++){
        //Genera contingut
        if(category==null || clonProductes[i].categoria==category){
            if(search==null || matchSearch(clonProductes[i], keywords)){
                var textTitol = clonProductes[i].nom;//randomIpsum(2,6);
                var textDescrip = clonProductes[i].descripcio//randomIpsum(40,200)+".";
                var div = document.createElement('div');
                div.className = 'producte';
                var titol = document.createElement("h2");
                titol.innerHTML = (products.length+1)+".- "+textTitol;
                var contingut = document.createElement("p");
                contingut.innerHTML = textDescrip; //html ja que conté propietats
                var button = document.createElement("button");
                button.innerText="View product";
                button.className="fesClick";
                button.setAttribute('onClick', 'href("product.html?id='+i+(category!=null?'&category='+category:'')+(search!=null?'&search='+search:'')+'#nav")');
                div.appendChild(titol);
                var cat = document.createElement("h3");
                cat.innerHTML = "Category: "+clonProductes[i].categoria;
                var upl = document.createElement("em");
                upl.innerHTML = "Uploaded by: "+clonProductes[i].by;
                div.appendChild(cat);
                div.appendChild(upl);
                div.appendChild(contingut);
                div.appendChild(button);
                products.push(div);
            }  
        } 
    }
    if(products.length==0){
        var noRes = document.createElement("h3");
        noRes.innerText = "No results found.";
        noRes.style="padding-left: 30px";
        products.push(noRes);
    }

    //Generar el selector de pagines
    var selector = document.createElement('div');
    selector.className = "paginesProductes";
    var esq = document.createElement("p");
    esq.setAttribute('onClick', 'moure(-1)');
    esq.innerText="<<"
    esq.className="fesClick";
    selector.appendChild(esq);
    paginesTotals=Math.ceil(products.length/midaPagina);
    for(i=1;i<=paginesTotals;i++){
        var el = document.createElement("p");
        el.setAttribute('onClick', 'carregarPagina('+(i-1)+')');
        el.innerText=i;
        el.setAttribute('name', ""+(i-1));
        if(i!=1)
            el.className="fesClick";
        else
            el.className="fesClick seleccionat2";
        selector.appendChild(el);
    }

    var dre = document.createElement("p");
    dre.setAttribute('onClick', 'moure(1)');
    dre.innerText=">>"
    dre.className="fesClick";
    selector.appendChild(dre);

    var selector2 = selector.cloneNode(true);

    var contenidor=document.getElementById("contenidorProductes");
    contenidor.parentNode.insertBefore(selector, contenidor.previousSibling);
    contenidor.parentNode.insertBefore(selector2, contenidor.nextSibling);


    carregarPagina(0);
}

function moure(direccio){
    paginaActual+=direccio;
    if(paginaActual<0)
        paginaActual=paginesTotals-1;
    else if(paginaActual>=paginesTotals)
        paginaActual=0;
    carregarPagina(paginaActual);
}

function carregarPagina(pagina){
    paginaActual=pagina;
    var contenidor=document.getElementById("contenidorProductes");
    
    //Flush del que hi ha
    contenidor.innerHTML="";

    //Emplenar pàgina
    var i=paginaActual*midaPagina;
    var max=paginaActual*midaPagina+midaPagina;
    while(i<max && i<products.length)
        contenidor.appendChild(products[i++]);

    //Reset dels selectors
    var elements = document.getElementsByClassName("fesClick seleccionat2");
    var elems=elements.length;
    for(var i=0;i<elems;i++)
        elements[0].className="fesClick";//Fet aixi ja que al canviar desapareixen de la llista
    
    var elements2 = document.getElementsByName(paginaActual);
    [].forEach.call(elements2, function (el) {el.className="fesClick seleccionat2";});
}

//Funció ultra costosa... pero es el que hi ha sense bdd
function matchSearch(producte, keywords){
    let conte=false;
    for(var i=0;i<keywords.length;i++){
        let inicial = producte.nom.length+producte.descripcio.length+producte.categoria.length;
        var regex = new RegExp(keywords[i], "ig");
        var canvi = "<span class='marcat'>"+keywords[i]+"</span>";
        producte.nom = producte.nom.replace(regex,canvi);
        producte.descripcio = producte.descripcio.replace(regex,canvi);
        producte.categoria = producte.categoria.replace(regex,canvi);
        if(inicial!=producte.nom.length+producte.descripcio.length+producte.categoria.length)
            conte=true;
    }
    return conte;
}