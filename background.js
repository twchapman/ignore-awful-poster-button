chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
  	if(request.method === "get_list")
     	sendResponse({list: localStorage["list"]});
    else if(request.method === "add")
    	localStorage["list"] = localStorage["list"] + ',' + request.author
  });