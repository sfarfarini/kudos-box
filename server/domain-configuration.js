Meteor.methods({

    decrementPeriod: function(domain) {
        return Domains.update({_id: domain._id}, {$inc: {'rules.period': -1}});
    },

    incrementPeriod: function(domain) {
        return Domains.update({_id: domain._id}, {$inc: {'rules.period': 1}});
    }
});