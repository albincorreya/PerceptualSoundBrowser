/*

Perceptual Sound Browser
Master Thesis
SMC Master, MTG, UPF


Json file parser for processing effiecient dynanic search functions needed for the proposed interface.




Thanks to the awesome MaxMsp forums which had always helped me to solve various issues and gave certain insights on solving these issues.

Viva Open Source

___________________________________________________________________________________________________________________________________________
An alternate efficiant way doing this task would be using a SQLite database. Since for the moment we are dealing with small number of files
json file processing was enough.  

var sqlite = new SQLite;
var result = new SQLResult;

function loadDB(){
	// Load an existing sqlite database to Max
	sqlite.open("/Users/Correya/Documents/Github/dataset_loader_freesound/extract.db",1);
	post("Database Loaded");
}


------------------------

Albin Andrew Correya
Music Technology Group
UPF

@2017

------------------------

*/



// Initiate required inputs and outputs for the max js object
inlets = 2;
outlets = 7;



var path = ""; //global variable for storing the json file path


// You have to inovke this function first when everytime you make some changes in the script or if you want to change sound class.
function setpath(class_name){
	path = "/Users/Correya/Documents/Github/dataset_loader_freesound/" + class_name + ".json"; // replace with the path where your json files are located
	post("\n JSON filepath set to ->", path);
}


function setPath(dir,class_name){
	var out = dir + "data/" + class_name + ".json";
	path = out;
	post("\nSet filepath to -> ",out);
}

function parsePath(dir){
	var fdir = dir.split(":").pop();
	outlet(4,fdir);
}	


// Set headers for the jit.cellblock object
function setHeaders(){
	headers = ["ID","Name","License"];
	for(var i=0;i<headers.length;i++){
		outlet(5,"set "+ i + " 0" + "\t" + headers[i]);
	}
}


function returnSubDict(){
	//Import the json file to a dict object and parse subdictionary for iterating over the sounds
	var main_dict = new Dict;
	main_dict.import_json(path);
	var m_key = main_dict.getkeys();
	var subdict = main_dict.get(m_key);
	return subdict;
}


/* This functions outputs all the sound ids and names inside a specific josn file to the jit.cellblock object
when an sound class is selected by the user */
function showAllSounds(){
	var d = returnSubDict();
	var keys = d.getkeys();
	var sorted_keys = keys.sort(function(a, b){return 0.5 - Math.random()});
	post('\nLENGTH',sorted_keys.length,d.length);
	y_dim = 1;
	for(var i=0;i<sorted_keys.length;i++){
		var str_out = "set 0 " + y_dim + "\t" + sorted_keys[i];
		outlet(6,sorted_keys.length+2);	
		setHeaders();
		var sname_out = "set 1 " + y_dim + "\t" + getSoundName(sorted_keys[i]);
		y_dim++;
		outlet(5,str_out);
		outlet(5,sname_out);
		
	}
}


// Function to round a floating number to the nearest integer
function roundtoInt(n){ return Math.round(Number(n)); };

// Function to set the min and max range of max slider object from computing the range of feature arrays
function setSliderRange(attrVal,thres){
	var d = returnSubDict();
	var keys = d.getkeys();
	var attrArray = [];
	for(var i=0;i<keys.length;i++){
		attrArray[i] = get_SoundAttributes(keys[i],attrVal);
	}
	var amax = roundtoInt(Math.max.apply(null,attrArray)) + thres //setting max slider range
	var amin = roundtoInt(Math.min.apply(null,attrArray)) - thres //setting min slider range
	//formatting as message for max slider object
	var out = "setminmax " + amin + " " + amax;
	//post("ATTRVAL",attrVal);
	if(attrVal==0){outlet(0,out);post("\nDepth slider range set to ",amin,amax);};
	if(attrVal==2){outlet(1,out);post("\nRoughness slider range set to ",amin,amax);};
	if(attrVal==3){outlet(2,out);post("\nHardness slider range set to ",amin,amax);};
	if(attrVal==4){outlet(3,out);post("\nBrightness slider range set to ",amin,amax);};
}


// get specific sound feature value for a specific sound id.	
function get_SoundAttributes(sound_id,val){
	var subdict = returnSubDict();
	var subkeys = subdict.getkeys();
	var sound_dict = subdict.get(sound_id);
	var sound_attr = sound_dict.getkeys();
	var out = sound_dict.get(sound_attr[val]);
	return out;
}


