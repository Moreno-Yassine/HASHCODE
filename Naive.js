


function arrange_groups_native (tableServeurs,tableOccupation) {
	
	for (var i = 0; i < tableServeurs.length; i++) {

		for (var ligne = 0; ligne < tableOccupation.length; ligne++) {

			for (var col = 0; col < tableOccupation[ligne].length; col++) {
		
				var erreur = 0;
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
							for (var x = col+1; x<col+tableServeurs[i].slots; x++) {
								tableOccupation[ligne][x]=false;
							};
					}
				}
			}
		}
		
	}
	return tableServeurs;	
}

function output (tableServeurs) {
	var fs = require('fs');
	var stream = fs.createWriteStream("my_file.txt");
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