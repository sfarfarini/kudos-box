Meteor.startup(function () {

    var user = function ( _id, name, received, sent) {
        return findOrCreate(new User({_id: _id, profile: {name: name, received: received, sent: sent }}));
    }

    var theBoss = user('_the_boss', 'The Boss', 0, 0);
    var theObiettore = user('_the_obiettore', 'The Obiettore', 0, 0);

    if (Kudos.find().count() === 0) {

        var kudos = [
            {
                fromId: theBoss._id,
                toId: theObiettore._id,
                reason: "Mi piace un sacco sto roba"
            },
            {
                fromId: theObiettore._id,
                toId: theBoss._id,
                reason: "Ma quanto mi piace!"
            }
        ];

        for (var i = 0; i < kudos.length; i++) {
            new Kudo( kudos[i]).save();
        }

    }
});

Accounts.onCreateUser(function(options, user) {
    // We still want the default hook's 'profile' behavior.
    if (options.profile)
        user.profile = options.profile;
    else {  
        user.profile = {}; 
    }
    
    user.profile.sent = 0;
    user.profile.received = 0;
    
    return user;
});

function getDomain(email) {
    return email.replace(/.*@/, "");
}

function findOrCreate(test) {

    var user = Users.findOne({_id: test._id});

    if(!user) {
        user = Users.insert(test);
    }

    return user;
}

Meteor.methods({
  emitKudo: function (targetUser, reason) {
        var currentUser = Meteor.user();
        
        Users.update(currentUser._id, {$inc: {'profile.sent': 1}});
        Users.update(targetUser._id, {$inc: {'profile.received': 1}});

        var kudo = new Kudo({
              toId: targetUser._id,
              fromId: currentUser._id,
              reason: reason
        });

        kudo.save();
        
        return kudo;
  },

    initializeUserBalance: function() {

        var users = Users.find({});
        users.forEach(function(user) {
            var profile = user.profile;
            profile.sent = Kudos.find({fromId: user._id}).count();
            profile.received = Kudos.find({toId: user._id}).count();
            console.log('Welcome, Mr. {name}. S = {sent}, R = {received}'.assign( profile ));
            Users.update({'_id': user._id}, user);
        });
    }
});

