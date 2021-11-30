function setupBrowser(){
    checkLogin();
    var url = new URL(window.location.href);
    let search = url.searchParams.get("search");
    if(search!=null){
        document.getElementById("browser").value = search;
    }
}

function browse(){
    let keywords = document.getElementById("browser").value;
    window.location="products.html?search="+keywords;
}