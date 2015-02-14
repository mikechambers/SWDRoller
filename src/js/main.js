/*jslint vars: true, nomen: true, plusplus: true, continue:true, forin:true */
/*global $, console, renderPool */

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
    
    var _roll = function (resultSet) {
        return resultSet[Math.floor(Math.random() * resultSet.length)];
    };
    
    var pool = [];
    
    $(document).ready(function () {
        $(".menu .item").tab();
    });
    
    var renderPool;
    var _poolDiceClickHandler = function (event) {
        
        console.log("click");
        var type = parseInt(event.target.dataset.type, 10);
        
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
    
    renderPool = function () {
    
        $("#dice-pool").empty();
        
        var tmp = "";
        
        var dieType;
        var i;
        for (i = 0; i < pool.length; i++) {
            
            dieType = pool[i];
            tmp += '<img class="mini-dice-image clickable pool-dice" data-type=' + dieType + ' height="18" width="18" src="images/' + Dice[dieType].name + '.png" />';
            
        }
        
        $("#dice-pool").append(tmp);
        $(".pool-dice").on("click", _poolDiceClickHandler);
    };
    
    
    var clearPool = function () {
        pool.length = 0;
        renderPool();
    };
    
    $("#clear-pool-icon").on("click", function (event) {
        clearPool();
    });
    
    $(".dice-image").on("click", function (event) {
        
        var type = parseInt(event.target.dataset.type, 10);
        
        //todo: check valid
        
        pool.push(type);
        pool.sort();
        
        renderPool();
        console.log(pool);
    });
    
    $("#roll-button").on("click", function (event) {
        
        var out = [];
        var i, k;
        for (i = 0; i < pool.length; i++) {
            var resultSet = Dice[pool[i]].resultSet;
            var res = _roll(resultSet);
            
            for (k = 0; k < res.length; k++) {
                out.push(res[k]);
            }
        }
        
        console.log(out);
        clearPool();
    });

}());