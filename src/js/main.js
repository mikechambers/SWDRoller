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
    
    $(".dice-image").on("click", function (event) {
        
        var type = parseInt(event.target.dataset.type, 10);
        pool.push(type);
        pool.sort();
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
        
        console.log(out);
        
        pool.length = 0;
    });

}());