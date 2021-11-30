function loadLicense(){
    checkLogin();
    var url = new URL(window.location.href);
    let category = url.searchParams.get("category");
    let search = url.searchParams.get("search");
    if(search!=null){
        keywords = search.split(' ');
        document.getElementById("navegacio").innerHTML='<a href="index.html">Welcome</a> &gt; <a href="browser.html?search='+search+'">Browser</a> &gt; <a href="products.html?search='+search+'" id="local">Products by ['+search+']</a> &gt; <a href="product.html" id="navProd">Product</a> &gt; <a href="license.html" id="navLic">License</a>';
        document.getElementById("prods").className="fesClick";
        document.getElementById("brows").className="fesClick seleccionat";
    }
    if(category!=null){
        document.getElementById("navegacio").innerHTML='<a href="index.html">Welcome</a> &gt; <a href="categories.html" >Categories</a> &gt; <a href="products.html?category='+category+'">'+category+'</a> &gt; <a href="product.html" id="navProd">Product</a> &gt; <a href="license.html" id="navLic">License</a>';
        document.getElementById("prods").className="fesClick";
        document.getElementById("cats").className="fesClick seleccionat";
    }
    product = url.searchParams.get("id");
    document.getElementById("titolProducte").innerText="License of "+ArrayProductes[product].nom;
    var navegacio=document.getElementById("navProd");
    navegacio.innerText=ArrayProductes[product].nom;
    navegacio.href="product.html?id="+product+(search!=null?'&search='+search:'');
    var navegacio2=document.getElementById("navLic");
    navegacio2.innerText="License";
    navegacio2.href=window.location.href;
    document.getElementById("description").innerText = randomIpsum(loremIpsum.length,loremIpsum.length);
}