
// Those methods are intended for development reasons and should be removed when real data will be added.

emitKudoWithDateForced = function(fromUser, toUser, reason, when) {

    var kudo = new Kudo({
        toId: toUser._id,
        fromId: fromUser._id,
        domain: fromUser.profile.domain,
        reason: reason,
        when: when
    });

    console.log("KUDO in {domain} from {from} to {to} because {reason} ".assign({
        from: fromUser.profile.name,
        to:   toUser.profile.name,
        domain: kudo.domain,
        reason: kudo.reason,
        when: kudo.when
    }));

    Users.update(fromUser._id, {$inc: {'profile.sent': 1}});
    Users.update(toUser._id, {$inc: {'profile.received': 1}});
    kudo.save();
    return kudo;
};