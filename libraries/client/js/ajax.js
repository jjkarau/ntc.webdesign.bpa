function ajax(url, callback) {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            if (xmlhttp.status == 200) {
                callback(xmlhttp.responseText);
            } else {
                alert("HTTP Error " + xmlhttp.status + " when loading tab browser.");
            }
        }
    };
    
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}