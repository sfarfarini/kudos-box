
Meteor.methods({

    emitKudo: function (targetUser, reason) {
        return emitKudo(Meteor.user(), targetUser, reason);
    },

    initializeUserBalance: function() {

        var users = Users.find({});
        users.forEach(function(user) {
            var profile = user.profile;

            setupUserProfileByService(profile, user);

            profile.sent = Kudos.find({fromId: user._id}).count();
            profile.received = Kudos.find({toId: user._id}).count();
            console.log('Welcome, Mr. {name}. S = {sent}, R = {received}'.assign( profile ));
            Users.update({'_id': user._id}, user);
        });
    }
});

