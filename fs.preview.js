/*

fs.preview module
https://github.com/albincorreya/Freesound_Max-MSP_Modules

Get low-quality audio preview services from freesound API

Albin Andrew Correya
Music Technology Group, UPF, Barcelona
2017

*/


outlets = 2;

var ajaxreq;
var more = "";
var clientsecret;
var url = "http://www.freesound.org/apiv2/search/1234/?fields=id,previews"; //just an example
url = encodeURI(url);

function token(val){
	post("preview token set to -->>", val, "\n");
	access_token = val;
}


function seturl(val) {
	url = encodeURI(val);
	post("\nPreview URL set to -->>",url);
}


function getPreview()
{
	ajaxreq = new XMLHttpRequest();
	ajaxreq.open("GET",url);
	ajaxreq.setRequestHeader("Authorization", "Bearer " + access_token);
	ajaxreq.onreadystatechange = readystatechange_parsejson;
	ajaxreq.send();
}


function readystatechange_parsejson()
{
	if (this.readyState == 4){
 		var myjson = JSON.stringify(this.responseText);
		var mystr = myjson.split('\\').join('');
		var str_out = mystr.substr(1).slice(0, -1);
		outlet(0,str_out)
		}
	}
