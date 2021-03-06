//// server: publish the current size of a collection
//Meteor.publish("counts-by-room", function (roomId) {
//
//    var self = this;
//
//    check(roomId, String);
//
//    var count = 0;
//    var initializing = true;
//
//    var handle = Messages.find({roomId: roomId}).observeChanges({
//        added: function (id) {
//            count++;
//            if (!initializing)
//                self.changed("counts", roomId, {count: count});
//        },
//        removed: function (id) {
//            count--;
//            self.changed("counts", roomId, {count: count});
//        }
//        // don't care about moved or changed
//    });
//
//    // Observe only returns after the initial added callbacks have
//    // run.  Now return an initial value and mark the subscription
//    // as ready.
//    initializing = false;
//
//    self.added("counts", roomId, {count: count});
//    self.ready();
//
//    // Stop observing the cursor when client unsubs.
//    // Stopping a subscription automatically takes
//    // care of sending the client any removed messages.
//    self.onStop(function () {
//        handle.stop();
//    });
//});
//
//// client: declare collection to hold count object
//Counts = new Meteor.Collection("counts");
//
//// client: subscribe to the count for the current room
//Deps.autorun(function () {
//    Meteor.subscribe("counts-by-room", Session.get("roomId"));
//});
//
//// client: use the new collection
//console.log("Current room has " +
//    Counts.findOne(Session.get("roomId")).count +
//    " messages.");
