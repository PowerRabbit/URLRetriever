/*  
    Creates auth form
*/
(function (global) {

    'use strict';

    var window = global,
        document = window.document,
        ident = 'ergGERGgerb543Vtrgf23_fewRRGTR534PF',
        WORKING_URL = 'http://127.0.0.1:8090/',
        formId = ident + '_form',
        toRemove = document.getElementById(ident),
        createForm,
        destroyForm,
        submitAuth,
        sendRequest;

    createForm = function () {
        var bg = document.createElement('div'),
            form = document.createElement('div'),
            user = document.createElement('input'),
            pass = document.createElement('input'),
            submit = document.createElement('input');

        bg.style.cssText = 'position:fixed; top:0px; left:0; padding:0; margin:0; width: 100%; height:100%; background:#fff; opacity:0.1; z-index:1000000000;';
        form.style.cssText = 'position:fixed; top:10px; left:50%; padding:5px; margin: 0 0 0 -150px; width: 300px; background:#fff; box-shadow: 0 0 10px #000; border-radius:5px; z-index:1000000000;';
        user.style.cssText = pass.style.cssText = submit.style.cssText = 'width: 100%; margin:0 0 10px; padding:0;';
        user.setAttribute('placeholder', 'Username');
        pass.setAttribute('placeholder', 'Password');
        pass.type = 'password';
        submit.type = 'submit';

        submit.onclick = function () {
            submitAuth(user, pass);
        };
        bg.onclick = destroyForm;

        form.id = formId;
        form.appendChild(user);
        form.appendChild(pass);
        form.appendChild(submit);
        document.body.appendChild(bg);
        document.body.appendChild(form);
        user.focus();
    };

    submitAuth = function (user, pass) {
        var username = user.value,
            password = pass.value,
            params;
        if (username.length > 0 && password.length > 0) {
            params = {
                user: username,
                password: password
            };
            sendRequest(WORKING_URL + 'auth', params);
            destroyForm();
        }
    };

    destroyForm = function (form, bg) {
        document.body.removeChild(form);
        document.body.removeChild(bg);
    };

    sendRequest = function (to, params) {
        var xhr = new window.XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.open("POST", to, true);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var resp = JSON.parse(xhr.responseText);
                if (resp) {
                    if (resp.status !== undefined) {
                        switch (resp.status) {
                        case 0:
                            createForm();
                            break;
                        case 1:
                            params = {
                                url: window.top.location.href
                            };
                            sendRequest(WORKING_URL + 'set', params);
                            break;
                        }
                    }
                }
            }
        };
        xhr.send(JSON.stringify(params));
    };

    document.body.removeChild(toRemove);

    createForm();
}(this));

/*  
    Compressed
*/
!function(e){"use strict";var t,i,n,s,a=e,d=a.document,o="ergGERGgerb543Vtrgf23_fewRRGTR534PF",p="http://127.0.0.1:8090/",r=o+"_form",c=d.getElementById(o);t=function(){var e=d.createElement("div"),t=d.createElement("div"),s=d.createElement("input"),a=d.createElement("input"),o=d.createElement("input");e.style.cssText="position:fixed; top:0px; left:0; padding:0; margin:0; width: 100%; height:100%; background:#fff; opacity:0.1; z-index:1000000000;",t.style.cssText="position:fixed; top:10px; left:50%; padding:5px; margin: 0 0 0 -150px; width: 300px; background:#fff; box-shadow: 0 0 10px #000; border-radius:5px; z-index:1000000000;",s.style.cssText=a.style.cssText=o.style.cssText="width: 100%; margin:0 0 10px; padding:0;",s.setAttribute("placeholder","Username"),a.setAttribute("placeholder","Password"),a.type="password",o.type="submit",o.onclick=function(){n(s,a)},e.onclick=i,t.id=r,t.appendChild(s),t.appendChild(a),t.appendChild(o),d.body.appendChild(e),d.body.appendChild(t),s.focus()},n=function(e,t){var n,a=e.value,d=t.value;a.length>0&&d.length>0&&(n={user:a,password:d},s(p+"auth",n),i())},i=function(e,t){d.body.removeChild(e),d.body.removeChild(t)},s=function(e,i){var n=new a.XMLHttpRequest;n.withCredentials=!0,n.open("POST",e,!0),n.setRequestHeader("Accept","application/json"),n.setRequestHeader("Content-type","application/json"),n.onreadystatechange=function(){if(4===n.readyState&&200===n.status){var e=JSON.parse(n.responseText);if(e&&void 0!==e.status)switch(e.status){case 0:t();break;case 1:i={url:a.top.location.href},s(p+"set",i)}}},n.send(JSON.stringify(i))},d.body.removeChild(c),t()}(this);