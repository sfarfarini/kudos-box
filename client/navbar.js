
Template.navbar.admin = function() {
    if (Meteor.userId()){
         return Meteor.user().profile.admin;
    } else
        return false;
};

Template.navbar.helpers({});
