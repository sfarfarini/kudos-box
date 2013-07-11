Meteor.startup(function () {
    if (Kudos.find().count() === 0) {
    
      var toList = ["Piercarlo Serena",
      				"Raffaele Cigni",
      				"Alessandro Palumbo"];
      var fromList = ["Raffaele Cigni",
      				  "Alessandro Palumbo",
      				  "Piercarlo Serena"];
      var reasonList = ["Perché ha fatto un buon lavoro con il Kudos Box.",
      					"Perché è competente con Meteor.",
      					"Perché il sito di Leroy Merlin è venuto proprio bene."];
      
      for (var i = 0; i < toList.length; i++)
        Kudos.insert({to: toList[i], from: fromList[i], reason: reasonList[i]});
        
    }
  });