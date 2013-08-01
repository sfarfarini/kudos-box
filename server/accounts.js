
Accounts.onCreateUser(function(options, user) {
    // We still want the default hook's 'profile' behavior.

    var profile;

    if (options.profile)
        profile = options.profile;
    else if (user.profile) {
        profile = user.profile;
    } else {
        profile = {};
    }

    setupUserProfileByService( profile, user );

    profile.sent = 0;
    profile.received = 0;

    user.profile = profile;
    
    //conta admin
    var adminCount = Users.find({'profile.admin': true, 'profile.domain': user.profile.domain}).count();
    if (adminCount === 0) {
        profile.admin = true;
    }

    // no callback after user creation
    Meteor.setTimeout(function() {

        console.log('reconnect {1}'.assign(user.profile.email));
        reconnectAccounts(user.profile.email);
        

    }, 3000);
   

    return user;
});
