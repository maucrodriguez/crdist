
function loadDoc(url) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
    	obj = JSON.parse(xhttp.responseText);
     	document.getElementById(obj['id']).innerHTML = obj['content'];
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
} 


function load_canton(obj_sel, initial){
	name=obj_sel.name.replace("province_", '');
	url = document.getElementById('div_canton_' + name).getAttribute("href");
	document.getElementById('div_district_' + name).innerHTML = "";
	url = url + '&province='+obj_sel.value;
	if (initial != undefined){
		url = url + "&initial="+initial;
	}
	loadDoc(url);
}


function load_district(obj_sel, initial){
	name=obj_sel.name.replace("canton_", '');
	url = document.getElementById('div_district_' + name).getAttribute("href");
	url = url + '&canton='+obj_sel.value;
	if (initial != undefined){
		url = url + "&initial=" + initial;
	}
	loadDoc(url);
}

window.addEventListener('load',  function() {
	var elems = document.getElementsByClassName("crdist_onerror");
	var name=undefined;
	for (var x=0; x<elems.length; x++){
	  name = elems[x].name.replace("err_", "div_");
	  var val = name.indexOf("div_canton_");
	  if (val>=0){
	    load_canton({'name': name.replace("div_canton_", "province_"),
	      			'value': elems[x].value }, elems[x].getAttribute("initial"));
	  }else{
	  	val = name.indexOf("div_district_");
	  	if (val>=0){
	      load_district({'name': name.replace("div_district_", "canton_"),
	      			'value': elems[x].value }, elems[x].getAttribute("initial"));
	   }
	  }
	}
},  false );
