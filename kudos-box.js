if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to kudos-box.";
  };

  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });
}

// An Kudo class that takes a document in its constructor
Kudo = function (doc) {
  _.extend(this, doc);
};

_.extend(Kudo.prototype);

// Define a Collection that uses Kudo as its document
Kudos = new Meteor.Collection("kudos", {
  transform: function (doc) { return new Kudo(doc); }
});

/*Kudos.allow({
	insert: function(userId, doc){
		// the user must be logged in
    	return (userId === userId);
	}
});*/


if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
