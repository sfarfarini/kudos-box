
Template.chooseDomain.domains = function() {
    return Domains.find();
};

Template.chooseDomain.helpers({

    defaultDomainName: function() {
        var user = Users.findOne({_id: Session.get('userWithoutDomain')});
        return user.profile.email.split('@')[1];
    },

    exists: function() {
        var user = Users.findOne({_id: Session.get('userWithoutDomain')});
        return Domains.findOne({name: user.profile.email.split('@')[1]});
    },

    yourRole: function() {
        var user = Users.findOne({_id: Session.get('userWithoutDomain')});
        var domain = Domains.findOne({name: user.profile.email.split('@')[1]});
        return !domain || domain.admin == null;
    }
});

Template.groupDomain.helpers({

    isPublic: function() {
        return this.public ? 'public' : 'private';
    },

    members: function() {
        return Users.find({'profile.domain' : this.name}).count();
    },

    exists: function() {
        return Domains.findOne({name: this.name});
    },

    yourRole: function() {
        var domain = Domains.findOne({name: this.name});
        return !domain || domain.admin == null;
    }
});

Template.chooseDomain.events({

    'click button.subscribe': function (e, t) {

        e.preventDefault();
        var checked = t.find('input:radio[name=domainOptions]:checked');
        var domain = $(checked).attr('value');

        Meteor.call('subscribeDomain', domain, function(e, r) {
            console.log(e);
        });
    }
});
