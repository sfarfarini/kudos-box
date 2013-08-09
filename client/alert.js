Template.alert.helpers({
    invalid: function(){
        return Session.get("invalid-kudo-form-message") !== "";
    }
});

Template.invalid_kudo_form.helpers({   
    message: function () {
        return Session.get("invalid-kudo-form-message");
    }
});

Template.invalid_kudo_form.events({
    'click button': function(event){
        Session.set("invalid-kudo-form-message", "");
        return false;
    }
});

Template.invalid_kudo_form.created = function() {
  Session.setDefault("invalid-kudo-form-message", "");  
};