chrome.contextMenus.create({title: "paper download",contexts:["link"], onclick:genericOnClick }); 

function genericOnClick(info, tab) { 
	var a = info.linkUrl;
	console.log(a)
	if (a.substr(0,6) == "https:")
	{
		
		// console.log(name)
		var index = a.indexOf("/", 8)
		// var url = (a.substr(0, index) + ".sci-hub.se" + a.substr(index));
		var url = ("https://sci-hub.se/" + a);
		console.log(url)
		var xhr = new XMLHttpRequest();
		xhr.open("GET", url, true);
		xhr.send(null);	
		xhr.responseType = "document";
		// console.log(xhr)
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				if (xhr.status==200)
			    {	
					var name = info.selectionText + ".pdf";
					var docu = xhr.responseXML;
					var div = docu.getElementById("article");
					var message =div.getElementsByTagName("iframe");
					// console.log(message)
					nodemap = message[0].attributes;
					console.log(nodemap)
					nodeurl = nodemap[0].nodeValue;
					if (nodeurl.substr(0,6) != "https:") {
						var nodeurl = "https:" + nodeurl
					}
					console.log(nodeurl)
					console.log(name);
					console.log(typeof(name))
					var name = String(name).replace("/", "-");
					console.log(name);
					var name = String(name).replace(":", "-");
					console.log(name);
					chrome.downloads.download({
					url: nodeurl,
					filename:name
					});
			    }
			  else
			    {
			    alert("Problem retrieving XML data:" + xmlhttp.statusText);
			    }
			}
		}
	}
}