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
