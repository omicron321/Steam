// ==UserScript==
// @name         DIG Store Enhancer
// @namespace    https://github.com/Omicron666
// @version      0.1
// @description  Adding some functionnalities to DailyIndieGame store
// @author       Omicron666
// @match        http://www.dailyindiegame.com/account_digstore.html
// @match        http://www.dailyindiegame.com/store_update*.html
// @require      https://code.jquery.com/jquery-3.2.1.min.js
// @homepageURL  https://github.com/Omicron666/Steam
// @supportURL   https://github.com/Omicron666/Steam/issues
// @downloadURL  https://raw.githubusercontent.com/Omicron666/Steam/master/dig-store-enhancer.user.js
// @updateURL    https://raw.githubusercontent.com/Omicron666/Steam/master/dig-store-enhancer.user.js
// @grant        GM_addStyle

// ==/UserScript==

(function() {
    'use strict';
    GM_addStyle (`
#TableKeys > tbody > tr:nth-child(1) > td:last-child:after{
    content: ' \\2261';
}

#TableKeys > tbody > tr:nth-child(1) > td:last-child{
    cursor: pointer;
}`);

    $('#TableKeys td:contains(Volume)').on('click',function(){$('#TableKeys tr:gt(1):has(td:last-of-type:not(:contains(Point)))').toggle();});

})();
