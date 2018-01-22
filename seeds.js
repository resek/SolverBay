var mongoose = require('mongoose');
var Challenge = require ("./models/challenge");
var Token = require ("./models/token");
var User = require ("./models/user");

var testChallenges = [
    {
        title: "Decrease air inlet when domestic refrigerator door is opened",
        description: "When we open the refrigerator door the cold air flows out and is replaced by the warm and moist one. This presents a problem for the cooling system. We are looking for ideas how to reduce it. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        field: "thermal engineering",
        prize: 500,
        currency: "USD",
        date: '2018-02-10',
        author: {username: "donsan", id: "5a4cb16f72f7b70235859e3c"},
        isPaid: true 
    },
    {
        title: "Decrease air inlet when domestic refrigerator door is opened",
        description: "When we open the refrigerator door the cold air flows out and is replaced by the warm and moist one. This presents a problem for the cooling system. We are looking for ideas how to reduce it. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        field: "thermal engineering",
        prize: 100,
        currency: "EUR",
        date: '2018-02-01',
        author: {username: "donsan", id: "5a4cb16f72f7b70235859e100"},
        isPaid: false
    },
    {
        title: "Decrease air inlet when domestic refrigerator door is opened",
        description: "When we open the refrigerator door the cold air flows out and is replaced by the warm and moist one. This presents a problem for the cooling system. We are looking for ideas how to reduce it. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        field: "thermal engineering",
        prize: 100,
        currency: "EUR",
        date: '2018-02-22',
        author: {username: "donsan", id: "5a4cb16f72f7b70235859e3c"},
        isPaid: true
    },
    {
        title: "Decrease air inlet when domestic refrigerator door is opened",
        description: "When we open the refrigerator door the cold air flows out and is replaced by the warm and moist one. This presents a problem for the cooling system. We are looking for ideas how to reduce it. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        field: "thermal engineering",
        prize: 50,
        currency: "USD",
        date: '2018-02-14',
        author: {username: "donsan", id: "5a4cb16f72f7b70235859e3c"},
        isPaid: true
    },
    {
        title: "Decrease air inlet when domestic refrigerator door is opened",
        description: "When we open the refrigerator door the cold air flows out and is replaced by the warm and moist one. This presents a problem for the cooling system. We are looking for ideas how to reduce it. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        field: "thermal engineering",
        prize: 50,
        currency: "USD",
        date: '2018-02-08',
        author: {username: "donsan", id: "5a4cb16f72f7b70235859e3c"},
        isPaid: true
    },
    {
        title: "Decrease air inlet when domestic refrigerator door is opened",
        description: "When we open the refrigerator door the cold air flows out and is replaced by the warm and moist one. This presents a problem for the cooling system. We are looking for ideas how to reduce it. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        field: "thermal engineering",
        prize: 300,
        currency: "EUR",
        date: '2018-02-16',
        author: {username: "donsan", id: "5a4cb16f72f7b70235859e3c"},
        isPaid: true
    },  
];

function seedDB() {
    // User.remove({}, function(err) {
    //     if(err) {
    //         console.log(err);
    //     } else {
    //         console.log("users removed");
    //     }
    // });
    // Token.remove({}, function(err) {
    //     if(err) {
    //         console.log(err);
    //     } else {
    //         console.log("tokens removed");
    //     }
    // });
    Challenge.remove({}, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("Challenges removed");
        }
    });        
           
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

module.exports = seedDB;