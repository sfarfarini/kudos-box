
Meteor.Router.beforeRouting = function() {
    // anything you like before routing
};

Meteor.Router.add({

    '/': 'timeline',

    'timeline': 'timeline',

    '/home': 'home',

    '/love/:id' : function(id) {
        console.log('we are at ' + this.canonicalPath);
        console.log("our parameters: " + this.params);

        Session.set('love._id', id);
        return 'love';
    },

    '/users/:screenName': function(screenName) {
        console.log('we are at ' + this.canonicalPath);
        console.log("our parameters: " + this.params);

        var selectedUser = Users.findOne({'profile.name': screenName});

        if (selectedUser) {
            Session.set('showUser._id', selectedUser._id);
            return 'showUser';
        } else {
            return 'not_found';
        }
    },

    '/balance': 'balance',

    '/admin': 'admin',
    
    '*': 'not_found'
});

Meteor.Router.filters({
    'checkLoggedIn': function(page) {
        if (Meteor.loggingIn()) {
            return 'loading';
        } else if (Meteor.user()) {
            return page;
        } else {
            return 'home';
        }
    },
            
    'checkAdmin' : function(page) {
        if (Meteor.userId() && Meteor.user().profile.admin) {
            return page;
        } else {
            throw new Meteor.Error(401, 'This page requires administration rights');
        }
    }    
});

Meteor.Router.filter('checkLoggedIn', {except: ['home', 'love']});

Meteor.Router.filter('checkAdmin', {only: 'admin'});