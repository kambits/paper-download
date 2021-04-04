chrome.contextMenus.create({title: "paper download",contexts:["link"], onclick:genericOnClick }); 

function genericOnClick(info, tab) { 
	var a = info.linkUrl;
	if (a.substr(0,6) == "https:")
	{
		
		var index = a.indexOf("/", 8)
		var url = ("https://sci-hub.se/" + a);
		var xhr = new XMLHttpRequest();
		xhr.open("GET", url, true);
		xhr.send(null);	
		xhr.responseType = "document";
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				if (xhr.status==200)
			    {	
					var name = info.selectionText + ".pdf";
					var docu = xhr.responseXML;
					var div = docu.getElementById("article");
					var message =div.getElementsByTagName("iframe");
					nodemap = message[0].attributes;
					nodeurl = nodemap[0].nodeValue;
					if (nodeurl.substr(0,6) != "https:") {
						var nodeurl = "https:" + nodeurl
					}
					var name = String(name).replace("/", "-");
					var name = String(name).replace(":", "-");
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