function iterSounds(val){
	var d = returnSubDict();
	var keys  = d.getkeys();
	var out = [];
 	for(var i=0; i<keys.length; i++){
		var sound_dict = d.get(keys[i]);
		var sound_attr = sound_dict.getkeys();
		var attr = sound_dict.get(sound_attr[val]);
		//post("\n",keys[i],"->>>",attr);
		//outlet(4, attr);
		out[i] = attr;
	}
	//post("\n\n\n itersounds out",out)
	return out;
}


function singleFilterThres(inputSlider,thres,attrVal){
	post("\n\nSlider",inputSlider);
	var d = returnSubDict();
	var keys  = d.getkeys();
	var attr = iterSounds(attrVal);
	var rank_list = [];
	var y_dim = 0;
	for(var i=0; i<attr.length; i++){
		//post("\n Single values ->", attr[i])
		if(attr[i]<(inputSlider+thres) && attr[i]>(inputSlider-thres)){
			//var rank_value = Math.abs(inputSlider - attr[i]);
			//post("\nCOMP--",attr[i],"-------",(inputSlider+thres));
			//post("\nRANK SINGLE --",rank_value);
			//rank_list[i] = [keys[i],rank_value,attr[i]];
			rank_list[i] = [keys[i],attr[i]];
			}
		// if(rank_value<=8){
		// 	//post(inputSlider,attr[i],distance[i],keys[i]);
		// 	//str_out = "set 0 " + y_dim + "\t" + keys[i];
		// 	y_dim = y_dim+1;
		// 	//outlet(5, str_out);
		// 	}
		//post("\n Distance-",distance[i],"->>",attr[i],"-- slider",inputSlider,"\n");
	}
	return rank_list;
}


function singleRankFilter(inputSlider,thres,attrVal){
	post("\n\nSlider",inputSlider);
	var d = returnSubDict();
	var keys  = d.getkeys();
	var attr = iterSounds(attrVal);
	var rank_list = [];
	var y_dim = 0;
	for(var i=0; i<attr.length; i++){
		var rank_value = Math.abs(inputSlider - attr[i]);
		if(rank_value < thres){
			}
		rank_list[i] = [keys[i],rank_value,attr[i]];
	}
	return rank_list;	
}


function showSingleFilter(inputSlider,thres,attr){
	var ranked_list = singleFilterThres(inputSlider,thres,attr);
	var sorted_list = ranked_list.sort(function(a, b){var x=a[1];var y=b[1];return y - x});
	var sorted_array = sorted_list.filter(function(e){ return e === 0 || e }); // to remove undefined elements
	var y_dim = 1;
	if(sorted_array.length==0){outlet(5,"clear all");outlet(6,sorted_array.length+2);setHeaders();}else{
		//post("\n BGAS",sorted_list[0][0]);
		//post("\n GASD",sorted_list[0][2]);}
		outlet(6,sorted_array.length+2);
		for(var i=0;i<sorted_array.length; i++){
			var str_out = "set 0 " + y_dim + "\t" + sorted_array[i][0];
			post("\nSingle Filter",str_out,'>>>',sorted_array[i]);
			var sname_out = "set 1 " + y_dim + "\t" + getSoundName(sorted_array[i][0]);
			y_dim = y_dim+1;
			outlet(5, str_out);
			outlet(5, sname_out);
		}
	}
	//return sorted_list;
}


function showSingleRank(inputSlider,thres,attr){
	var ranked_list = singleRankFilter(inputSlider,thres,attr);
	var sorted_list = ranked_list.sort(function(a, b){var x=a[1];var y=b[1];return x - y}); // asc sorting
	var sorted_array = sorted_list.filter(function(e){ return e === 0 || e }); // to remove undefined elements
	var y_dim = 1;
	if(sorted_array.length==0){outlet(5,"clear all");outlet(6,sorted_array.length+2);setHeaders();}else{
		outlet(6,sorted_array.length+2);
		for(var i=0;i<sorted_array.length; i++){
			var str_out = "set 0 " + y_dim + "\t" + sorted_array[i][0];
			var sname_out = "set 1 " + y_dim + "\t" + getSoundName(sorted_array[i][0]);
			y_dim = y_dim+1;
			//post("\nSINGLE RANK",str_out,sorted_array[i][1]);
			outlet(5, str_out);
			outlet(5, sname_out);
		}
	}
}

function multiIterSounds(){
	var d = returnSubDict();
	var keys  = d.getkeys();
	var out = [];
 	for(var i=0; i<keys.length; i++){
		var sound_dict = d.get(keys[i]);
		var sound_attr = sound_dict.getkeys();
		var depth = sound_dict.get(sound_attr[0]);
		var roughness = sound_dict.get(sound_attr[2]);
		var hardness = sound_dict.get(sound_attr[3]);
		var brightness = sound_dict.get(sound_attr[4]);
		out[i] = [keys[i],depth,roughness,hardness,brightness];
	}
	//for(var j=0; j<out.length; j++){post("\n Multi array",out[j]);}
	return out;
}

