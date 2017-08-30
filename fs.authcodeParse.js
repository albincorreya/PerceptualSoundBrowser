/*
Parse authorisation code from the jweb object's response.

embedded in fs.oauth2module

Albin Andrew Correya
Music Technology Group, UPF, Barcelona
2017

*/

outlets = 1;
var iter = 0;

function counter(counts)
{
	iter = counts;
}


//Function to obtain freesound authorisation code by parsing the url output from the jweb object

function parser(uri)
{
	while(iter==1){
		var pars = uri.split("/");
		var tar_pars = " ";
		var a_token = " ";
		//post(pars,"\n");
		tar_pars = pars[6].split("=");
		//post(tar_pars);
		a_token = tar_pars[1];
		outlet(0,a_token);
		{ break; }
	}
}
