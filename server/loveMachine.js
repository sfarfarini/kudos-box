updateBalance = function(domain) {
    var kudosForPeriod = domain.rules.kudosForPeriod;
    console.log(kudosForPeriod);
    var usersInDomain = Users.find({'profile.domain':domain});   
    console.log(usersInDomain);
    for(var i; i<usersInDomain.length; i++){
        Users.update({'_id': usersInDomain[i]._id} , {'balance.spendable' : kudosForPeriod});
    }
}