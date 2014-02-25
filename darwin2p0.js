/*
This is a framework for the bot used in Indie Google+.  
Feel free to use all, or some, of this code for your own plug.dj bot.
*/

API.on(API.WAIT_LIST_UPDATE, djCycle);
API.on(API.VOTE_UPDATE, voteMeh);
API.on(API.CHAT, parseChat);
API.on(API.CURATE_UPDATE, grab);

//Lock the DJ Cycle at 15 users

function djCycle(obj) {

    if (obj.length < 15) { cycleEnabled(); enableCycle(); } //enable
    else { cycleEnabled(); disableCycle(); } //disable
    
}
		//Check if Dj Cycle is ON or OFF
		function cycleEnabled() {
			var toggle = $(".cycle-toggle");
		 
			return toggle.hasClass("enabled");
		}
		//Turn Dj Cycle ON or OFF
		function enableCycle() {
			var toggle = $(".cycle-toggle");
		 
			if(toggle.hasClass("disabled")) {
				toggle.click();
			}
		}
		function disableCycle() {
			var toggle = $(".cycle-toggle");
		 
			if(toggle.hasClass("enabled")) {
				toggle.click();
			}
		}

/*No Meh Gusta
This is called when somebody in the room (including you) votes. It passes an object with a user object and the vote, -1 for negative, 1 for positive. */


function voteMeh(obj) {
  var vote = obj.vote == 1 ? "woot" : "meh";
	if (vote == -1){
	API.sendChat(user.username + 'no Mehs in this room please! read room info!');
  	API.chatLog(obj.user.username + 'mehd this song', true);
	}
}

//Add new users here to include them in the fact list.

