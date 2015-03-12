


function arrange_groups_native (tableServeurs,tableOccupation) {
	
	for (var i = 0; i < tableServeurs.length; i++) {
		var erreur = 0;

		for (var ligne = 0; ligne < tableOccupation.length; ligne++) {

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
				if (tableServeurs[i].y == 0 && tableServeurs[i].x==0)
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
	output: output
};