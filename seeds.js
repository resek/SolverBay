var mongoose = require('mongoose');
var Challenge = require ("./models/challenge");

var testChallenges = [
    {
        title: "Decrease air inlet when domestic refrigerator door is opened",
        description: "When we open the refrigerator door the cold air flows out and is replaced by the warm and moist one. This presents a problem for the cooling system. We are looking for ideas how to reduce it.",
        prize: 20,
        date: '2017-12-25'
    },
    {
        title: "Decrease air inlet when domestic refrigerator door is opened",
        description: "When we open the refrigerator door the cold air flows out and is replaced by the warm and moist one. This presents a problem for the cooling system. We are looking for ideas how to reduce it.",
        prize: 20,
        date: '2017-11-12'
    },
    {
        title: "Decrease air inlet when domestic refrigerator door is opened",
        description: "When we open the refrigerator door the cold air flows out and is replaced by the warm and moist one. This presents a problem for the cooling system. We are looking for ideas how to reduce it.",
        prize: 20,
        date: '2017-11-30'
    },
    {
        title: "Decrease air inlet when domestic refrigerator door is opened",
        description: "When we open the refrigerator door the cold air flows out and is replaced by the warm and moist one. This presents a problem for the cooling system. We are looking for ideas how to reduce it.",
        prize: 30,
        date: '2017-12-03'
    },  
];

function seedDB() {
    Challenge.remove({}, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("Challenges removed");
            testChallenges.forEach(function(testChallenge) {
                Challenge.create(testChallenge, function(err, newChallenge) {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log("You have seed the challenges!");
                    }
                });
            });            
        }
    });
}

module.exports = seedDB;