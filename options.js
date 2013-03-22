if(localStorage["list"] != null) document.getElementById("list").value = localStorage["list"]

document.getElementById("save").addEventListener("click", function() {
  save_list();
}, false)

function save_list() {
	localStorage["list"] = document.getElementById("list").value
	console.log("saved")
}