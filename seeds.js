var mongoose = require('mongoose');
var Challenge = require ("./models/challenge");

var testChallenges = [
    {
        title: "Decrease air inlet when domestic refrigerator door is opened",
        description: "When we open the refrigerator door the cold air flows out and is replaced by the warm and moist one. This presents a problem for the cooling system. We are looking for ideas how to reduce it. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        prize: 50,
        date: '2017-12-25',
        author: {username: "computer"}
    },
    {
        title: "Decrease air inlet when domestic refrigerator door is opened",
        description: "When we open the refrigerator door the cold air flows out and is replaced by the warm and moist one. This presents a problem for the cooling system. We are looking for ideas how to reduce it. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        prize: 50,
        date: '2017-11-12',
        author: {username: "computer"}
    },
    {
        title: "Decrease air inlet when domestic refrigerator door is opened",
        description: "When we open the refrigerator door the cold air flows out and is replaced by the warm and moist one. This presents a problem for the cooling system. We are looking for ideas how to reduce it. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        prize: 50,
        date: '2017-11-30',
        author: {username: "computer"}
    },
    {
        title: "Decrease air inlet when domestic refrigerator door is opened",
        description: "When we open the refrigerator door the cold air flows out and is replaced by the warm and moist one. This presents a problem for the cooling system. We are looking for ideas how to reduce it. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        prize: 50,
        date: '2017-12-03',
        author: {username: "computer"}
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