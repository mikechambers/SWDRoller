/*jslint vars: true, nomen: true, plusplus: true, continue:true, forin:true */
/*global $, console */

(function () {
    
    "use strict";
    
    var RESULT = {
        SUCCESS: "success",
        FAILURE: "failure",
        ADVANTAGE: "advantage",
        THREAT: "threat",
        TRIUMP: "triump",
        DESPAIR: "despair",
        BLANK: "blank"
    };

    var _roll = function () {
        return this.resultSet[Math.floor(Math.random() * this.resultSet.length)];
    };
    
    var DIE = {
        ABILITY: [
            [RESULT.SUCCESS],
            [RESULT.ADVANTAGE],
            [RESULT.ADVANTAGE, RESULT.SUCCESS],
            [RESULT.SUCCESS, RESULT.SUCCESS],
            [RESULT.ADVANTAGE],
            [RESULT.SUCCESS],
            [RESULT.ADVANTAGE, RESULT.ADVANTAGE],
            [RESULT.BLANK]
        ],
        
        PROFICIENCY: [
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
        ],
        
        BOOST: [
            [RESULT.ADVANTAGE],
            [RESULT.SUCCESS, RESULT.ADVANTAGE],
            [RESULT.ADVANTAGE, RESULT.ADVANTAGE],
            [RESULT.SUCCESS],
            [RESULT.BLANK],
            [RESULT.BLANK]
        ],
        
        DIFFICULTY: [
            [RESULT.THREAT],
            [RESULT.FAILURE],
            [RESULT.THREAT, RESULT.FAILURE],
            [RESULT.THREAT],
            [RESULT.BLANK],
            [RESULT.THREAT, RESULT.THREAT],
            [RESULT.FAILURE, RESULT.FAILURE],
            [RESULT.THREAT]
        ],
        
        CHALLENGE: [
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
        ],
        
        SETBACK: [
            [RESULT.FAILURE],
            [RESULT.FAILURE],
            [RESULT.THREAT],
            [RESULT.THREAT],
            [RESULT.BLANK],
            [RESULT.BLANK]
        ]
    };
    
    var getDie = function (type) {
        var out = {
            name: type,
            roll: _roll,
            resultSet: DIE[type]
        };
        
        return out;
    };
    
    var pool = [];
    
    $(document).ready(function () {
        $(".menu .item").tab();
    });
    
    $(".dice-image").on("click", function (event) {
        
        var type = event.target.dataset.type;
        var d = getDie(type.toUpperCase());
        
        pool.push(d);
    });
    
    $("#roll-button").on("click", function (event) {
        
        var out = [];
        var i, k;
        for (i = 0; i < pool.length; i++) {
            var d = pool[i];
            var res = d.roll();
            
            for (k = 0; k < res.length; k++) {
                out.push(res[k]);
            }
        }
        
        console.log(out);
        
        pool.length = 0;
    });

}());