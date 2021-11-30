var product;
var slideIndex = 1;

function loadProduct(){
    if(checkLogin())
        document.getElementById("report").style="display: flex";
    var url = new URL(window.location.href);
    let category = url.searchParams.get("category");
    let search = url.searchParams.get("search");
    if(search!=null){
        keywords = search.split(' ');
        document.getElementById("navegacio").innerHTML='<a href="index.html">Welcome</a> &gt; <a href="browser.html?search='+search+'">Browser</a> &gt; <a href="products.html?search='+search+'" id="local">Products by ['+search+']</a> &gt; <a href="product.html" id="navProd">Product</a>';
        document.getElementById("prods").className="fesClick";
        document.getElementById("brows").className="fesClick seleccionat";
    }
    if(category!=null){
        document.getElementById("navegacio").innerHTML='<a href="index.html">Welcome</a> &gt; <a href="categories.html" >Categories</a> &gt; <a href="products.html?category='+category+'">'+category+'</a> &gt; <a href="product.html" id="navProd">Product</a>';
        document.getElementById("prods").className="fesClick";
        document.getElementById("cats").className="fesClick seleccionat";
    }
    product = url.searchParams.get("id");
    if(product==null)
        window.location.href="index.html";
    document.title=ArrayProductes[product].nom+" · FSDP";
    document.getElementById("titolProducte").innerText=ArrayProductes[product].nom;
    document.getElementById("description").innerText=ArrayProductes[product].descripcio;
    document.getElementById("licButton").setAttribute('onClick', 'href("license.html?id='+product+(category!=null?'&category='+category:'')+(search!=null?'&search='+search:'')+'")');
    document.getElementById("os").innerText=ArrayProductes[product].requirements.OS;
    document.getElementById("cpu").innerText=ArrayProductes[product].requirements.CPU;
    document.getElementById("ram").innerText=ArrayProductes[product].requirements.RAM;
    document.getElementById("rom").innerText=ArrayProductes[product].requirements.Storage;
    document.getElementById("gpu").innerText=ArrayProductes[product].requirements.GraphicCard;
    document.getElementById("softImg").src = ArrayProductes[product].logo;
    var dots = document.getElementById("dots");
    var imgs = document.getElementById("imgs");
    var inner="";
    var innerImgs="";
    for(var i=0;i<ArrayProductes[product].slides.length;i++){
        inner=inner+'<span class="dot" onclick="currentSlide('+(i+1)+')"></span>';
        innerImgs=innerImgs+'<div class="mySlides fade"><div class="numbertext">'+(i+1)+' / '+ArrayProductes[product].slides.length+'</div><img src="'+ArrayProductes[product].slides[i]+'" class="slideshow-container-img"></div>';
    }
    dots.innerHTML=inner;
    imgs.innerHTML=innerImgs+imgs.innerHTML;
        
    var navegacio=document.getElementById("navProd");
    navegacio.innerText=ArrayProductes[product].nom;
    navegacio.href=window.location.href;
    product=ArrayProductes[product].nom;
    showSlides(slideIndex);
}

function download(type) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:binary/plain;charset=utf-8,' + encodeURIComponent(""));
    element.setAttribute('download', type+"-"+product.replace(/ /g,"_")+"_");
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

setInterval(function(){ 
    plusSlides(1);
}, 3000);

function plusSlides(n) {
    slideIndex += n;
    showSlides(slideIndex);
}
  
function currentSlide(n) {
    slideIndex = n;
    showSlides(slideIndex);
}
  
function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
}
