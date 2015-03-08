A simple web application, which allows you to pass any URL from one browser to another.

Requirements
------------
* Node.js with some plug-ins (see [package.json](https://github.com/PowerRabbit/URLRetriever/blob/master/package.json) for details)
* Installed PostgreSQL (if you prefer another DB, you have to re-write the [toDB method](https://github.com/PowerRabbit/URLRetriever/blob/master/modules/main.js#L55) with a predefined table (CREATE TABLE main (username varchar(32), salt varchar(32), pass char(44), url text);). Also you have to add an user with a password and a salt.
* Browsers, supporting bookmarklets.

Bookmarklet
------------
can be found [there](https://github.com/PowerRabbit/URLRetriever/blob/master/bookmarklet/bookmarklet.js)

How it works
------------
You should add 2 bookmarks to your browsers:
* URL 'http://your_server_host/get'
* [Bookmarklet](https://github.com/PowerRabbit/URLRetriever/blob/master/bookmarklet/bookmarklet.js)

Then open an URL, which you would like to pass to another browser.

Press Bookmarklet. If you are not authorized yet, it will call an auth form ([that script](https://github.com/PowerRabbit/URLRetriever/blob/master/public/out/j.js)). The URL will be sent to the server.

After that you are able to load the URL 'http://your_server_host/get' from any browser and it will redirect you to the last saved URL.
