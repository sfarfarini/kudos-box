  Template.kudo_form.from = function () {
    return Meteor.userId();
  };

  Template.kudo_form.events({
    'click button' : function () {
      // template data, if any, is available in 'this'
	  var to = $('#to').val();
	  var reason = $('#reason').val();
	  
	  Kudos.insert({ 
	  	to: to, 
	  	reason: reason, 
	  	from: Meteor.userId()
	  });
    }
  });
  
  Template.kudo_list.kudos = function () {
    return Kudos.find();
  };