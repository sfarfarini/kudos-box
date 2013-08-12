Meteor.setInterval(function() {
    $('.prettyTime').each(function() {
        $(this).html( moment( $(this).attr('time') ).fromNow() );
    });
}, 5000);

createAlert = function(level, message, sticky) {
    alertList.insert({
        _id: makeAlertId(),
        sticky: sticky,
        message: message,
        level: level //"error": red alert, "success": green alert, "info": blue alert 
    });
};

