function pooling(tableServeurs,pools)
{
var pool = 0;
	for (var serv = 0;serv <tableServeurs.length;serv++)
	{
		if (tableServeurs[serv].y == 0 && tableServeurs[serv].x==0)
				{
				}
				else
				{
					tableServeurs[serv].group=pool;
					pool++;
					if (pool>=pools)
						{pool= 0;}
				}
	}
	return tableServeurs;
}


function arrange_groups_native (tableServeurs,tableOccupation) {
	var line = 0;
	for (var i = 0; i < tableServeurs.length; i++) {
		var erreur = 0;
		if (line == tableOccupation.length)
		 {line =0;}
		for (var ligne = line; ligne < tableOccupation.length; ligne++) {
			for (var col = 0; col < tableOccupation[ligne].length; col++) {
				if (tableOccupation[ligne][col])
				{
					for (var x = col+1; x<col+tableServeurs[i].slots; x++) {
						if (!tableOccupation[ligne][x])
						{
							erreur = 1;
						}
					};
					if (erreur == 0)
					{
						// OK for insertions of servers
							tableServeurs[i].x = col;
							tableServeurs[i].y = ligne;
							for (var x = col; x<col+tableServeurs[i].slots; x++) {
								tableOccupation[ligne][x]=false;
							};
							line = ligne+1;
						break;
					}
				}
			}
			if (erreur==0)
			{
				break;
			}
		}
		
	}
	return tableServeurs;	
}

function output (tableServeurs) {
	var fs = require('fs');
	var stream = fs.createWriteStream("output.txt");
		stream.once('open', function(fd) {
			for (var i = 0; i <tableServeurs.length ; i++) {
				if (tableServeurs[i].place == false)
				{
					stream.write("x\n");
				}
				else
				{
				stream.write(tableServeurs[i].y.toString());
				stream.write(" ");
				stream.write(tableServeurs[i].x.toString());
				stream.write(" ");
		  		stream.write(tableServeurs[i].group+"\n");
				}
			};
		  stream.end();
		});
}

module.exports = {
	test: "hello",
	arrange_groups_native: arrange_groups_native,
	output: output,
	pooling: pooling
};