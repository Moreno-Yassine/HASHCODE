var fs = require("fs");
var naive = require('./Naive.js');
var groups = require('./groups.js');

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
		score: 0, 
		place : false, 
		serverId : i 
	});
	//console.log("Server "+ serverInfo);
}

// <<<<<<< HEAD
// //console.log(groups(servers, P));
// 
// var newTableServers = naive.arrange_groups_native(servers, matriceDispo);
// newTableServers = naive.pooling(newTableServers,P);
// newTableServers = groups(newTableServers, P);
// naive.output(newTableServers);
// //console.log(servers);
// =======






servers = sortServers(servers);
//console.log(servers);


var mon_result = fillList(servers, matriceDispo); 
servers = mon_result.servers; 
matriceDispo = mon_result.matriceDispo; 

//console.log(servers);

function sortServers(listServers)
{
	var facteurTaille = 0.5; 
	var facteurPoids = 0.5; 


	for(var i= 0; i<M; i++)
	{
		var serverInfo = listServers[i]; 
		serverInfo.score = facteurTaille * serverInfo.slots + facteurPoids*serverInfo.cap;
	}

	listServers = listServers.sort(function(a, b) {
    	return b.score - a.score;
	});
	return listServers;
}

function fillList(listServers, listeDoccupation)
{
	var dernierServeurPlace = -1; 
	for(var i = 0 ; i<listServers.length; i++)
	{
		var monServeurAplacer = listServers[i];
		//On boucle sur tableau
		for(var a=0 ; a<listeDoccupation.length; a++)
		{
			//var j = a;
			var estPlace = false; 
			var j = (a + dernierServeurPlace + 1) % listeDoccupation.length ;

			for(var k=0; k<listeDoccupation[j].length ; k++)
			{

				var estPlacable = true;
                var testA = listeDoccupation[j][k] == true;
                var testB = (  (k + monServeurAplacer.slots) <= listeDoccupation[j].length );
				if(  testA &&  testB  )
				{
					for(var h = k ; h < k + monServeurAplacer.slots ; h++)
					{
						if( listeDoccupation[j][h] == false)
						{
							estPlacable = false; 
							break;
						}
					}

					if(estPlacable)
					{
						console.log("on arrive");
						//On remplit : 
						for(var h = k; h < k + monServeurAplacer.slots ; h++ )
						{
							listeDoccupation[j][h] = false; 
						}
						monServeurAplacer.x = j ; 
						monServeurAplacer.y = k ; 
						monServeurAplacer.place = true; 
						dernierServeurPlace = j ;

						estPlace = true; 
						break; 
					}else
					{
						console.log("on arrive pas a le placer"); 
					}
				}
			}
			if(estPlace){
				break;
			} 
		}
	}

	return {
		servers : listServers, 
		matriceDispo : listeDoccupation
	};
}

//newTableServers = groups(servers, P);
newTableServers = naive.pooling(servers,P);

newTableServers = newTableServers.sort(function(a, b) {
		return a.serverId - b.serverId;
	});

naive.output(newTableServers);
