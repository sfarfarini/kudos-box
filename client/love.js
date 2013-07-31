/**
 * Created with IntelliJ IDEA.
 * User: rcigni
 * Date: 7/25/13
 * Time: 5:04 PM
 * To change this template use File | Settings | File Templates.
 */

Template.love.created = function() {

    var loveId = Session.get('love._id');
    check(loveId, String);

    Meteor.call('peekKudo', loveId, function(err, result) {
        Session.set('love.kudo', result);
    });

}

Template.love.helpers({
    kudo: function() {
        return Session.get('love.kudo');
    }
});