var PAGE_SIZE = 10;

Template.kudo_form.rendered = function() {
    return $('input[name=to]').typeahead({
        source: function(query, process) {

            var users = Users.find({
                'profile.name': new RegExp(query, 'i')
            }, {limit: 5}).fetch();

            users = pluck(users, 'profile');
            users = pluck(users, 'name');
            //console.log('found users:' + users.join(', '));
            return users; // call process(users) for async
        },
        items: 5
    });
};

Template.kudo_list.created = function() {

    Session.set("current_page", 1);

    $(window).scroll(function() {
        if (($(window).innerHeight() + $(window).scrollTop()) >= $("body").height())   {
            var currentpage = Session.get('current_page');
            Session.set('current_page', currentpage + 1);
        }
    });
};

Template.kudo_new_comment.events({

    'click button' : function (event, tmpl) {

        event.preventDefault();

        var message = tmpl.find('[name=message]').value;

        if (message == '') {
            return false;
        }

        Meteor.call("emitComment", kudo, message, function (error, result) {
            console.log("emitComment: " + result);
        });

        return false;
    }
});

Template.kudo_form.events({

    'click button' : function (event, tmpl) {

        event.preventDefault();

        // template data, if any, is available in 'this'
        var inputTo = tmpl.find('[name=to]');
        var inputReason = tmpl.find('[name=reason]');

//        console.log(inputTo);
//        console.log(inputReason);

        var to = inputTo.value;
        var reason = inputReason.value;

        if ( to != '' && reason != '' ) {

            var currentUser = Meteor.user();

            var targetUser = Users.findOne({'profile.name': to});

            if (targetUser == null) {
                // test if it's a valid domain
                if (to.indexOf( currentUser.profile.domain ) && isEmail(to)) {
                    Meteor.call('newUserByEmail', to);
                } else {
                    alert("I can't find this guy!");
                }
                return false;
            }

            if (targetUser._id === currentUser._id) {
                alert("Make love with somebody else, please!");
                return false;
            }

            inputTo.value = '';
            inputReason.value = '';

            Meteor.call("emitKudo", targetUser, reason, function(error, result) {
                console.log('emitKudo ');
                console.log(result);
            });

        } else {
            alert('Are u making fun of me?');
        }

        return false;
    }
});

Template.kudo_list.kudos = function () {
    return Kudos.find({}, {
        limit: Session.get("current_page")*PAGE_SIZE,
        sort: {when: -1}
    });
};

Template.kudo_comment.helpers({

    prettyWhen: function () {
        return moment(this.when).fromNow();
    },
    author: function() {
        return safeName(Users.findOne(this.author));
    },
    authorPicture: function() {
        return Users.findOne(this.author).profile.picture;
    }
});

Template.kudo.helpers({

    prettyWhen: function () {
        return moment(this.when).fromNow();
    },
    from: function() {
        return safeName(Users.findOne(this.fromId));
    },
    to: function() {
        return safeName(Users.findOne(this.toId));
    },
    fromPicture: function() {
        return Users.findOne(this.fromId).profile.picture;
    },
    totalLikes: function() {
        // the IFerno!
        if (this.likes) {
            return likeCaption(this.likes);
        } else {
            return 0;
        }
    }
});

likeCaption = function(likes) {
    if (_.contains(likes, Meteor.userId())) {
        var youAndOthers = 'you';
        if (likes.length > 1) {
            youAndOthers = youAndOthers + '+' + (likes.length-1);
        }
        return youAndOthers
    } else {
        return likes.length;
    }
};

Template.kudo.events({
    'click a.like-it': function(event, templ) {
        if (_.contains(this.likes, Meteor.userId())) {
            console.log('Like');
            Meteor.call('unlikeKudo', this._id);
        } else {
            console.log('unLike');
            Meteor.call('likeKudo', this._id);
        }
    }
});

var safeName = function(user) {
    if (user) {
        return user.screenName();
    } else {
        return 'MISSING';
    }
};