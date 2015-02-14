/*jslint vars: true, nomen: true, plusplus: true, continue:true, forin:true */
/*global $, console */

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
    
    var DIE_NAMES = {
        0: "ABILITY",
        1: "PROFICIENCY",
        2: "BOOST",
        3: "DIFFICULTY",
        4: "CHALLENGE",
        5: "SETBACK"
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
    
    var RESULT_SET = [];
    RESULT_SET[DIE_TYPE.ABILITY] = [
        [RESULT.SUCCESS],
        [RESULT.ADVANTAGE],
        [RESULT.ADVANTAGE, RESULT.SUCCESS],
        [RESULT.SUCCESS, RESULT.SUCCESS],
        [RESULT.ADVANTAGE],
        [RESULT.SUCCESS],
        [RESULT.ADVANTAGE, RESULT.ADVANTAGE],
        [RESULT.BLANK]
    ];

    RESULT_SET[DIE_TYPE.PROFICIENCY] = [
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
    ];


    RESULT_SET[DIE_TYPE.BOOST] = [
        [RESULT.ADVANTAGE],
        [RESULT.SUCCESS, RESULT.ADVANTAGE],
        [RESULT.ADVANTAGE, RESULT.ADVANTAGE],
        [RESULT.SUCCESS],
        [RESULT.BLANK],
        [RESULT.BLANK]
    ];

    RESULT_SET[DIE_TYPE.DIFFICULTY] = [
        [RESULT.THREAT],
        [RESULT.FAILURE],
        [RESULT.THREAT, RESULT.FAILURE],
        [RESULT.THREAT],
        [RESULT.BLANK],
        [RESULT.THREAT, RESULT.THREAT],
        [RESULT.FAILURE, RESULT.FAILURE],
        [RESULT.THREAT]
    ];

    RESULT_SET[DIE_TYPE.CHALLENGE] = [
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
    ];

    RESULT_SET[DIE_TYPE.SETBACK] = [
        [RESULT.FAILURE],
        [RESULT.FAILURE],
        [RESULT.THREAT],
        [RESULT.THREAT],
        [RESULT.BLANK],
        [RESULT.BLANK]
    ];

    
    var _roll = function (resultSet) {
        return resultSet[Math.floor(Math.random() * resultSet.length)];
    };
    
    var pool = [];
    
    $(document).ready(function () {
        $(".menu .item").tab();
    });
    
    var renderPool = function () {
    
        $("#dice-pool").empty();
        
        var tmp = "";
        
        var i;
        for (i = 0; i < pool.length; i++) {
            //<img class="dice-image" data-type="0" height="48" width="48" src="images/ability.png" />
            tmp += '<img class="dice-image" data-type=' + pool[i] + ' height="24" width="24" src="images/' + DIE_NAMES[pool[i]] + '.png" />';
            
        }
        
        $("#dice-pool").append(tmp);
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
        pool.push(type);
        pool.sort();
        
        renderPool();
        console.log(pool);
    });
    
    $("#roll-button").on("click", function (event) {
        
        var out = [];
        var i, k;
        for (i = 0; i < pool.length; i++) {
            var resultSet = RESULT_SET[pool[i]];
            var res = _roll(resultSet);
            
            for (k = 0; k < res.length; k++) {
                out.push(res[k]);
            }
        }
        
        clearPool();
    });

}());