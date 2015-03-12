var fs = require("fs");
var naive = require('./Naive.js');

var input = fs.readFileSync('dc.in', 'utf-8').split('\n');

var inputConfig = input[0].split(' ');

var R = inputConfig[0];
var S = inputConfig[1];
var U = inputConfig[2];
var P = inputConfig[3];
var M = inputConfig[4];


// Creating true/false matrix
var matriceDispo = [];
for (var i = 0; i < R; i++)
{
	var row = [];
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
//console.log(matriceDispo);

//Servers array
var servers = [];
for (var i = 0; i < M; i++)
{
	var index = i+1+parseInt(U);
	var serverInfo = input[index].split(' ');
	
	servers.push({
		slots: parseInt(serverInfo[0]),
		cap: parseInt(serverInfo[1]),
		x: 0,
		y: 0,
		group: 0,
		score: 0
	});
	//console.log("Server "+ serverInfo);
}

var newTableServers = naive.arrange_groups_native(servers, matriceDispo);
naive.output(newTableServers);
//console.log(servers);
