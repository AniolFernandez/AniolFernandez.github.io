let id;
function changeList(nou=true){
    let product =document.getElementById("product");
    let category =document.getElementById("category");
    let descrip = document.getElementById("description");
    let logo = document.getElementById("logo");
    let slide1 = document.getElementById("slide1");
    let slide2 = document.getElementById("slide2");
    let slide3 = document.getElementById("slide3");
    let os = document.getElementById("os");
    let cpu = document.getElementById("cpu");
    let ram = document.getElementById("ram");
    let storage = document.getElementById("storage");
    let gpu = document.getElementById("gpu");
    if(product.value=="" || category.value=="" || descrip.value=="" || os.value=="" || cpu.value=="" ||
    ram.value=="" || storage.value=="" || gpu.value==""){
        crearPopup("Missing fields", "There are required fields missing", "❌", "red");
        return;
    }
    
    let newProduct = {
        "by":"admin",
        "nom": "Mozilla Firefox",
        "categoria": "Browsers",
        "descripcio": "",
        "requirements": {
          "OS": "Any",
          "CPU": "Intel Pentium",
          "RAM": "1 GB",
          "Storage": "512 MB",
          "GraphicCard": "-"
        },
        "logo": "img/software_placeholder.svg",
        "slides": [
          "img/software_placeholder1.svg",
          "img/software_placeholder2.svg",
          "img/software_placeholder3.svg",
        ]
    }
    newProduct.by=localStorage.getItem("usr");
    newProduct.nom=product.value;
    newProduct.categoria=category.value;
    newProduct.descripcio=descrip.value;
    newProduct.requirements.OS=os.value;
    newProduct.requirements.CPU=cpu.value;
    newProduct.requirements.RAM=ram.value;
    newProduct.requirements.Storage=storage.value;
    newProduct.requirements.GraphicCard=gpu.value;
    if(logo.value!="")
        newProduct.logo=logo.value;
    if(slide1.value!="")
        newProduct.slides[0]=slide1.value;
    if(slide2.value!="")
        newProduct.slides[1]=slide2.value;
    if(slide3.value!="")
        newProduct.slides[2]=slide3.value;
    
    if(nou)
        ArrayProductes.push(newProduct);
    else
        ArrayProductes[id] = newProduct;
    ArrayProductes.sort((a, b) => (a.nom > b.nom) ? 1 : -1);
    localStorage.setItem("productes",JSON.stringify(ArrayProductes));

    if(nou){
        crearPopup("Upload completed!", "", "👌", "#B3F58E");
        product.value="";
        category.value="";
        descrip.value="";
        os.value="";
        cpu.value="";
        ram.value="";
        storage.value="";
        gpu.value="";
        logo.value="";
        slide1.value="";
        slide2.value="";
        slide3.value="";
    }
    else{
        crearPopup("Modification saved!", "", "👌", "#B3F58E");
        loadFieldsMod();
    }
}

function loadModify(){
    loginRestricted();
    loadFieldsMod();
}

function loadFieldsMod(){
    var url = new URL(window.location.href);
    let product = url.searchParams.get("id");
    if(product!=null){
        let productF =document.getElementById("product");
        let category =document.getElementById("category");
        let descrip = document.getElementById("description");
        let logo = document.getElementById("logo");
        let slide1 = document.getElementById("slide1");
        let slide2 = document.getElementById("slide2");
        let slide3 = document.getElementById("slide3");
        let os = document.getElementById("os");
        let cpu = document.getElementById("cpu");
        let ram = document.getElementById("ram");
        let storage = document.getElementById("storage");
        let gpu = document.getElementById("gpu");
        productF.value=ArrayProductes[product].nom;
        category.value=ArrayProductes[product].categoria;
        descrip.value=ArrayProductes[product].descripcio;
        os.value=ArrayProductes[product].requirements.OS;
        cpu.value=ArrayProductes[product].requirements.CPU;
        ram.value=ArrayProductes[product].requirements.RAM;
        storage.value=ArrayProductes[product].requirements.Storage;
        gpu.value=ArrayProductes[product].requirements.GraphicCard;
        logo.value=ArrayProductes[product].logo;
        slide1.value=ArrayProductes[product].slides[0];
        slide2.value=ArrayProductes[product].slides[1];
        slide3.value=ArrayProductes[product].slides[2];
        id=product;
        let nav = document.getElementById("modi");
        nav.href=window.location.href;
        nav.innerText="Modify ["+ArrayProductes[product].nom+"]";
    }
    else
        window.location.href="index.html";
}

function loadPrivateProducts(){
    loginRestricted();
    let jo=localStorage.getItem("usr");
    let fastString="";
    for(var i=0; i<ArrayProductes.length;i++ ){
        if(ArrayProductes[i].by == jo){
            let ref = '"modify.html?id='+i+'"';
            fastString+="<li><h4>➢ "+ArrayProductes[i].nom+"</h4><span onclick='href("+ref+")' class='fesClick'>✏️</span><span class='fesClick' onclick='eliminar("+i+")'>❌</span></li>";
        }
    }
    if(fastString=="")
        fastString="<h2>You haven't uploaded any software yet. Please upload some.</h2>";
    document.getElementById("myProducts").innerHTML=fastString;
}

function eliminar(i){
    popupPregunta("Remove "+ArrayProductes[i].nom+"?","ferEliminacioEfectiva("+i+")");
}

function ferEliminacioEfectiva(i){
    ArrayProductes.splice(i, 1);
    localStorage.setItem("productes",JSON.stringify(ArrayProductes));
    window.location.reload();
}