/*jslint vars: true, nomen: true, plusplus: true, continue:true, forin:true */
/*global $, console */

(function () {
    
    "use strict";
    
    $(document).ready(function () {
        $(".menu .item").tab();
    });
    
    $(".dice-image").on("click", function (event) {
        console.log(event.target.dataset.type);
    });

}());