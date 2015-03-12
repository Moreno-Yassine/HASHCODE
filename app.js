var fs = require("fs");

var input = fs.readFileSync('test.in', 'utf-8').split('\n');

var inputConfig = input[0].split(' ');

var R = inputConfig[0];
var S = inputConfig[1];
var U = inputConfig[2];
var P = inputConfig[3];
var M = inputConfig[4];


// Creating true/false matrix
var matriceDispo = new Array();
for (var i = 0; i < R; i++)
{
	var row = new Array();
	for (var j = 0; j < S; j++)
	{
		row[j] = true;
	}
	matriceDispo[i] = row;
	
}

for (var i = 0; i < U; i++)
{
	var uSlot = input[i+1].split(' ');
	var x = uSlot[0];
	var y = uSlot[1];
	
	//console.log(x+ ' : '+y);
	
	matriceDispo[uSlot[0]][uSlot[1]] = false;
}

console.log(matriceDispo);