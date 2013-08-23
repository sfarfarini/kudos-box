updateBalance = function(domain) {
    console.log('DOMAIN: ' + domain);
    var trueDomain = Domains.findOne({'_id': domain});
    console.log(trueDomain);
    var kudosForPeriod = trueDomain.rules.kudosForPeriod;
    console.log('KUDOS: ' + kudosForPeriod);
    var usersInDomain = Meteor.users.find({'profile.domain':trueDomain.name});
    //come prendere la collezione di utenti, e non il DB???
    //console.log(usersInDomain);
    for(var i; i<usersInDomain.length; i++){
        Users.update({'_id': usersInDomain[i]._id} , {$set : {'balance.spendable' : kudosForPeriod}});
        console.log('updated');
    }
};

setPeriod = function(domain, period){
    return Domains.update({'name': domain}, {$set : {'rules.period': period}});  
};

setKudosForPeriod = function(domain, kudos) {
    return Domains.update({'name': domain}, {$set : {'rules.kudosForPeriod' : kudos}}); 
};

setMaxKudos = function(domain, limit) {
    return Domains.update({'name': domain}, {$set : {'rules.maxSpendableKudosAllowed' : limit}}); 
}