/*
   Copyright (c) 2003 SHINTEC HOZUMI Co.,LTD.
   All Rights Reserved. 
*/



function Hashtable()
{

	this.keyArray = new Array();
	this.valArray = new Array();
	
	

	this.keys   = Hashtable_keys;
	this.values = Hashtable_values;
	this.size   = Hashtable_size;
	this.put    = Hashtable_put;
	this.get    = Hashtable_get;
	this.clear  = Hashtable_clear;
}

function Hashtable_keys()
{
	return this.keyArray;
}

function Hashtable_values()
{
	return this.valArray;
}

function Hashtable_size()
{
	return this.keyArray.length;
}

function Hashtable_put(key, value)
{
	if( key == null || value == null ) return null;
	
	var index = -1;
	for(var i=0; i < this.size(); i++){
		if( this.keyArray[i] == key ){
			index = i;
			break;
		}
	}
	
	var prevVal = null;
	if( index == -1 ){
		index = this.size();
	} else {
		prevVal = this.valArray[index];
	}
	
	this.keyArray[index] = key;
	this.valArray[index] = value;
	
	return prevVal;
}

function Hashtable_get(key)
{
	var value = null;
	for(var i=0; i < this.size(); i++){
		if( this.keyArray[i] == key ){
			value = this.valArray[i];
			break;
		}
	}
	
	return value;
}

function Hashtable_clear()
{
	this.keyArray = new Array();
	this.valArray = new Array();
}
