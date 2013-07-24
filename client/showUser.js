
Template.showUser.user = function() {

    return Users.findOne( Session.get( 'showUser._id' ) );
}

Template.receivedKudos.kudos = function() {
    return Kudos.find({toId: Session.get( 'showUser._id' )});
}
Template.givenKudos.kudos = function() {
    return Kudos.find({fromId: Session.get( 'showUser._id' )});
}
