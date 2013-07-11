// A Kudo class that takes a document in its constructor
Kudo = function (doc) {
  _.extend(this, doc);
};

_.extend(Kudo.prototype, {});

// Define a Collection that uses Kudo as its document
Kudos = new Meteor.Collection("kudos", {
	transform: function (doc) { return new Kudo(doc); }
});


// An User class that takes a document in its constructor
/*User = function (doc) {
  _.extend(this, doc);
};

_.extend(Kudo.prototype, {});

// Define a Collection that uses User as its document
Users = new Meteor.Collection("users", {
	transform: function (doc) {return new User(doc); }
});*/