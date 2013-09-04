Meteor.methods({

    decrementPeriod: function(domain) {
        return Domains.update({_id: domain._id}, {$inc: {'rules.period': -1}});
    },

    incrementPeriod: function(domain) {
        return Domains.update({_id: domain._id}, {$inc: {'rules.period': 1}});
    },

    decrementAwarded: function(domain) {
        return Domains.update({_id: domain._id}, {$inc: {'rules.kudosForPeriod': -1}});
    },

    incrementAwarded: function(domain) {
        return Domains.update({_id: domain._id}, {$inc: {'rules.kudosForPeriod': 1}});
    },

    decrementDomainSpendable: function(domain) {
        return Domains.update({_id: domain._id}, {$inc: {'rules.maxSpendableKudosAllowed': -1}});
    },

    incrementDomainSpendable: function(domain) {
        return Domains.update({_id: domain._id}, {$inc: {'rules.maxSpendableKudosAllowed': 1}});
    },

    startLoveMachine: function(domain) {
        if (!domain.rules.counterLeft) {
            Domains.update({_id: domain._id}, {$set: {'counterLeft': Domains.findOne({name: Meteor.user().profile.domain}).rules.period}});
            Domains.update({_id: domain._id}, {$set: {'started': true}});
        }
        else {
            Domains.update({_id: domain._id}, {$set: {'started': true}});
        }
    },

    stopLoveMachine: function(domain) {
        Domains.update({_id: domain._id}, {$set: {'started': false}});
    }
});