updateBalance = function(domain) {
    var trueDomain = Domains.findOne({'name': domain});
    var kudosForPeriod = trueDomain.rules.kudosForPeriod;
    var usersInDomain = Meteor.users.find({'profile.domain':trueDomain.name});
    //come prendere la collezione di utenti, e non il DB???
    console.log(usersInDomain);
    for(var i; i<usersInDomain.length; i++){
        Users.update({'_id': usersInDomain[i]._id} , {'balance.spendable' : kudosForPeriod});
        console.log('CIAO');
    }
}