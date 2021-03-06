/*jslint vars: true, nomen: true, plusplus: true, continue:true, forin:true */
/*global $, console, renderPool, Handlebars */

(function () {
    
    "use strict";
    
    var DIE_TYPE = {
        ABILITY: 0,
        PROFICIENCY: 1,
        BOOST: 2,
        DIFFICULTY: 3,
        CHALLENGE: 4,
        SETBACK: 5
    };
    
    var RESULT = {
        SUCCESS: "success",
        FAILURE: "failure",
        ADVANTAGE: "advantage",
        THREAT: "threat",
        TRIUMP: "triump",
        DESPAIR: "despair",
        BLANK: "blank"
    };

    /******** Die Definitions ***********/
    var Dice = [];
        
    //Ability
    Dice[DIE_TYPE.ABILITY] =  {
        name: "ability",
        id:DIE_TYPE.ABILITY,
        img_path: "images/ability.png",
        resultSet: [
            [RESULT.SUCCESS],
            [RESULT.ADVANTAGE],
            [RESULT.ADVANTAGE, RESULT.SUCCESS],
            [RESULT.SUCCESS, RESULT.SUCCESS],
            [RESULT.ADVANTAGE],
            [RESULT.SUCCESS],
            [RESULT.ADVANTAGE, RESULT.ADVANTAGE],
            [RESULT.BLANK]
        ]
    };

    //Proficiency
    Dice[DIE_TYPE.PROFICIENCY] = {
        name: "proficiency",
        id:DIE_TYPE.PROFICIENCY,
        img_path: "images/proficiency.png",
        resultSet: [
            [RESULT.ADVANTAGE, RESULT.ADVANTAGE],
            [RESULT.ADVANTAGE],
            [RESULT.ADVANTAGE, RESULT.ADVANTAGE],
            [RESULT.TRIUMP],
            [RESULT.SUCCESS],
            [RESULT.SUCCESS, RESULT.ADVANTAGE],
            [RESULT.SUCCESS],
            [RESULT.SUCCESS, RESULT.ADVANTAGE],
            [RESULT.SUCCESS, RESULT.SUCCESS],
            [RESULT.SUCCESS, RESULT.ADVANTAGE],
            [RESULT.SUCCESS, RESULT.SUCCESS],
            [RESULT.BLANK]
        ]
    };

    //Boost
    Dice[DIE_TYPE.BOOST] = {
        name: "boost",
        id: DIE_TYPE.BOOST,
        img_path: "images/boost.png",
        resultSet: [
            [RESULT.ADVANTAGE],
            [RESULT.SUCCESS, RESULT.ADVANTAGE],
            [RESULT.ADVANTAGE, RESULT.ADVANTAGE],
            [RESULT.SUCCESS],
            [RESULT.BLANK],
            [RESULT.BLANK]
        ]
    };

    //Difficulty
    Dice[DIE_TYPE.DIFFICULTY] = {
        name: "difficulty",
        id: DIE_TYPE.DIFFICULTY,
        img_path: "images/difficulty.png",
        resultSet: [
            [RESULT.THREAT],
            [RESULT.FAILURE],
            [RESULT.THREAT, RESULT.FAILURE],
            [RESULT.THREAT],
            [RESULT.BLANK],
            [RESULT.THREAT, RESULT.THREAT],
            [RESULT.FAILURE, RESULT.FAILURE],
            [RESULT.THREAT]
        ]
    };

    //Challenge
    Dice[DIE_TYPE.CHALLENGE] = {
        name: "challenge",
        id: DIE_TYPE.CHALLENGE,
        img_path: "images/challenge.png",
        resultSet: [
            [RESULT.THREAT, RESULT.THREAT],
            [RESULT.THREAT],
            [RESULT.THREAT, RESULT.THREAT],
            [RESULT.THREAT],
            [RESULT.THREAT, RESULT.FAILURE],
            [RESULT.FAILURE],
            [RESULT.THREAT, RESULT.FAILURE],
            [RESULT.FAILURE],
            [RESULT.FAILURE, RESULT.FAILURE],
            [RESULT.DESPAIR],
            [RESULT.FAILURE, RESULT.FAILURE],
            [RESULT.BLANK]
        ]
    };

    //Challenge
    Dice[DIE_TYPE.SETBACK] = {
        name: "setback",
        id: DIE_TYPE.SETBACK,
        img_path: "images/setback.png",
        resultSet: [
            [RESULT.FAILURE],
            [RESULT.FAILURE],
            [RESULT.THREAT],
            [RESULT.THREAT],
            [RESULT.BLANK],
            [RESULT.BLANK]
        ]
    };
    /******** End Die Definitions ***********/
    
    var miniDiceTemplate;
    var dieRollTemplate;
    
    var _roll = function (resultSet) {
        return resultSet[Math.floor(Math.random() * resultSet.length)];
    };
    
    var _poolDiceClickHandler;
    var pool = [];
    var renderPool = function () {
    
        $("#dice-pool").empty();
        
        
        if (pool.length === 0) {
            $("#roll-button, #clear-pool-icon").addClass("disabled");
            
            return;
        }
        
        $("#roll-button, #clear-pool-icon").removeClass("disabled");
        
        var tmp = [];
        
        var dieType;
        var i;
        for (i = 0; i < pool.length; i++) {
            
            dieType = pool[i];
            tmp.push({dieType: dieType, imageName: Dice[dieType].name});
        }
        
        var html = miniDiceTemplate({items: tmp});
        
        $("#dice-pool").append(html);
        $(".pool-dice").on("click", _poolDiceClickHandler);
    };
    
    var addToPool = function (item) {
        pool.push(item);
        pool.sort();
        
        renderPool();
        
        console.log(pool);
    };
    
    var removeFromPool = function (type) {
        var found = false;
        var i;
        for (i = 0; i < pool.length; i++) {
            var tmp = pool[i];
            
            if (tmp === type) {
                pool.splice(i, 1);
                found = true;
                break;
            }
        }
        
        if (found) {
            renderPool();
        }
    };

    var clearPool = function () {
        pool.length = 0;
        renderPool();
    };
    
    
    $(document).ready(function () {
        $(".menu .item").tab();
        
        var source = $("#mini-dice-template").html();
        miniDiceTemplate = Handlebars.compile(source);
        
        var dieRollSource = $("#die-roll-card-template").html();
        dieRollTemplate = Handlebars.compile(dieRollSource);
    });
    
    
    _poolDiceClickHandler = function (event) {
        var type = parseInt(event.target.dataset.type, 10);
        
        removeFromPool(type);
    };
    
    $("#clear-pool-icon").on("click", function (event) {
        clearPool();
    });
    
    $(".dice-image").on("click", function (event) {
        
        var type = parseInt(event.target.dataset.type, 10);
        
        addToPool(type);
    });
    
    $("#roll-button").on("click", function (event) {
        
        var rawResults = [];
        
        var dieTypes = [];
        
        var die;
        var i, k;
        for (i = 0; i < pool.length; i++) {
            
            die = Dice[pool[i]];
            
            var resultSet = die.resultSet;
            
            dieTypes.push(die.name);
            
            var res = _roll(resultSet);
            
            for (k = 0; k < res.length; k++) {
                rawResults.push(res[k]);
            }
        }
        
        console.log(rawResults);
        
        
        var context = {
            label:"Initiative Check",
            playerName:"mesh",
            rollTime:"8:35 PM",
            result:"Success!",
            id: (new Date().getTime()),
            dicePool: dieTypes,
            rawResults:rawResults,
            combinedResults:[]
        };
        
        var html = dieRollTemplate(context);
        $("#cards").prepend(html);
        
        
        $("#label-input").val("");
        clearPool();
    });

}());