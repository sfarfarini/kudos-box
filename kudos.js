// A Kudo class that takes a document in its constructor
Kudo = function (doc) {
    _.extend(this, {when: new Date()}, doc);
};
//_.extend(Kudo.prototype, {});

Kudo.prototype = {
    constructor: Kudo,
    theMethod: function () {}
};

// Define a Collection that uses Kudo as its document
Kudos = new Meteor.Collection("kudos", {
    transform: function (doc) { return new Kudo(doc); }
});