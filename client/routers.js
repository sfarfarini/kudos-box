
Meteor.Router.add({

    '/': 'timeline',

    '/users/:screenName': function(screenName) {
        console.log('we are at ' + this.canonicalPath);
        console.log("our parameters: " + this.params);

        var selectedUser = Users.findOne({'profile.name': screenName});

        if (selectedUser) {
            Session.set('showUser._id', selectedUser._id);
            return 'showUser';
        } else {
            return 'not_found';
        }
    },

    '*': 'not_found'
});