// Matrix

function generateMatrix(servers)
{
	console.log(servers.length);
	var newServers = [];
	
	for (var i = 0; i < servers.length; i++) {
		console.log(servers[i].y);
		if (	!newServers[servers[i].y]) {
			newServers[servers[i].y] = [];

		}
		newServers[servers[i].y].push(servers[i]);
		//i+=servers[i].slots;
	}
	
	return newServers;
}

function grouper(servers, P)
{
	var newServers = generateMatrix(servers);
	var groups = [];
	for (var i = 0; i < P; i++) {
		groups[i] = [];
	}
	
	for (var i = 0; i < newServers.length; i++) {
		for (var j = 0; j < newServers[i].length; j++)
		{
			// Calcul du groupe ayant le plus petit score
			var minGroupId = minScoreGroup(groups);
			
			// Affectation du serveur actuel a ce groupe
			groups[minGroupId].push(newServers[i][j]);
		}
	}
}

function minScoreGroup(groups)
{
	var minSomme = 100000;
	var minGroupId;
	
	for (var i = 0; i < groups.length; i++)
	{
		var sum = 0;
		for (var j = 0; j < groups[i].length; j++)
		{
			sum += groups[i][j].score;
		}
		
		if (sum < minSomme) {
			minGroupId = i;
			minSomme = sum;
		}
	}
	
	return minGroupId;
}

module.exports = grouper;