var facts = {
	
cat: ['I\'m named after Darwin Deez!', 
	'Meow!',
	'I really like tuna',
	'Catnip makes me sneeze. Just say no!',
	'I\'m a Russian Blue American Shorthair mix!',
	'I was adopted at a shelter - shelter cats rule!',
	'I\'m neutered! I don\'t know what that means, but that\'s what they told me when I woke up with a tattoo on my belly. \/whatever',
	'The Russian Blue is a naturally occurring breed that may have originated in the port of Arkhangelsk, Russia.',
	'Russian Blues are sometimes called Archangel Blues because it\'s believed that sailors took the cats from the Archangel Isles to England and Northern Europe in the 1860s.',
	'I am the softest kitty! My fur is known as a double coat, with a downy undercoat that\'s equal in length to the guard hairs, which are an even blue with silver tips. Only Russian Blues and the French Chartreux have this type of coat.',
	'I\'m really smart! Many Russian Blues have been trained to do tricks. We are a very intelligent breed.', 
	'I\'m a really great friend! Russian Blues have been known to play fetch, and are sensitive to human emotions.',
	'The Russian Blue is an intelligent, curious, and tranquil animal. We are known for our friendliness, but are shy with strangers.', 
	'I usually can be quiet, only meowing occasionally, but I can also be very talkative. I\'m really loud when I want my food!!',
	'I spend about 90% of my awake time cleaning myself.', 
	'I am normally reserved around strangers which is why I prefer to meet and talk to new people through a computer.',
	'Anecdotal evidence suggests that the Russian Blue may be better tolerated by friendbeasts with mild to moderate allergies. There is speculation that we produces less glycoprotein Fel d 1, one source of cat allergies. My thicker coat may also trap more of the allergens closer to my skin.'],
deez: ['Darwin Deez wrote the anthem of Indie Google+, "Radar Detector." That is his sole redeeming quality.',
	'Darwin Deez is who I\'m named after.', 
	'Darwin Deez is just as crazy in person as you\'d probably expect.', 
	'Darwin Deez tries really hard to be a 16 year old hipster. The truth is, he\'s got the douche factor down.', 
	'Should you go to that Deez show near you? Well, is it free? If not, then no.', 
	'When invited to karaoke, Darwin Deez declined because he was on tour and needed to save is voice. Jerk.'],
darwin: ['Charles Darwin\'s voyage was on a boat called the \'Beagle\'.',
	'Charles Darwin was born in Shrewsbury, England, on February 12, 1809.',
	'Chuck Darwin\'s father, Dr. R.W. Darwin, was as a medical doctor, and his grandfather, Dr. Erasmus Darwin, was a renowned botanist. His father hoped he would follow in his footsteps and become a medical doctor, but the sight of blood made Darwin queasy.',
	'There\'s that whole theory of evolution thing.',
	'Chuck Darwin ate as many animals as he documented. He reportedly once gagged on a meal of brown owl, writing that the taste was "indescribable." His favorite? armadillos and agouti.',
	'Unsurprisingly, Charles Darwin scientifically wrote out a list of pros and cons to matrimony. He concluded that he should marry \(unlike Tesla, who remained abstinent in the name of focusing on science\). The irony is that he married his first cousin.',
	'Charles Darwin really liked to play backgammon.',
	'I think there\'s some sort of conspiracy about Charles Darwin being Abraham Lincoln since they have the same birthday. They probably both fought vampires, too.',
	'The Church of England thought Charles Darwin\'s evolutionary theory was derived from or some sort of version of Tibetan Buddhism. LOL. They have since apologized. Well, after he died.'],
dj: ['I know a lot about my friends! !alecfacts, !amandafacts, !andyfacts, !bradfacts, !hibbyfacts, !hobofacts, !leonfacts,!malbofacts, !musikittyfacts, !sultanfacts'],
alec: ['Pittsburgh is the pits.', 
	'Pittsburgh is great! -- said no one ever, except Alec.', 
	'Alec can determine the sexuality of anything, even if it\'s an inanimate object or intangible subject!' ], 
amanda: ['Amanda is my catmom!', 
	'I like Amanda because she feeds me!', 
	'Can you keep a secret?', 
	'Amanda lives in Atlanta where she enjoys grits, fried green tomatos, and the heat!', 
	'If you\'re really nice, she might write DJ facts about you!'],
ag: ['!amandafacts', 
	'Ag is Silver on the periodic table of elements. It\'s also my catmom\'s initials.', 
	'Silver is a precious metal!'],
andy: [':a::one: special sauce!', 
	'Andy :blue_heart:\'s Connie', 
	'!pun', 
	'If you give Andy a bag of biscotti, he will guard it with his life for up to 15 hours!', 
	'Want to know what it\'s like to have an IRL conversation with Andy? ask his bot to tell a joke!', 
	'Andy gets the hiccups whenever he eats spicy food.', 'Andy will go out of his way just for a pun.'],
brad: ['Brad is a Russian spy not so secretly living somewhere in Ohio.', 
	'Cleveland Rocks!', 
	'Brad is the Walrus', 
	'hodor!'],
hibby: ['Hibby is fluent in Spanish and English and knows some Korean and Portuguese as well.', 
	'Connie and Andy :blue_heart:', 
	'Hibby currently has homes in three geographical regions of the continental United States!', 
	'Despite common belief, Connie is not Lilly\'s catmom.', 
	'Connie and Amanda are soul sisters who love to cuddle. It makes me jealous, actually.', 
	'Connie is living proof that anyone can love puns.', 
	'Connie probably knows more about coffee than you do.' ],
hobo: ['hobos in the wild display very interesting and confusing social patterns. it is best to leave any scientific observation up to the scientists!', 
	'hobos are often compared to: baby rabbits, puppies, kittens, chincillas and tribbles.', 
	'the hobos are not lemmings. they can be seen following Connie, Charlie and\/or Amanda.', 
	':eggplant:'],
leon: ['Leon is the grandfather and original creator of IG+ on plug.dj.', 
	'Leon\'s favorite artist is Taylor Swift'],
leb: ['!leonfacts'],
malbo: ['Malbo helped build me!', 
	'Malbo is in a band, Ghost of Monroe! check them out before they get big to maintain your hipster indie cred!', 
	'Malbo is vegan, which means he\'s better than you!', 
	'There is a 73% chance that Malbo dropped something today. http://oops-i-spilled-it-again.tumblr.com', 
	'Malbo participated in the Great Chicago Twerkoff of 2013 and won by No Contest', 
	'Malbo prefers his PBJ sandwiches with hummus.'],
musikitty: ['Laura is really good at trivia!', 
	'Laura is a vegetarian, just like my catmom!', 
	'Laura is catmom to Conley, a handsome devil like me!'],
sultan: ['Sultanoswank used to get in trouble on TT a lot; the reality is just that he was just too cool for that site. The only reason he kept returning was charity - to share his awesomeness with others, so that they may too learn to be awesome!', 
	'Sultanoswank helped make me the awesome bot who I am today. He\'s a real friendbeast!']
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
	if (data.fromID == "50aeb40bd6e4a94f7747c5a4") { API.sendChat('woot!'); API.djJoin(); }
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
}

function callback(obj) {
	var media = API.getMedia();
	API.chatLog('obj.user.username + " added " + media.author + " - " + media.title', false); 
}
