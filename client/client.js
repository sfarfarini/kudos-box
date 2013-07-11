  Template.kudo_form.from = function () {
    return Meteor.userId();
  };

  Template.kudo_form.events({
    'click button' : function () {
      // template data, if any, is available in 'this'
	  var to = $('#to').val();
	  var reason = $('#reason').val();
	  var from = Meteor.user().profile.name.toString();
	  var when = (new Date()).getTime();
	  
	  Kudos.insert({ 
	  	to: to, 
	  	reason: reason, 
	  	from: from,
	  	when: when
	  });
	  
	  return false;
    }
  });
  
  Template.kudo_list.kudos = function () {
    return Kudos.find({}, {sort: {when: -1}});
  };