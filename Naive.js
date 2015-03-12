


function arrange_groups_native (tableServeurs,tableOccupation) {
	
	for (var i = 0; i < tableServeurs.length; i++) {

		for (var ligne = 0; ligne < tableOccupation.length; ligne++) {

			for (var col = 0; col < tableOccupation[ligne].length; col++) {

				int erreur = 0;
				if (tableOccupation[ligne][col])
				{
					for (var x = col+1; i<col+tableServeurs[i].slots; x++) {
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
					}
				}
			};
		};
	};	
	
}

function output (tableServeurs) {
	var fs = require('fs');
	var stream = fs.createWriteStream("my_file.txt");
		stream.once('open', function(fd) {
			for (var i = 0; i <tableServeurs.length ; i++) {
				stream.write(tableServeurs[i].y);
				stream.write(" ");
				stream.write(tableServeurs[i].x);
				stream.write(" ");
		  		stream.write(tableServeurs[i].group+"\n");
			};
		  stream.end();
		});
}