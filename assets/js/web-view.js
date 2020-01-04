function prev() {
    var link = document.getElementById("web-link");
    var url = document.getElementById("web-url");
    var view = document.getElementById("web-view");
    link.href = "http://alumnos.eii.uva.es/"
    url.textContent = "alumnos.eii.uva.es"
    view.src = "http://alumnos.eii.uva.es/"
}

function next() {
    var link = document.getElementById("web-link");
    var url = document.getElementById("web-url");
    var view = document.getElementById("web-view");
    link.href = "https://raullazaro.com/fugoroba/"
    url.textContent = "fugoroba.es"
    view.src = "https://raullazaro.com/fugoroba/"
}