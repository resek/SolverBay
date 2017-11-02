var mongoose = require('mongoose');
var Challenge = require ("./models/challenge");

var testChallenges = [
    {
        title: "Kako naredti mesni burek?",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        prize: 20,
        date: '2017-12-25'
    },
    {
        title: "Kako naredti mesni burek?",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        prize: 20,
        date: '2017-11-12'
    },
    {
        title: "Kako naredti mesni burek?",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        prize: 20,
        date: '2017-11-30'
    },
    {
        title: "Kako naredti mesni burek?",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
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