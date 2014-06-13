javascript : var xhr = new XMLHttpRequest();
var params = {url: window.top.location};
xhr.withCredentials = true;
xhr.open("POST", "http://127.0.0.1:8090/set", true);
xhr.setRequestHeader("Accept", "application/json");
xhr.setRequestHeader("Content-type","application/json");
xhr.onreadystatechange = function () {
	if (xhr.readyState == 4 && xhr.status == 200) {
		var resp = JSON.parse(xhr.responseText);
		if (resp && resp.formURL) {
			var script = document.createElement('script');
			script.id = 'ergGERGgerb543Vtrgf23_fewRRGTR534PF';
			script.src = resp.formURL;
			document.body.appendChild(script);
		}
	}
};
xhr.send(JSON.stringify(params));