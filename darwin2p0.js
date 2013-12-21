/*
This is a framework for the bot used in Indie Google+.  
Feel free to use all, or some, of this code for your own plug.dj bot.
*/

API.on(API.CHAT, parseChat);
API.on(API.USER_JOIN, welcomeUser);
API.on(API.WAIT_LIST_UPDATE, capWaitList);

var ROOMNAME = 'myroom'; //for welcoming users
var WAITCAP = 10;

//Hash of facts
//Add new users here to include them in the fact list.
var facts = {
cat: [
        'catfact1',
        'catact2'
       ],
dog:    [
        'dogfact1', 
        'dogfact2'
       ]
}

/*Functions for stuff*/

//RNG function for accessing array elements (to save code)
function rng(array) {
    return Math.floor(Math.random() * array.length);
}

//Check incoming chat messages and do stuff and things
function parseChat(data) {

    var msg = data.message; //Just to lessen code

    if (msg.match(/^-.*facts$/)) { //will probably want to separate out the '-' matching for non-commands

        var person = msg.substr(1, msg.length-6); //take the string between the '-' and 'facts'
    
        //If the person exists, grab a fact from the array
        if(facts.hasOwnProperty(person)){
            var i = rng(facts[person]);
            API.sendChat(facts[person][i]); //API.sendChat(facts[person][rng(facts[person])]); <-- does this work?
        }
        else {
            API.sendChat('Sorry, I have no facts for ' + person + ' :(');
        }
    }        
}

//Welcome users as they join the room \o/
function welcomeUser(user) {
    
    API.sendChat('Heya ' + user.username + '! Welcome to ' + ROOMNAME + '!');
}

//Cap the waitlist based on WAITCAP
//This could probably be improved to take users off the list if it's already above WAITCAP
//So at the moment, it works assuming that the list is already below the cap
function capWaitList(djs) {

    if (djs.length < WAITCAP) { API.moderateLockWaitList(false,false) }//unlock
    else { API.moderateLockWaitList(true,false) }//lock
    
}
