
// Private Methods

emitKudo = function(fromUser, toUser, reason) {

    Users.update(fromUser._id, {$inc: {'profile.sent': 1}});
    Users.update(toUser._id, {$inc: {'profile.received': 1}});

    var kudo = new Kudo({
        toId: toUser._id,
        fromId: fromUser._id,
        reason: reason
    });

    kudo.save();
    return kudo;
}

setupUserProfileByService = function (profile, user) {
    var getDomain = function (email) {
        return email.replace(/.*@/, "");
    }

    if (user.services) {
        if (user.services.google) {
            var google = user.services.google;
            profile.email = google.email;
            profile.picture =  google.picture;
            profile.domain = getDomain(profile.email);
        }
    }
}
