// ==UserScript==
// @name         DIG Store Enhancer
// @namespace    https://github.com/Omicron666
// @version      0.2.1
// @description  Adding some functionnalities to DailyIndieGame store
// @author       Omicron666
// @match        http://www.dailyindiegame.com/account_digstore.html
// @match        http://www.dailyindiegame.com/store_update*.html
// @match        http://www.dailyindiegame.com/account_trades.html
// @match        http://www.dailyindiegame.com/content_digaccount.html
// @require      https://code.jquery.com/jquery-3.2.1.min.js
// @require      https://github.com/Mottie/tablesorter/raw/master/js/jquery.tablesorter.js
// @resource     faCSS https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css
// @homepageURL  https://github.com/Omicron666/Steam
// @supportURL   https://github.com/Omicron666/Steam/issues
// @downloadURL  https://raw.githubusercontent.com/Omicron666/Steam/master/dig-store-enhancer.user.js
// @updateURL    https://raw.githubusercontent.com/Omicron666/Steam/master/dig-store-enhancer.user.js
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @grant        GM_xmlhttpRequest
// @connect      store.steampowered.com

// ==/UserScript==

(function() {
    'use strict';

    // let's fix style for them...
    GM_addStyle (`.DIG2TableGray {
border: 1px solid #424242;
border-collapse: separate;
border-spacing: 1;
background-color: #2D2D2D;
padding: 0px;
spacing: 0px;
}`);

    // style for sorting
    GM_addStyle (`
th:focus, td:focus {outline:none;}

.headerSortUp:after{
content: ' \\21ca';
}
.headerSortDown:after{
content: ' \\21c8';
}
.headerDefault:after{
//content: ' \\21c5';
}

.headerDefault, .headerSortUp, headerSortDown{
cursor: pointer;
}`);

    let waitingTD = '<td class="DIG3_14_Gray steam-price"><i class="fa fa-refresh fa-spin fa-fw waiting-for-steam-price"></i></>';


    if (/account_digstore|store_update.*2/.test(window.location.href)){

        $('#TableKeys').addClass('DIG2TableGray');

        // let's move this closer to relevant table
        $('#sortby').closest('table').find('tr > td:first-child').html('<div class="DIG3_14_Gray" align="right">Default:</div>');
        $('#sortby').closest('table').insertBefore('#TableKeys');

        // Weekly discounts table headers
        // Two tables with same id: #DIG2TableGray...
        let $weeklyTable = $('td:contains(Weekly discounts):last').closest('table');
        $weeklyTable.find('tbody > tr:first-child > td').prop('colspan','8');
        $weeklyTable.find('tbody > tr').eq(1).append('<td valign="top" class="DIG2-TitleOrange steam-price-header">Steam</td>');
        // Main table header
        $('#TableKeys > tbody > tr').eq(0).append('<td rowspan="2" valign="top" class="DIG2-TitleOrange steam-price-header">Steam</td>');

        // moving rows to proper table headers for sorting...
        $weeklyTable.prepend('<thead />');
        //$weeklyTable.find('thead').append($weeklyTable.find('tbody > tr:lt(2)'));
        $weeklyTable.find('thead').append($weeklyTable.find('tbody > tr:first-child')); $weeklyTable.find('thead').append($weeklyTable.find('tbody > tr:first-child'));
        $('#TableKeys').prepend('<thead />');
        // $('#TableKeys > thead').append($('#TableKeys > tbody > tr:lt(2)'));
        $('#TableKeys > thead').append($('#TableKeys > tbody > tr:first-child')); $('#TableKeys > thead').append($('#TableKeys > tbody > tr:first-child'));
        //$('#TableKeys > thead > tr').contents().unwrap().wrap('<th/>');

        // display Steam price on each row
        $weeklyTable.find('tbody > tr').append(waitingTD);
        $('#TableKeys > tbody > tr').append(waitingTD);

        // bonus
        GM_addStyle ('.feature{}');
        $("table > tbody > tr, table > thead > tr").contents().filter(function(){
            return this.nodeType == 8;
        }).each(function(i, e){
            let $parent = $(e).parent();
            let index = $(e).index();
            $(e).replaceWith(e.nodeValue);
            $parent.children().eq(index).hide();
            $parent.children().eq(index).addClass('feature');

        });
        $('#TableKeys td:contains(left)').css('vertical-align','top'); // 'valign' is not valid HTML5 attribute !
        $('#TableKeys td:contains(left)').prop('rowspan', '2');
        $('#TableKeys td:contains(left)').html($('#TableKeys td:contains(left)').html().replace(':',''));
        $weeklyTable.find('td:contains(left)').html($weeklyTable.find('td:contains(left)').html().replace(':',''));
        document.addEventListener('keyup', function(e){if (e.keyCode == 81) { $('.feature').toggle(); $weeklyTable.trigger("update"); $('#TableKeys').trigger("update"); }}, false); /* don't leak it or this might get disabled/impossible ! */

        // add sorting
        $weeklyTable.tablesorter({  headers: { 0:{ sorter: false}, 4:{ sorter: false}, 5:{ sorter: false}, 8: {sorter: false}},
                                  cssAsc: 'headerSortUp',
                                  cssDesc: 'headerSortDown',
                                  cssHeader: 'headerDefault'});
        $('#TableKeys').tablesorter( {  headers: { 1:{ sorter: false}, 3:{ sorter: false}, 4:{ sorter: false}, 7: {sorter: false},
                                                  8: {sorter: false}, 10: {sorter: false}, 11: {sorter: false}, 12: {sorter: false}},
                                      cssAsc: 'headerSortUp',
                                      cssDesc: 'headerSortDown',
                                      cssHeader: 'headerDefault'});

        // add Font Awesome CSS to head
        var faCSS = GM_getResourceText("faCSS");
        GM_addStyle(faCSS);

        // Add style for filtering head cell
        GM_addStyle (`
.filter-out:after{
content: ' \\2261';
}`);

        // filter out rows with empty cells
        //$('#TableKeys > thead td:contains(VR), #TableKeys > thead td:contains(Cards), #TableKeys > thead td:contains(Volume)').addClass('filter-out');
        //$('#TableKeys > thead td:contains(Volume)').addClass('filter-out');
        $(':contains(Volume DISCOUNT):last').html("Volume DISCOUNT &#x2261");
        $('#TableKeys > thead td:contains(Volume)').on('click',function(){$('#TableKeys > tbody > tr:has(td:nth-child(10):not(:contains(Point)))').toggle();});
        // FIXME: conflicting multiple toggle
        //$('#TableKeys > thead td:contains(VR)').on('click',function(){$('#TableKeys > tbody > tr:has(td:nth-child(3):empty)').toggle();});
        //$('#TableKeys > thead td:contains(Cards)').on('click',function(){$('#TableKeys > tbody > tr:has(td:nth-child(4):empty)').toggle();});

    }
    else if (/account_trades|store_update/.test(window.location.href)){
        // Main table header: add Steam header
        $('#TableKeys > tbody > tr:first-child').append('<td valign="top" class="DIG2-TitleOrange steam-price-header">Steam</td>');
        // add Steam price on each row
        $('#TableKeys > tbody > tr:not(:first-child)').append(waitingTD);

        // move table headers for sorting...
        $('#TableKeys').prepend('<thead />');
        $('#TableKeys > thead').append($('#TableKeys > tbody > tr:first-child'));

        $('#TableKeys').tablesorter({  headers: { 6:{ sorter: false}},
                                     cssAsc: 'headerSortUp',
                                     cssDesc: 'headerSortDown',
                                     cssHeader: 'headerDefault'});
    }
    else if (/content_digaccount/.test(window.location.href)){
        // Table headers: add Steam header
        $('#TableKeys2 > tbody > tr:first-child, #TableKeys > tbody > tr:first-child').append('<td class="DIG2-TitleOrange steam-price-header">Steam</td>');
        // display Steam price on each row
        $('#TableKeys2 > tbody > tr:not(:first-child), #TableKeys > tbody > tr:not(:first-child)').append(waitingTD);

        // move table headers for sorting...
        $('#TableKeys').prepend('<thead />');
        $('#TableKeys > thead').append($('#TableKeys > tbody > tr:first-child'));
        $('#TableKeys2').prepend('<thead />');
        $('#TableKeys2 > thead').append($('#TableKeys2 > tbody > tr:first-child'));

        $('#TableKeys').tablesorter({ cssAsc: 'headerSortUp',
                                     cssDesc: 'headerSortDown',
                                     cssHeader: 'headerDefault'});
        $('#TableKeys2').tablesorter({ cssAsc: 'headerSortUp',
                                      cssDesc: 'headerSortDown',
                                      cssHeader: 'headerDefault'});
    }

    var appIdList = $('a[href*="store.steampowered.com/app/"]').map(
        function(i,e){
            let appid = $(e).prop('href').match(/\d+/);
            $(e).closest('tr').data('appid', appid); // conveniently store appid on each row
            return appid;
        }
    ).toArray().join();

    GM_xmlhttpRequest({
        method: "GET",
        url: 'https://store.steampowered.com/api/appdetails?appids='+ appIdList +'&cc=us&filters=price_overview',
        onload: function(xhr) {
            var data = eval("(" + xhr.responseText + ")"); // because we trust Steam API...
            let $waitingCells = $('.waiting-for-steam-price');
            let $waitingTable = $waitingCells.closest('table');
            $waitingCells.each(function(){
                let appid = $(this).closest('tr').data('appid');
                let result = "";
                if (data[appid].success && (data[appid].data !== undefined)  && (data[appid].data.price_overview !== undefined))
                    result = '$'+ parseInt(data[appid].data.price_overview.initial)/100.0;
                else
                    result = '<a href="https://steamcommunity.com/app/'+ appid +'" target="_blank">N/A</a>';

                $(this).replaceWith(result);
            });
            $waitingTable.trigger("update");  // refresh sorting after Steam price updates
        }
    });



})();