function filterMulti(depthSlider,roughnessSlider,hardnessSlider,brightnessSlider){
	//post("\n INPUT SLIDERS",depthSlider,roughnessSlider,hardnessSlider,brightnesSlider);
	var jsonArray = multiIterSounds();
	var ranked_list = [];
	for(var i=0;i<jsonArray.length;i++){
		if(jsonArray[i][1]<depthSlider+20 && jsonArray[i][2]<roughnessSlider+20 && jsonArray[i][3]<hardnessSlider+20 && jsonArray[i][4]<brightnessSlider+20){
			//post("\n Ranking",jsonArray[i]);
			//var rank_depth = Math.abs(depthSlider - jsonArray[i][1]);
			//var rank_rough = Math.abs(roughnessSlider - jsonArray[i][2]);
			//var rank_hard = Math.abs(hardnessSlider - jsonArray[i][3]);
			//var rank_bright = Math.abs(brightnessSlider - jsonArray[i][4]);
			//ranked_list[i] = [jsonArray[i][0],jsonArray[i][1],jsonArray[i][2],jsonArray[i][3],jsonArray[i][4],rank_depth,rank_rough,rank_hard,rank_bright];
			ranked_list[i] = [jsonArray[i][0],jsonArray[i][1],jsonArray[i][2],jsonArray[i][3],jsonArray[i][4]];
			//post("\nFinal Array",ranked_list[i]);
		}
		//post("\n hardness_array :",brightness[i]);
	}
	return ranked_list;
}

function showSortBy(depthSlider,roughnessSlider,hardnessSlider,brightnessSlider,attr){
	post("\n TARGET->>",depthSlider,roughnessSlider,hardnessSlider,brightnessSlider,attr);
	setHeaders();
	var ranked_list = filterMulti(depthSlider,roughnessSlider,hardnessSlider,brightnessSlider);
	var sorted = ranked_list.sort(function(a, b){var x=a[attr];var y=b[attr];return y - x});
	var sorted_array = sorted.filter(function(e){ return e === 0 || e }); // to delete undefined elements in the array
	for(var n=0;n<sorted_array.length;n++){post("\n Results",sorted_array[n]);}
	var y_dim = 1;
	if(sorted_array.length==0){outlet(5,"clear all");outlet(6,sorted_array.length+2);setHeaders();post("\n Sorted length",sorted_array.length);}else{
	outlet(6,sorted_array.length+2);
	for(var m=0;m<sorted_array.length;m++){
		//post("\nM->>",m);
		str_out = "set 0 " + y_dim + "\t" + sorted_array[m][0];
		y_dim++;
		post("\n Sound Ids->>",str_out);
		outlet(5,str_out);
	}
	}
}


function rankMulti(depthSlider,roughnessSlider,hardnessSlider,brightnessSlider,threshold){
	var jsonArray = multiIterSounds();
	//var ranked_list = filterMultiThreshold(depthSlider,roughnessSlider,hardnessSlider,brightnessSlider,20);
	var ranked_results = [];
	for(var i=0;i<jsonArray.length;i++){
		var rank_depth = Math.abs(depthSlider - jsonArray[i][1]);
		var rank_rough = Math.abs(roughnessSlider - jsonArray[i][2]);
		var rank_hard = Math.abs(hardnessSlider - jsonArray[i][3]);
		var rank_bright = Math.abs(brightnessSlider - jsonArray[i][4]);
		if(rank_depth<threshold && rank_rough<threshold && rank_hard<threshold && rank_bright<threshold){
			ranked_results[i] = [jsonArray[i][0],jsonArray[i][1],jsonArray[i][2],jsonArray[i][3],jsonArray[i][4],rank_depth,rank_rough,rank_hard,rank_bright];
		}
	}
	return ranked_results;
}

function filterMultiThreshold(depthSlider,roughnessSlider,hardnessSlider,brightnessSlider,thres){
	//post("\n INPUT SLIDERS",depthSlider,roughnessSlider,hardnessSlider,brightnesSlider);
	var jsonArray = multiIterSounds();
	var ranked_list = [];
	for(var i=0;i<jsonArray.length;i++){
		if(jsonArray[i][1]<depthSlider+thres && jsonArray[i][2]<roughnessSlider+thres && jsonArray[i][3]<hardnessSlider+thres && jsonArray[i][4]<brightnessSlider+thres){
			//post("\n Ranking",jsonArray[i]);
			//ranked_list[i] = [jsonArray[i][0],jsonArray[i][1],jsonArray[i][2],jsonArray[i][3],jsonArray[i][4],rank_depth,rank_rough,rank_hard,rank_bright];
			ranked_list[i] = [jsonArray[i][0],jsonArray[i][1],jsonArray[i][2],jsonArray[i][3],jsonArray[i][4]];
			//post("\nFinal Array",ranked_list[i]);
		}
		//post("\n hardness_array :",brightness[i]);
	}
	return ranked_list;
}

