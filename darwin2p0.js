/*
This is a framework for the bot used in Indie Google+.  
Feel free to use all, or some, of this code for your own plug.dj bot.
*/

API.on(API.CURATE_UPDATE, grab);
API.on(API.CHAT, parseChat);
API.on(API.VOTE_UPDATE, voteMeh);

//Add new users here to include them in the fact list.

var facts = {
	
cat: ['I\'m named after Darwin Deez!', 
	'Meow!',
	'I really like tuna',
	'I was adopted at a shelter - shelter cats rule!'],
	
deez: ['Darwin Deez wrote the anthem of Indie Google+, "Radar Detector." That is his sole redeeming quality.','Darwin Deez is who I\'m named after.', 'Darwin Deez is just as crazy in person as you\'d probably expect.'],

darwin: ['Charles Darwin\'s voyage was on a boat called the \'Beagle\'.',
	'Charles Darwin was born in Shrewsbury, England, on February 12, 1809.',
	'There\'s that whole theory of evolution thing.']
}


//FUNCTIONS

//RNG function for accessing array elements (to save code)
function rng(array) {
    return Math.floor(Math.random() * array.length);
}

//Check incoming chat messages and do stuff and things
function parseChat(data) {

    var msg = data.message; //Just to lessen code

    if (msg.match(/^!.*facts$/)) {

        var person = msg.substr(1, msg.length-6); //take the string between the '!' and 'facts'
    
        //If the person exists, grab a fact from the array
        if(facts.hasOwnProperty(person)){
            var i = rng(facts[person]);
            API.sendChat(facts[person][i]);
        }
        else {
            API.sendChat('Sorry, I have no facts for ' + person + ' :(');
        }
    }        

	// STAFF COMMANDS

	switch (msg) {

	case "!rockout":
	if (data.fromID == "yourIDhere") { API.sendChat('woot!'); API.djJoin(); }
	else { API.sendChat('I\'ll give a human a chance'); }
	break;

	case "!stagedive":
	if (API.getUser(data.fromID).permission > 2) { API.sendChat('cannonball!'); API.djLeave(); }
	else { API.sendChat('Cat\'s can play too!'); }
	break;

	case "!grab":
	if (API.getUser(data.fromID).permission > 2) { API.sendChat('snagged!'); grab(); }
	else { API.sendChat('You\'re not the boss of me!'); }
	break;
	} 
}

//Grab Song
function grab(obj) {
  $(".icon-curate").click();
  $($(".curate").children(".menu").children().children()[0]).mousedown();
	var media = API.getMedia();
	alert(obj.user.username + " added " + media.author + " - " + media.title); 
}

function voteMeh(obj) {
  var vote = obj.vote == 1 ? "woot" : "meh";
	if (vote == -1){
	API.sendChat(user.username + 'no Mehs in this room please! read room info!');
  	API.chatLog(obj.user.username + 'mehd this song', true);
	}
}
