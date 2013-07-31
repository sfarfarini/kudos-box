
Template.navbar.admin = function() {

    if (Meteor.userId()){
        return Meteor.user().profile.admin;
    } else
        return false;
};

Template.navbar.helpers({});

Template.navbarMenu.items = function() {

    var select = function (item) {
        if (item.requires) {
            return item.requires();
        } else {
            return true;
        }
    };

    var here = Meteor.Router.page();

    var map = function(item) {
        var n = Object.clone(item, true);
        if (here == item.page) {
            n.clazz = 'active';
        } else {
            n.clazz = '';
        }
        return n;
    };

    return Navbar.filter(select).map(map);
};

Navbar = [
    {
        page: 'timeline',
        href: '/',
        caption: 'Timeline',
        requires: function() {
            return !!Meteor.userId();
        }
    },
    {
        page: 'you',
        href: function() {
            return '/users/{name}'.assign({name: Meteor.user().profile.name});
        },
        caption: 'You',
        requires: function() {
            return !!Meteor.userId();
        }
    },
    {
        page: 'admin',
        href: '/admin',
        caption: 'Admin',
        requires: function() {
            if (Meteor.userId()){
                return Meteor.user().profile.admin;
            } else
                return false;
        }
    },
    {
        page: 'about',
        href: '/about',
        caption: 'About'
    }
];