function rankMultiThreshold(depthSlider,roughnessSlider,hardnessSlider,brightnessSlider,threshold,filterThres){
	var jsonArray = multiIterSounds();
	//var ranked_list = filterMultiThreshold(depthSlider,roughnessSlider,hardnessSlider,brightnessSlider,filterThres);
	var ranked_results = [];
	for(var i=0;i<jsonArray.length;i++){
		var rank_depth = Math.abs(depthSlider - jsonArray[i][0]);
		var rank_rough = Math.abs(roughnessSlider - jsonArray[i][2]);
		var rank_hard = Math.abs(hardnessSlider - jsonArray[i][3]);
		var rank_bright = Math.abs(brightnessSlider - jsonArray[i][4]);
		if(rank_depth<threshold && rank_rough<threshold && rank_hard<threshold && rank_bright<threshold){}
		ranked_results[i] = [jsonArray[i][0],jsonArray[i][1],jsonArray[i][2],jsonArray[i][3],jsonArray[i][4],rank_depth,rank_rough,rank_hard,rank_bright];
	}
	return ranked_results;
}


function showFilterMulti(depthSlider,roughnessSlider,hardnessSlider,brightnessSlider,attr,thres){
	post("\n TARGET->>",depthSlider,roughnessSlider,hardnessSlider,brightnessSlider,attr);
	setHeaders();
	if(attr==0){attr=1;};
	var ranked_list = filterMultiThreshold(depthSlider,roughnessSlider,hardnessSlider,brightnessSlider,thres);
	var sorted = ranked_list.sort(function(a, b){var x=a[attr];var y=b[attr];return y - x}); // sort by desc order
	var sorted_array = sorted.filter(function(e){ return e === 0 || e }); // to delete undefined elements in the array
	for(var n=0;n<sorted_array.length;n++){post("\n Results",sorted_array[n]);}
	var y_dim = 1;
	if(sorted_array.length==0){outlet(5,"clear all");outlet(6,sorted_array.length+2);setHeaders();post("\n No sounds found !",sorted_array.length);}else{
	outlet(6,sorted_array.length+2);
	for(var m=0;m<sorted_array.length;m++){
		post("\nM->>",m);
		str_out = "set 0 " + y_dim + "\t" + sorted_array[m][0];
		var sname_out = "set 1 " + y_dim + "\t" + getSoundName(sorted_array[m][0]);
		y_dim++;
		//post("\n Sound Ids->>",str_out);
		outlet(5,str_out);
		outlet(5,sname_out);
	}
	}
}


function showRankMulti(depthSlider,roughnessSlider,hardnessSlider,brightnessSlider,attr,threshold,filterThres){
	post("\n TARGET->>",depthSlider,roughnessSlider,hardnessSlider,brightnessSlider,attr);
	setHeaders();
	if(attr==0){attr=1;};
	var ranked_list = rankMultiThreshold(depthSlider,roughnessSlider,hardnessSlider,brightnessSlider,threshold,filterThres);
	var sorted = ranked_list.sort(function(a, b){var x=a[attr];var y=b[attr];return x - y}); // sort by asc order
	var sorted_array = sorted.filter(function(e){ return e === 0 || e }); // to delete undefined elements in the array
	for(var n=0;n<sorted_array.length;n++){post("\n Results",sorted_array[n]);}
	var y_dim = 1;
	if(sorted_array.length==0){outlet(5,"clear all");outlet(6,sorted_array.length+2);setHeaders();post("\n Sorted length",sorted_array.length);}else{
	outlet(6,sorted_array.length+2);
	for(var m=0;m<sorted_array.length;m++){
		//post("\nM->>",m);
		str_out = "set 0 " + y_dim + "\t" + sorted_array[m][0];
		var sname_out = "set 1 " + y_dim + "\t" + getSoundName(sorted_array[m][0]);
		y_dim++;
		//post("\n Sound Ids->>",str_out);
		outlet(5,str_out);
		outlet(5,sname_out);
	}
	}	
}

// Retrieve the filename of a particular sound from the json file.
function getSoundName(sound_id){
	var sound_name = get_SoundAttributes(sound_id,1);
	return sound_name;
}
