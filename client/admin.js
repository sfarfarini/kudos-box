Template.admin.events({
    'click a.drop': function() {
        Meteor.call('removeLastKudo');
        return false;
    }
});
