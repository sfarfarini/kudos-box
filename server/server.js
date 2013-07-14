Meteor.startup(function () {

    var user = function ( _id, name) {
        return findOrCreate(new User({_id: _id, profile: {name: name} }));
    }

    var theBoss = user('_the_boss', 'The Boss');
    var theObbiettore = user('_the_obbiettore', 'The Obbiettore');

    if (Kudos.find().count() === 0) {

        var kudos = [
            {
                fromId: theBoss._id,
                toId: theObbiettore._id,
                reason: "Mi piace un sacco sto roba"
            },
            {
                fromId: theObbiettore._id,
                toId: theBoss._id,
                reason: "Ma quanto mi piace!"
            }
        ];

        for (var i = 0; i < kudos.length; i++) {
            Kudos.insert(new Kudo( kudos[i] ));
        }

    }
});
//
//Meteor.publish('autocompleteUsers', function(query) {
//
//    console.log("server search " + query);
//
//    var users = Users.find({
//        'profile.name': new RegExp(query, 'i')
//    }, {limit: 5});
//
//    console.log("server search " + users.count());
//
//    return users;
//});

function findOrCreate(test) {

    var user = Users.findOne({_id: test._id});

    if(!user) {
        user = Users.insert(test);
    }

    return user;
}

