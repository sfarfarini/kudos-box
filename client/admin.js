Template.admin.created = function() {
    Session.setDefault('user.edit', undefined);
};

Template.admin.events({

    'click a.drop': function() {
        Meteor.call('removeLastKudo');
        return false;
    },

    'click a.dropall': function() {
        Meteor.call('removeAllKudos');
        return false;
    }
});

Template.users_table.users = function() {
    var user = Meteor.user();
    if (!Meteor.loggingIn()) {
        return Users.find({ "profile.domain" : user.profile.domain });
    }
    return false;
};

Template.users_table.events({

    'click button.resetUsers': function() {
        Meteor.call('initializeUserBalance');
    }
});

Template.admin.helpers({

    'domain': function() {
        var user = Meteor.user();
        if (!Meteor.loggingIn()) {
            return Domains.findOne({name: user.profile.domain});
        }
        return false;
    }
});

Template.user_detail.helpers({

    editUser: function() {
        return Session.get('user.edit') == this._id;
    },

    notAdmin: function() {
        return !this.profile.admin;
    }
});

Template.user_detail.events({

    'click a.edit_user': function(e, t) {
        e.preventDefault();
        Session.set('user.edit', this._id);
    },

    'click a.exitEdit': function(e, t) {
        e.preventDefault();
        Session.set('user.edit', undefined);
    },

    'click button.reset': function(e, t) {
        e.preventDefault();
        Meteor.call("resetCounters", this._id, function (error, result) {
            console.log(result);
            Session.set('user.edit', undefined);
        });
    },

    'click button.remove': function(e, t) {
        e.preventDefault();
        Meteor.call("removeFromDomain", this._id, function (error, result) {
            console.log(result);
            Session.set('user.edit', undefined);
        });
    },

    'click button.give': function(e, t) {
        e.preventDefault();
        Meteor.call("giveAdminRights", this._id, function (error, result) {
            console.log(result);
            Session.set('user.edit', undefined);
        });
    },

    'click button.more_kudo': function(e, t) {
        e.preventDefault();
        Meteor.call('incrementSpendable', this, function(e, r) {
            console.log(e);
        });
    },

    'click button.less_kudo': function(e, t) {
        e.preventDefault();
        Meteor.call('decrementSpendable', this, function(e, r) {
            console.log(e);
        });
    }
});

Template.configLM.events({
    
    'click button.period' : function(event, tmpl) {
        event.preventDefault();
        // template data, if any, is available in 'this'
        var inputPeriod = tmpl.find('[name=period]');
        Meteor.call('setPeriod', Meteor.user().profile.domain, inputPeriod.value);
    },
            
    'click button.kudos' : function(event, tmpl) {
        event.preventDefault();
        // template data, if any, is available in 'this'
        var inputKudos = tmpl.find('[name=kudos]');
        Meteor.call('setKudosForPeriod', Meteor.user().profile.domain, inputKudos.value);
    },
            
    'click button.max' : function(event, tmpl) {
        event.preventDefault();
        // template data, if any, is available in 'this'
        var inputMax = tmpl.find('[name=max]');
        Meteor.call('setMaxKudos', Meteor.user().profile.domain, inputMax.value);
    }
});
