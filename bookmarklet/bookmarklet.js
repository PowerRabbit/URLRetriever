/*
    Bookmarklet
*/
(function (global) {

    'use strict';

    var window = global,
        document = window.document,
        xhr = new window.XMLHttpRequest(),
        params = {url: window.top.location};

    xhr.withCredentials = true;
    xhr.open("POST", "http://127.0.0.1:8090/set", true);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-type", "application/json");

    xhr.onreadystatechange = function () {
        var resp,
            script;

        if (xhr.readyState === 4 && xhr.status === 200) {
            resp = window.JSON.parse(xhr.responseText);
            if (resp && resp.formURL) {
                script = document.createElement('script');
                script.id = 'ergGERGgerb543Vtrgf23_fewRRGTR534PF';
                script.src = resp.formURL;
                document.body.appendChild(script);
            }
        }
    };
    xhr.send(window.JSON.stringify(params));
}(this));

/*
    Compressed
*/
!function(e){"use strict";var t=e,n=t.document,s=new t.XMLHttpRequest,r={url:t.top.location};s.withCredentials=!0,s.open("POST","http://127.0.0.1:8090/set",!0),s.setRequestHeader("Accept","application/json"),s.setRequestHeader("Content-type","application/json"),s.onreadystatechange=function(){var e,r;4===s.readyState&&200===s.status&&(e=t.JSON.parse(s.responseText),e&&e.formURL&&(r=n.createElement("script"),r.id="ergGERGgerb543Vtrgf23_fewRRGTR534PF",r.src=e.formURL,n.body.appendChild(r)))},s.send(t.JSON.stringify(r))}(this);
