
if (Meteor.isClient) {

    Deps.autorun(function () {

        Session.set("current_page", 1);

        $(window).scroll(function() {
            if (($(window).innerHeight() + $(window).scrollTop()) >= $("body").height())   {
                var currentpage = Session.get('current_page');
                Session.set('current_page', currentpage + 1);
            }
        });

        var currentDomain = function() {
            var user = Meteor.user();
            if (user) {
                return user.profile.domain;
            } else {
                return '';
            }
        }

        Meteor.subscribe("kudos", currentDomain());
        Meteor.subscribe("allUserData");

        //Meteor.subscribe("publicLove");

    });
}

if (Meteor.isServer) {

    Meteor.publish("kudos", function(currentDomain) {
        //return Kudos.find({domain: Meteor.user().domain});
        return Kudos.find({domain: currentDomain});
    });

//    Meteor.publish("publicLove", function() {
//
//        return Kudos.find({}, {$limit:1});
//    });

    Meteor.publish("allUserData", function () {
        return Meteor.users.find({}, {
            fields: {
                profile: 1
            }
        });
    });

}

