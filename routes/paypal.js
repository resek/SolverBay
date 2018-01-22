var express = require('express');
var router = express.Router();
var paypal = require('paypal-rest-sdk');
var Challenge = require ("../models/challenge");

//get pay with paypal page
router.get("/pay", function (req, res) {
    var passedVariable = req.query.valid;
    Challenge.findById(passedVariable, function(err, foundChallenge) {
        if(err) {
            console.log(err);
        } else {
            res.render("challenge/pay", {foundChallenge: foundChallenge});
        }
    });    
});

//post pay with paypal
router.post("/pay", function(req, res) {
    
    var prize = req.body.prize;
    var id = req.body.id;
    var currency = req.body.currency;

    var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "https://solverbay.herokuapp.com/success",
            "cancel_url": "https://solverbay.herokuapp.com"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "Challenge prize fee",
                    "sku": "001",
                    "price": prize + ".00",
                    "currency": currency,
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": currency,
                "total": prize + ".00",
            },
            "description": "Challenge prize fee must be paid in advance."
        }]
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            for(var i = 0; i < payment.links.length; i++) {
                if(payment.links[i].rel === "approval_url") {
                    req.session.idNum = id;
                    req.session.prizeNum = prize;
                    req.session.currencyStr = currency;
                    res.redirect(payment.links[i].href);
                }
            }
        }
    });
});

//paypal success route
router.get("/success", function(req, res) {
    
    var payerId = req.query.PayerID;
    var paymentId = req.query.paymentId;
    var prize = req.session.prizeNum;
    var id = req.session.idNum;
    var currency = req.session.currencyStr;
    
    req.session.prizeNum = null;
    req.session.idNum = null;
    req.session.currencyStr = null;
    
    var execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": currency,
                "total": prize + ".00"
            }
        }]
    };

    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            console.log("Get Payment Response");
            console.log(JSON.stringify(payment));
            
            Challenge.findById(id, function(err, foundChallenge) {
                foundChallenge.isPaid = true;
                foundChallenge.save(function(err) {
                    if(err) {
                        console.log(err);
                    } else {
                        req.flash("info", "challenge posted successfully");
                        res.redirect("/challenges/" + id);
                    }
                });                
            })
        }
    });
});

module.exports = router;